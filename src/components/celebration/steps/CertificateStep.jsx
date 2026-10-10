import { useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../../context/auth-context";
import { describeCertificate, registeredSubjectNames } from "../../../data/certificates";
import Certificate, { PrintCertificateButton } from "../../certificate/Certificate";

const HEADINGS = {
  category: "Your quest certificate",
  subject: "Your subject certificate",
  year: "Your certificate",
};

/**
 * The keepsake for the biggest thing just finished — a quest, a subject or a
 * year (`step.kind`, from buildCelebrationSteps). "Print or save" uses the
 * browser's own print dialog, which also offers "Save as PDF"; the print
 * stylesheet prints only the certificate.
 *
 * The subject and quest ids come from the challenge route
 * (/year/:year/:subject/problem/:categoryId/…) the celebration plays on; the
 * names from the milestone summary.
 */
export default function CertificateStep({ step, result, year, subjectName, childName, headingRef, focalRef }) {
  const child = useContext(AuthContext)?.child;
  const { subject, categoryId } = useParams();
  const kind = step.kind ?? "year";

  const certificate = describeCertificate({
    kind,
    year,
    subject,
    subjectName,
    subjectNames: registeredSubjectNames(year),
    categoryId,
    categoryTitle: result?.summary?.categoryTitle,
  });

  return (
    <>
      <h2 ref={headingRef} tabIndex={-1}>{HEADINGS[kind] ?? HEADINGS.year}</h2>

      <div ref={focalRef}>
        <Certificate certificate={certificate} child={{ ...child, name: childName ?? child?.name }} printable />
      </div>

      <PrintCertificateButton className="completion-celebration-secondary celebration-print" />
    </>
  );
}
