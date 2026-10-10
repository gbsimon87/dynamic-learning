import { useId } from "react";
import Dialog from "../ui/Dialog";
import Certificate, { PrintCertificateButton } from "./Certificate";

/**
 * A certificate in a dialog, with "Print or save" and "Close". Used by the
 * celebration's sticker step (a topic's certificate) and the Trophy Room
 * (any certificate, reprinted later — `reprint`). Read-only: opening or
 * printing a certificate never writes progress or rewards.
 */
export default function CertificateDialog({ certificate, child, reprint = false, onClose }) {
  const headingId = useId();

  return (
    <Dialog onClose={onClose} labelledBy={headingId} className="certificate-dialog">
      <h2 id={headingId} className="certificate-dialog-title">{certificate.label}</h2>
      <Certificate certificate={certificate} child={child} reprint={reprint} printable />
      <div className="certificate-dialog-actions">
        <PrintCertificateButton />
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </Dialog>
  );
}
