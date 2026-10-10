import { useContext, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../../context/auth-context";
import { describeCertificate } from "../../../data/certificates";
import CertificateDialog from "../../certificate/CertificateDialog";

/**
 * A topic's sticker drops onto the page, as if stuck into a book.
 *
 * "See my certificate" opens the topic's certificate in a dialog (with
 * "Print or save") rather than adding a step, so a topic's sequence stays
 * short. The subject id comes from the challenge route the celebration plays on.
 */
export default function StickerStep({ step, year, subjectName, childName, headingRef, focalRef }) {
  const { sticker } = step;
  const child = useContext(AuthContext)?.child;
  const { subject } = useParams();
  const [showCertificate, setShowCertificate] = useState(false);

  const certificate = describeCertificate({
    kind: "topic",
    year,
    subject,
    subjectName,
    topicId: sticker.topicId,
    topicName: sticker.name,
    icon: sticker.icon,
  });

  return (
    <>
      <p className="completion-celebration-eyebrow">For your sticker book</p>
      <h2 ref={headingRef} tabIndex={-1}>New sticker!</h2>

      <div className="celebration-sticker" ref={focalRef}>
        <span className="celebration-sticker-icon" aria-hidden="true">{sticker.icon}</span>
      </div>

      <p className="celebration-reward-name">{sticker.name}</p>
      <p className="completion-celebration-message">
        You earned it by finishing every challenge in this topic.
      </p>

      <button
        type="button"
        className="completion-celebration-secondary celebration-see-certificate"
        onClick={() => setShowCertificate(true)}
      >
        <span aria-hidden="true">📜 </span>See my certificate
      </button>

      {showCertificate && (
        <CertificateDialog
          certificate={certificate}
          child={{ ...child, name: childName ?? child?.name }}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </>
  );
}
