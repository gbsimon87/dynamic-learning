/**
 * Bix's signature for a certificate: a little Bix face beside a hand-drawn
 * "Bix" scrawl. Both are inline SVG — no image file and no web font (the app
 * self-hosts ABeeZee only, a privacy decision) — and their colours are
 * certificate tokens, so they follow the theme and print in light ink.
 *
 * Decorative to assistive technology; the caption carries the words.
 */
export default function BixSignature() {
  return (
    <div className="certificate-signature">
      <svg className="certificate-bix" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <line x1="25" y1="17" x2="19" y2="6" className="certificate-bix-stroke" />
        <line x1="39" y1="17" x2="45" y2="6" className="certificate-bix-stroke" />
        <circle cx="19" cy="6" r="4.5" className="certificate-bix-dot" />
        <circle cx="45" cy="6" r="4.5" className="certificate-bix-dot" />
        <path
          className="certificate-bix-body"
          d="M32 15c14 0 25 9 25 23 0 13-11 22-25 22S7 51 7 38c0-14 11-23 25-23z"
        />
        <circle cx="24" cy="35" r="6.5" fill="#fff" />
        <circle cx="40" cy="35" r="6.5" fill="#fff" />
        <circle cx="25" cy="36" r="3.2" className="certificate-bix-pupil" />
        <circle cx="41" cy="36" r="3.2" className="certificate-bix-pupil" />
        <ellipse cx="16" cy="45" rx="4" ry="2.5" className="certificate-bix-cheek" />
        <ellipse cx="48" cy="45" rx="4" ry="2.5" className="certificate-bix-cheek" />
        <path d="M26 46q6 6 12 0" className="certificate-bix-mouth" />
      </svg>

      <div className="certificate-sign">
        <svg className="certificate-scrawl" viewBox="0 0 132 56" aria-hidden="true" focusable="false">
          {/* B */}
          <path d="M14 46c3-12 5-25 9-38" />
          <path d="M20 10c12-6 24-3 21 6-2 6-10 8-17 9 13-1 22 4 19 12-3 7-15 10-29 9" />
          {/* i, joined on from the B */}
          <path d="M42 38c4-1 8-5 11-11-1 6-2 11 0 13 3 2 7-2 10-6" />
          <path d="M55 15.5l1.5 1" />
          {/* x */}
          <path d="M63 34c3-6 7-8 9-4 2 5 5 9 10 9" />
          <path d="M84 25c-6 4-12 11-18 19" />
          {/* the flourish underneath */}
          <path d="M8 52c30-5 70-6 116-9" />
        </svg>
        <span className="certificate-caption">Bix, your learning buddy</span>
      </div>
    </div>
  );
}
