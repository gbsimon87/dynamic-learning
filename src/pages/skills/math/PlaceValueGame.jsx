import { useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import ChoiceGrid from "../../../components/challenge/ChoiceGrid";
import PlaceValueBlocks from "../../../components/challenge/PlaceValueBlocks";
import { blockPicture3, buildNumberFromBlocks, digitsOf } from "../../../data/challenges/placeValue3Digit";
import { clamp } from "../../../data/challenges/statistics";
import { BUILD_LIMITS, makePlaceValueQuestion } from "../../../data/freePlay/placeValue";
import "./PlaceValueGame.css";

/**
 * Place Value Blocks — free play with the kit's base-ten blocks.
 *
 * Read the blocks (the counts are hidden, so the pieces are counted), build a
 * number with + / −, or say what a digit is worth. Building accepts any
 * blocks that make the number, so 3 tens and 17 ones is as right as 4 tens
 * and 7 ones — the regrouping Year 3 asks for. Easier is tens and ones to 50;
 * Harder is hundreds, tens and ones.
 */
function PlaceValueGame() {
  return (
    <FreePlayShell
      title="Place Value Blocks"
      icon="🧱"
      intro="Count the blocks, build numbers, and find what each digit is worth."
      makeQuestion={makePlaceValueQuestion}
      render={(props) =>
        props.question.kind === "build" ? <BuildNumber {...props} /> : <PickNumber {...props} />
      }
    />
  );
}

function PickNumber({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {question.kind === "read" ? (
        <PlaceValueBlocks blocks={blockPicture3(question.value)} label={question.label} showCounts={false} />
      ) : (
        <DigitCard value={question.value} place={question.place} />
      )}

      <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

/** The number in big digits, with the asked-about digit picked out. */
function DigitCard({ value, place }) {
  const digits = digitsOf(value);
  const places = value >= 100 ? ["hundreds", "tens", "ones"] : ["tens", "ones"];
  return (
    <p className="place-value-digits" aria-hidden="true">
      {places.map((p) => (
        <span key={p} className={`place-value-digit ${p === place ? "is-asked" : ""}`}>
          {digits[p]}
        </span>
      ))}
    </p>
  );
}

function BuildNumber({ question, submit, locked }) {
  const [blocks, setBlocks] = useState({ hundreds: 0, tens: 0, ones: 0 });
  const total = buildNumberFromBlocks(blocks);

  // The blocks report a STEP; apply it to the previous state and clamp, so
  // two fast taps in one React batch both count.
  const step = (place, delta) => {
    if (locked) return;
    setBlocks((prev) => ({ ...prev, [place]: clamp(prev[place] + delta, 0, BUILD_LIMITS[place]) }));
  };

  return (
    <>
      {/* Each column shows its count, but there is no running total: adding
          until a total reads 47 would skip the place value entirely. */}
      <PlaceValueBlocks blocks={blocks} onStep={step} label={`Build ${question.value}`} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || total === 0}
        onClick={() => submit(total === question.value)}
      >
        Check my answer
      </button>
    </>
  );
}

export default PlaceValueGame;
