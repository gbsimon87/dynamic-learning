import { useModalDialog } from "../../../components/ui/useModalDialog";
import "./ReaderOverlay.css";

/**
 * A local, reading-agnostic dialog. Focus trapping, Escape and scroll locking
 * come from the shared useModalDialog hook.
 */
function ReaderOverlay({ children, onClose, label = "Reading" }) {
  const panelRef = useModalDialog(onClose);

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
