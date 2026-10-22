import * as THREE from "three";

export const EARTH_DAY_NIGHT_LINE = "Earth spins round. The side facing the Sun has day, and the side facing away has night. The little lights on the night side are city lights made by people. One full turn takes about 24 hours. Time moves faster in our model.";

/** Keep the existing lit surface, adding city lights only beyond the terminator.
 * World-space surface positions keep the sunlight correct during flight, the
 * size line-up, axial tilt and rotation. No extra pass or animated clock.
 */
export function createEarthDayNight({ material, nightTexture }) {
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    const previousCompile = material.onBeforeCompile;
    const previousCacheKey = material.customProgramCacheKey;
    material.onBeforeCompile = function (shader, renderer) {
        previousCompile.call(this, shader, renderer);
        shader.uniforms.earthNightMap = { value: nightTexture };
        const varyings = `
            varying vec3 vEarthWorldPosition;
            varying vec3 vEarthWorldNormal;
            varying vec2 vEarthUv;
        `;
        shader.vertexShader = varyings + shader.vertexShader.replace(
            "#include <fog_vertex>",
            `#include <fog_vertex>
            vEarthWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;
            vEarthWorldNormal = inverseTransformDirection(transformedNormal, viewMatrix);
            vEarthUv = uv;`
        );
        shader.fragmentShader = `uniform sampler2D earthNightMap;\n${varyings}` + shader.fragmentShader.replace(
            "#include <opaque_fragment>",
            `// The Sun is at the world origin. Twilight softens the boundary.
            float earthSunFacing = dot(normalize(vEarthWorldNormal), normalize(-vEarthWorldPosition));
            float earthDay = smoothstep(-0.08, 0.12, earthSunFacing);
            vec3 earthCities = texture2D(earthNightMap, vEarthUv).rgb;
            outgoingLight = outgoingLight * mix(0.025, 1.0, earthDay)
                + earthCities * (1.0 - earthDay) * 1.4;
            #include <opaque_fragment>`
        );
    };
    material.customProgramCacheKey = () => "earth-day-night-v1";
    material.needsUpdate = true;
    return {
        dispose() {
            material.onBeforeCompile = previousCompile;
            material.customProgramCacheKey = previousCacheKey;
            material.needsUpdate = true;
            nightTexture.dispose();
        },
    };
}
