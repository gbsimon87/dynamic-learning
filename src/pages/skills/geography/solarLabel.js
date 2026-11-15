import * as THREE from "three";

export function createSolarLabel(text, fontSize = 64, color = "#ffffff", style = "planet") {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const paddingX = 30;
    const paddingY = 18;

    context.font = `600 ${fontSize}px system-ui, sans-serif`;
    const lines = [""];
    if (style === "arithmetic") {
        for (const word of text.split(" ")) {
            const last = lines.length - 1;
            if (lines[last] && `${lines[last]} ${word}`.length > 14) lines.push(word);
            else lines[last] += `${lines[last] ? " " : ""}${word}`;
        }
    } else lines[0] = text;
    const textWidth = Math.max(...lines.map(line => context.measureText(line).width));
    const lineHeight = style === "arithmetic" ? fontSize * 1.2 : fontSize;

    canvas.width = Math.ceil(textWidth + paddingX * 2);
    canvas.height = Math.ceil(lineHeight * lines.length + paddingY * 2);

    // Reapply font after resizing the canvas
    context.font = `600 ${fontSize}px system-ui, sans-serif`;
    context.fillStyle = style === "sky" ? "rgba(5, 10, 24, 0.38)" : "rgba(5, 10, 24, 0.72)";
    context.beginPath();
    context.roundRect(1, 1, canvas.width - 2, canvas.height - 2, canvas.height / 2);
    context.fill();
    context.strokeStyle = style === "sky" ? "rgba(144, 201, 255, 0.4)" : "rgba(255, 255, 255, 0.22)";
    context.lineWidth = 2;
    context.stroke();
    context.fillStyle = color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    lines.forEach((line, i) => context.fillText(line, canvas.width / 2, paddingY + lineHeight * (i + .5)));

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;

    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: false,
        depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.renderOrder = 20;
    sprite.userData.isLabel = true;

    const aspect = canvas.width / canvas.height;
    sprite.userData.aspect = aspect;
    const height = 1.75 * lines.length;
    sprite.scale.set(height * aspect, height, 1);

    return sprite;
}

