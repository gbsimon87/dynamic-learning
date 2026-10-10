import { createPortal } from "react-dom";
import { useModalDialog } from "./useModalDialog";
import "./Dialog.css";

/**
 * A ready-made modal (PROJECT_KNOWLEDGE §7 "Modal / overlay pattern"): a
 * backdrop, a panel and a close button around `children`. The behaviour —
 * focus in and trapped, Escape closes, page scroll locked, focus returned —
 * is the shared `useModalDialog`; the backdrop also closes it.
 *
 * `labelledBy` names the dialog from a heading inside it; `label` is the
 * fallback when there is no visible heading. `className` sizes the panel.
 */
export default function Dialog({ children, onClose, label, labelledBy, className = "" }) {
  const panelRef = useModalDialog(onClose);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  // Portalled to <body>: a transformed or clipped ancestor (a celebration
  // card, say) must never trap a fixed overlay inside itself.
  return createPortal(
    <div className="ui-dialog-backdrop" onClick={handleBackdropClick}>
      <div
        className={`ui-dialog-panel ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={labelledBy ? undefined : label}
        aria-labelledby={labelledBy}
        tabIndex={-1}
        ref={panelRef}
      >
        <button type="button" className="ui-dialog-close" onClick={onClose} aria-label="Close">
          <span aria-hidden="true">&#x2715;</span>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
