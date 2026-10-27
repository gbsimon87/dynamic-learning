import { useEffect, useId, useRef, useState } from "react";

/**
 * The toolbar's More menu: the less-used modes (constellations, meteor,
 * Beyond, galaxy map) in one labelled list, so the toolbar keeps a few big
 * buttons at every width. A disclosure, not an ARIA menu: Tab moves through
 * the choices, Escape or a tap outside closes it, and choosing one closes it
 * before running it. Focus returns to More when the list closes.
 */
export default function SolarToolbarMenu({ items, disabled = false, buttonRef }) {
    const [open, setOpen] = useState(false);
    const listId = useId();
    const root = useRef(null);
    const toggle = useRef(null);
    const firstItem = useRef(null);

    const setToggle = (node) => {
        toggle.current = node;
        if (typeof buttonRef === "function") buttonRef(node);
        else if (buttonRef) buttonRef.current = node;
    };

    useEffect(() => {
        if (!open) return undefined;
        firstItem.current?.focus();
        const outside = (event) => { if (!root.current?.contains(event.target)) setOpen(false); };
        document.addEventListener("pointerdown", outside);
        return () => document.removeEventListener("pointerdown", outside);
    }, [open]);

    const close = () => { setOpen(false); toggle.current?.focus(); };

    return <div className="solar-toolbar-menu" ref={root}
        onKeyDown={(event) => {
            if (event.key !== "Escape" || !open) return;
            // The page's Escape resets the view; this one only closes the list.
            event.preventDefault(); event.stopPropagation();
            close();
        }}>
        <button
            type="button"
            ref={setToggle}
            className="solar-tour-launch"
            aria-label="More things to do"
            aria-expanded={open}
            aria-controls={listId}
            disabled={disabled}
            onClick={() => setOpen((value) => !value)}
        >
            <span className="solar-tour-launch__icon" aria-hidden="true">☰</span>
            <span className="solar-action-label">More</span>
        </button>
        {open && <div className="solar-toolbar-menu__list" id={listId} role="group" aria-label="More things to do">
            {items.map((item, index) => <button
                key={item.id}
                ref={index === 0 ? firstItem : undefined}
                type="button"
                className="solar-toolbar-menu__item"
                aria-label={item.ariaLabel}
                disabled={item.disabled}
                onClick={() => { setOpen(false); item.onSelect(); }}
            >
                <span className="solar-tour-launch__icon" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
            </button>)}
        </div>}
    </div>;
}
