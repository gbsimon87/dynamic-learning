import { useEffect, useRef } from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The app's one modal behaviour (PROJECT_KNOWLEDGE §7, "Modal / overlay
 * pattern"): while mounted, focus moves into the panel, Tab is trapped inside
 * it, Escape calls `onClose`, the page behind stops scrolling, and focus goes
 * back where it was on unmount. Used by Speed Reader's ReaderOverlay and the
 * brain-break dialog.
 *
 * Returns the ref for the panel element (give it `tabIndex={-1}`).
 */
export function useModalDialog(onClose) {
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const returnFocus = document.activeElement;
    panelRef.current?.focus();
    return () => {
      if (returnFocus?.isConnected && typeof returnFocus.focus === "function") returnFocus.focus();
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
        onCloseRef.current?.();
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
  }, []);

  return panelRef;
}
