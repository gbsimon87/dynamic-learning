import "./FloatingGlyphBackground.css";

const GLYPHS = [
  { char: "7", left: 7, top: 8, size: 2.2, duration: 16, delay: 1 },
  { char: "✦", left: 89, top: 12, size: 1.6, duration: 19, delay: 4 },
  { char: "▲", left: 13, top: 32, size: 1.7, duration: 17, delay: 2 },
  { char: "3", left: 91, top: 39, size: 2.1, duration: 21, delay: 6 },
  { char: "●", left: 6, top: 64, size: 1.5, duration: 18, delay: 3 },
  { char: "b", left: 86, top: 71, size: 2, duration: 15, delay: 5 },
  { char: "★", left: 21, top: 91, size: 1.8, duration: 20, delay: 7 },
  { char: "5", left: 76, top: 94, size: 2.2, duration: 16, delay: 2 },
];

function FloatingGlyphBackground() {
  return (
    <div className="floating-glyph-background" aria-hidden="true">
      {GLYPHS.map((glyph, index) => (
        <span
          key={index}
          className="floating-glyph"
          style={{
            "--fg-base-left": `${glyph.left}%`,
            "--fg-base-top": `${glyph.top}%`,
            fontSize: `${glyph.size}rem`,
            animationDuration: `${glyph.duration}s`,
            animationDelay: `-${glyph.delay}s`,
          }}
        >
          {glyph.char}
        </span>
      ))}
    </div>
  );
}

export default FloatingGlyphBackground;
