import { createPortal } from "react-dom";
import { certificateDate } from "../../data/certificates";
import BixSignature from "./BixSignature";
import "./Certificate.css";

/**
 * One certificate — a topic, a quest (category), a subject or a year. The
 * words come from `describeCertificate` (src/data/certificates.js); this only
 * lays them out with the child's name, picture and colour, the date and Bix's
 * signature.
 *
 * `reprint` marks a certificate opened later from the Trophy Room. Nothing
 * stores when a milestone was reached, so it is dated the day it is printed
 * and says so, rather than pretending to be the day it was earned.
 *
 * `printable` also renders a print-only copy straight into <body>; the print
 * stylesheet (Certificate.css) shows only that copy, so "Print or save" gives
 * one A4 page whatever page it was opened on. Render at most one printable
 * certificate at a time.
 */
export default function Certificate({
  certificate,
  child,
  date = new Date(),
  reprint = false,
  printable = false,
  headingId,
}) {
  const body = (
    <CertificateBody certificate={certificate} child={child} date={date} reprint={reprint} headingId={headingId} />
  );
  return (
    <>
      {body}
      {printable && typeof document !== "undefined" &&
        createPortal(
          <div className="certificate-print-sheet" aria-hidden="true">
            <CertificateBody certificate={certificate} child={child} date={date} reprint={reprint} />
          </div>,
          document.body
        )}
    </>
  );
}

function CertificateBody({ certificate, child, date, reprint, headingId }) {
  const { kind, label, achievement, context, statement, icon } = certificate;
  const name = child?.name?.trim() || "a brilliant learner";
  const day = certificateDate(date);
  // The profile stores a colour TOKEN name, never a literal (avatars.js).
  const style = child?.colour ? { "--certificate-avatar": `var(${child.colour})` } : undefined;
  const showContext = (kind === "topic" || kind === "category") && context;

  return (
    <div className={`certificate certificate-${kind}`} style={style}>
      <p className="certificate-label">{label}</p>
      <p className="certificate-title" id={headingId}>Certificate of Achievement</p>
      <p className="certificate-small">This certificate celebrates that</p>

      <div className="certificate-who">
        {child?.avatar && <span className="certificate-avatar" aria-hidden="true">{child.avatar}</span>}
        <p className="certificate-name">{name}</p>
      </div>

      <p className="certificate-achievement">{achievement}</p>
      {showContext && <p className="certificate-context">{context}</p>}

      <div className="certificate-statement">
        <span className="certificate-seal" aria-hidden="true">{icon}</span>
        <p>{statement}</p>
      </div>

      <div className="certificate-footer">
        <div className="certificate-date">
          <span className="certificate-line">{reprint ? `Printed ${day}` : day}</span>
          <span className="certificate-caption">{reprint ? "Reprinted from the Trophy Room" : "Date"}</span>
        </div>
        <BixSignature />
      </div>
    </div>
  );
}

/** Opens the browser's print dialog, which also offers "Save as PDF". */
export function PrintCertificateButton({ className = "" }) {
  return (
    <button type="button" className={`certificate-print-button ${className}`.trim()} onClick={() => window.print()}>
      <span aria-hidden="true">🖨️ </span>Print or save
    </button>
  );
}
