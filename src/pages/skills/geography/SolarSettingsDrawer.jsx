import { useEffect, useRef } from "react";
import { SPEED_PRESETS, VIEW_TOGGLES } from "./solarViewSettings.js";
import "./SolarSettingsDrawer.css";

const PANEL_ID = "solar-settings-panel";
const HEADING_ID = "solar-settings-heading";
const SPEED_ID = "solar-settings-speed";

function GearGlyph() {
    return (
        <svg className="solar-settings__glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="3.2" />
            <path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1" />
        </svg>
    );
}

function CloseGlyph() {
    return (
        <svg className="solar-settings__glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M6 6l12 12M18 6L6 18" />
        </svg>
    );
}

export default function SolarSettingsDrawer({ settings, onChange, speed, onSpeedChange, open, onOpenChange }) {
    const triggerRef = useRef(null);
    const firstSwitchRef = useRef(null);
    const wasOpen = useRef(false);

    useEffect(() => {
        if (open) firstSwitchRef.current?.focus();
        else if (wasOpen.current) triggerRef.current?.focus();
        wasOpen.current = open;
    }, [open]);

    const handleKeyDown = (event) => {
        if (event.key === "Escape" && open) {
            event.stopPropagation();
            onOpenChange(false);
        }
    };

    return (
        <div className="solar-settings" onKeyDown={handleKeyDown}>
            {open && (
                <section id={PANEL_ID} className="solar-settings__panel" aria-labelledby={HEADING_ID}>
                    <header className="solar-settings__header">
                        <h2 id={HEADING_ID} className="solar-settings__title">My view</h2>
                        <button
                            type="button"
                            className="solar-settings__close"
                            aria-label="Close my view settings"
                            onClick={() => onOpenChange(false)}
                        >
                            <CloseGlyph />
                        </button>
                    </header>
                    <ul className="solar-settings__list">
                        {VIEW_TOGGLES.map((toggle, index) => {
                            const on = Boolean(settings[toggle.key]);
                            return (
                                <li key={toggle.key}>
                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={on}
                                        className="solar-settings__switch"
                                        ref={index === 0 ? firstSwitchRef : undefined}
                                        onClick={() => onChange(toggle.key, !on)}
                                    >
                                        <span className="solar-settings__icon" aria-hidden="true">{toggle.icon}</span>
                                        <span className="solar-settings__label">{toggle.label}</span>
                                        <span className="solar-settings__track" aria-hidden="true">
                                            <span className="solar-settings__thumb" />
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    {onSpeedChange && (
                        <div className="solar-settings__speed" role="group" aria-labelledby={SPEED_ID}>
                            <h3 id={SPEED_ID} className="solar-settings__subtitle">Planet speed</h3>
                            <div className="solar-settings__speed-buttons">
                                {SPEED_PRESETS.map((preset) => (
                                    <button
                                        key={preset.key}
                                        type="button"
                                        aria-pressed={speed === preset.key}
                                        className="solar-settings__speed-button"
                                        onClick={() => onSpeedChange(preset.key)}
                                    >
                                        <span className="solar-settings__speed-icon" aria-hidden="true">{preset.icon}</span>
                                        {preset.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}
            <button
                type="button"
                ref={triggerRef}
                className="solar-settings__trigger"
                aria-label="My view settings"
                aria-expanded={open}
                aria-controls={PANEL_ID}
                onClick={() => onOpenChange(!open)}
            >
                <GearGlyph />
            </button>
        </div>
    );
}
