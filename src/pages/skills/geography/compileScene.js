/**
 * Compiles every shader a scene will need, including hidden parts (a tunnel or
 * a flash that only appears later), so the first frame that shows them does
 * not stutter. three's compile only visits visible objects, so they are shown
 * for the synchronous part of compileAsync and hidden again straight after.
 * Resolves once compiled; never rejects (a lost context just skips it).
 */
export function compileScene(renderer, scene, camera) {
    if (!renderer?.compileAsync) return Promise.resolve();
    const hidden = [];
    scene.traverse((object) => {
        if (!object.visible) {
            hidden.push(object);
            object.visible = true;
        }
    });
    let compiling;
    try {
        compiling = renderer.compileAsync(scene, camera);
    } catch {
        compiling = Promise.resolve();
    } finally {
        for (const object of hidden) object.visible = false;
    }
    return Promise.resolve(compiling).catch(() => {});
}
