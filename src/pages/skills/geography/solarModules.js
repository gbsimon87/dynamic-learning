/**
 * The Solar System's module host.
 *
 * From Phase 0 of docs/SOLAR_SYSTEM_IDEAS.md on, each new scene feature is a
 * module the animate loop drives, rather than more code inside the effect in
 * SolarSystem.jsx. A module is a plain object with any of `update(dt, frame)`,
 * `resize(size)` and `dispose()`, the same names meteorExperiment.js uses.
 *
 * A module that throws is reported, disposed and dropped, so one broken effect
 * never stops the page.
 */
export function createModuleHost({ onError = (name, error) => console.error(`Solar module "${name}" stopped`, error) } = {}) {
    const modules = new Map();

    function drop(name, module, error) {
        modules.delete(name);
        onError(name, error);
        try { module.dispose?.(); } catch { /* already reported */ }
    }

    function each(hook, ...args) {
        for (const [name, module] of [...modules]) {
            try { module[hook]?.(...args); }
            catch (error) { drop(name, module, error); }
        }
    }

    return {
        add(name, module) {
            if (modules.has(name)) throw new Error(`Solar module "${name}" already added`);
            modules.set(name, module);
            return module;
        },
        remove(name) {
            const module = modules.get(name);
            if (!module) return false;
            modules.delete(name);
            module.dispose?.();
            return true;
        },
        has: (name) => modules.has(name),
        update: (dt, frame) => each("update", dt, frame),
        resize: (size) => each("resize", size),
        dispose() {
            for (const [name, module] of [...modules].reverse()) {
                try { module.dispose?.(); }
                catch (error) { onError(name, error); }
            }
            modules.clear();
        },
    };
}
