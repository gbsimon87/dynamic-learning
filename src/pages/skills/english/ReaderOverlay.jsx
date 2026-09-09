import { useEffect, useRef } from "react";
import "./ReaderOverlay.css";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * A local, reading-agnostic dialog with focus trapping and scroll locking.
 */
function ReaderOverlay({ children, onClose, label = "Reading" }) {
  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);

  useEffect(() => {
    returnFocusRef.current = document.activeElement;
    panelRef.current?.focus();

    return () => {
      const target = returnFocusRef.current;
      if (target?.isConnected && typeof target.focus === "function") {
        target.focus();
      }
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusableItems = Array.from(panel.querySelectorAll(FOCUSABLE));
      if (focusableItems.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusableItems[0];
      const last = focusableItems[focusableItems.length - 1];
      const active = document.activeElement;

      if (active === panel || !panel.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className="ro-backdrop" onClick={handleBackdropClick}>
      <div
        className="ro-panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        ref={panelRef}
      >
        <button
          type="button"
          className="ro-close"
          onClick={onClose}
          aria-label="Close"
        >
          <span aria-hidden="true">&#x2715;</span>
        </button>
        {children}
      </div>
    </div>
  );
}

export default ReaderOverlay;
