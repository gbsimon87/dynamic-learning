/**
 * The year finale's keepsake. "Print" uses the browser's own print dialog,
 * which also offers "Save as PDF"; the print stylesheet hides everything but
 * the certificate.
 */
export default function CertificateStep({ year, subjectName, childName, headingRef, focalRef }) {
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <h2 ref={headingRef} tabIndex={-1}>Your certificate</h2>

      <div className="celebration-certificate" ref={focalRef}>
        <p className="celebration-certificate-title">Certificate of Achievement</p>
        <p className="celebration-certificate-small">This certificate celebrates that</p>
        <p className="celebration-certificate-name">{childName || "a brilliant learner"}</p>
        <p className="celebration-certificate-small">
          finished every Year {year} {subjectName} challenge
        </p>
        <p className="celebration-certificate-seal" aria-hidden="true">🏆</p>
        <p className="celebration-certificate-date">{date} · Dynamic Learning</p>
      </div>

      <button
        type="button"
        className="completion-celebration-secondary celebration-print"
        onClick={() => window.print()}
      >
        Print or save
      </button>
    </>
  );
}
