import { useMemo, useState } from "react";
import ArrayGrid from "../../../../../components/challenge/ArrayGrid";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import CorrespondenceBoard from "../../../../../components/challenge/CorrespondenceBoard";
import FactTriangle from "../../../../../components/challenge/FactTriangle";
import NumberInput from "../../../../../components/challenge/NumberInput";
import PartitionBoard from "../../../../../components/challenge/PartitionBoard";
import ShortMultiplication from "../../../../../components/challenge/ShortMultiplication";
import {
  buildTablesQuestions,
  buildEightQuestions,
  buildTwoDigitQuestions,
  buildScalingQuestions,
  buildMulDivProblemQuestions,
} from "../../../../../data/challenges/year3MulDiv";
import { isCorrectNumber } from "../../../../../data/challenges/placeValue3Digit";

const BUILDERS = {
  tables: buildTablesQuestions,
  eight: buildEightQuestions,
  twoDigit: buildTwoDigitQuestions,
  scaling: buildScalingQuestions,
  problems: buildMulDivProblemQuestions,
};

const TITLES = {
  tables: [
    "Count rows from the 3 and 4 times tables.",
    "Recall the 3 and 4 times tables.",
    "Use a fact family.",
    "Solve a 3 or 4 times table story.",
  ],
  eight: [
    "Double the 4 times table to make the 8 times table.",
    "Recall the 8 times table.",
    "Share equally between 8 groups.",
    "Solve an 8 times table story.",
  ],
  twoDigit: [
    "Read a partitioned multiplication.",
    "Build a multiplication or division partition.",
    "Use short multiplication.",
    "Solve a two-digit multiplication or division story.",
  ],
  scaling: [
    "Find a scaled amount.",
    "Find the scale factor.",
    "Connect every possible pair.",
    "Solve a scaling or matching story.",
  ],
  problems: [
    "Choose the operation that matches the story.",
    "Find the missing number.",
    "Use a known fact to find a new fact.",
    "Solve a two-step problem.",
  ],
};

function Year3MulDivGame({ topic, level, onComplete }) {
  const questions = useMemo(() => BUILDERS[topic](level, Math.random), [topic, level]);

  return (
    <ChallengeShell
      title={TITLES[topic][level - 1]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index }) => (
        <MulDivRound key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CheckButton({ disabled, onClick }) {
  return (
    <button type="button" className="submit-btn" disabled={disabled} onClick={onClick}>
      Check my answer
    </button>
  );
}

function ScaleComparison({ question }) {
  const baseWidth = `${Math.max(10, 100 / question.factor)}%`;
  const hidesScaledAmount = question.type === "scale-read";
  return (
    <div
      className="scale-comparison"
      role="img"
      aria-label={`${question.subject.short} is ${question.base} ${question.subject.unit}. ${question.subject.tall} is ${hidesScaledAmount ? "the unknown length" : `${question.big} ${question.subject.unit}`}.`}
    >
      <div className="scale-row">
        <span className="scale-row-label">{question.subject.short}</span>
        <span className="scale-bar base" style={{ width: baseWidth }}>{question.base} {question.subject.unit}</span>
      </div>
      <div className="scale-row">
        <span className="scale-row-label">{question.subject.tall}</span>
        <span className="scale-bar" style={{ width: "100%" }}>
          {hidesScaledAmount ? `? ${question.subject.unit}` : `${question.big} ${question.subject.unit}`}
        </span>
      </div>
    </div>
  );
}

function MulDivRound({ question, submit, locked }) {
  const [choice, setChoice] = useState(null);
  const [value, setValue] = useState("");
  const [dealt, setDealt] = useState(0);
  const [partitionValues, setPartitionValues] = useState({ tens: "", ones: "" });
  const [activePart, setActivePart] = useState("tens");
  const [digits, setDigits] = useState({ hundreds: "", tens: "", ones: "" });
  const [activePlace, setActivePlace] = useState("ones");
  const [connections, setConnections] = useState([]);

  const numericAnswer = (answer) => isCorrectNumber(value, answer);
  const input = (label, maxDigits = 3) => (
    <NumberInput label={label} value={value} onChange={setValue} disabled={locked} maxDigits={maxDigits} />
  );
  const check = (ready, correct) => (
    <CheckButton disabled={locked || !ready} onClick={() => submit(correct)} />
  );

  if (question.type === "array-product") return (
    <>
      <p className="challenge-prompt">
        This array has {question.rows} rows of {question.columns}. How many dots are there?
      </p>
      <ArrayGrid rows={question.grid} label={`${question.rows} rows of ${question.columns} dots`} />
      <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
      {check(choice !== null, choice === question.answer)}
    </>
  );

  if (question.type === "fact-recall" || question.type === "eight-recall") return (
    <>
      <p className="equation-display">{question.a} × {question.b} = ?</p>
      {input("My answer is")}
      {check(value !== "", numericAnswer(question.answer))}
    </>
  );

  if (question.type === "fact-triangle") return (
    <>
      <p className="challenge-prompt">Use the triangle to complete {question.statement}</p>
      <FactTriangle
        left={question.left}
        right={question.right}
        product={question.product}
        hidden={question.hidden}
        label={`Fact triangle for ${question.left}, ${question.right}, and ${question.product}; ${question.hidden} is hidden`}
      />
      {input("Missing number")}
      {check(value !== "", numericAnswer(question.answer))}
    </>
  );

  if (["table-story", "eight-story", "two-digit-story", "scaling-story", "two-step-story"].includes(question.type)) return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>
      {input("My answer is")}
      {check(value !== "", numericAnswer(question.answer))}
    </>
  );

  if (question.type === "double-chain") return (
    <>
      <p className="challenge-prompt">Keep doubling. What is 8 × {question.other}?</p>
      <div className="double-chain" role="img" aria-label={`Two times ${question.other} is ${question.twice}; four times is ${question.fourTimes}; eight times is unknown`}>
        <span className="double-chain-step">2 × {question.other}<br />= {question.twice}</span>
        <span className="double-chain-arrow">double →</span>
        <span className="double-chain-step">4 × {question.other}<br />= {question.fourTimes}</span>
        <span className="double-chain-arrow">double →</span>
        <span className="double-chain-step">8 × {question.other}<br />= ?</span>
      </div>
      <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
      {check(choice !== null, choice === question.answer)}
    </>
  );

  if (question.type === "share-groups") {
    const left = question.total - dealt * question.groups;
    return (
      <>
        <p className="challenge-prompt">
          Share {question.total} counters equally between 8 groups. Deal one counter to every group each time.
        </p>
        <div className="share-groups" role="img" aria-label={`Eight groups with ${dealt} counters in each`}>
          {Array.from({ length: question.groups }, (_, index) => (
            <div key={index} className="share-group" aria-hidden="true">{"●".repeat(dealt) || "empty"}</div>
          ))}
        </div>
        <p className="challenge-running">{left} counters left · {dealt} in each group</p>
        <button
          type="button"
          className="deal-btn"
          disabled={locked || left === 0}
          onClick={() => setDealt((previous) => Math.min(question.each, previous + 1))}
        >
          Deal one to every group
        </button>
        {check(dealt > 0, dealt === question.answer)}
      </>
    );
  }

  if (question.type === "partition") {
    const building = question.mode === "build";
    const setActivePartValue = (updater) => {
      setPartitionValues((previous) => ({
        ...previous,
        [activePart]: typeof updater === "function" ? updater(previous[activePart]) : updater,
      }));
    };
    const partitionCorrect = question.cells.every((cell) => isCorrectNumber(partitionValues[cell.key], cell.value));
    return (
      <>
        <p className="challenge-prompt">
          {building ? "Fill both friendly parts of the calculation." : "The calculation has been split into friendly parts. What is the total?"}
        </p>
        <PartitionBoard
          heading={question.heading}
          cells={question.cells}
          values={building ? partitionValues : undefined}
          activeKey={building ? activePart : undefined}
          onSelect={building && !locked ? setActivePart : undefined}
          disabled={locked}
          label={`${question.heading} split into ${question.cells.map((cell) => cell.label).join(" and ")}`}
        />
        {building ? (
          <>
            <p className="challenge-prompt">Enter the value of {question.cells.find((cell) => cell.key === activePart).label}.</p>
            <NumberInput hideField value={partitionValues[activePart]} onChange={setActivePartValue} disabled={locked} />
            {check(Object.values(partitionValues).every((part) => part !== ""), partitionCorrect)}
          </>
        ) : (
          <>
            <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
            {check(choice !== null, choice === question.answer)}
          </>
        )}
      </>
    );
  }

  if (question.type === "short-multiplication") {
    const setActiveDigit = (updater) => {
      setDigits((previous) => ({
        ...previous,
        [activePlace]: typeof updater === "function" ? updater(previous[activePlace]) : updater,
      }));
    };
    const entered = `${digits.hundreds}${digits.tens}${digits.ones}`;
    return (
      <>
        <p className="challenge-prompt">Work from the ones column. Fill in all three answer digits.</p>
        <ShortMultiplication
          top={question.a}
          multiplier={question.b}
          digits={digits}
          activePlace={activePlace}
          onSelect={setActivePlace}
          disabled={locked}
          label={`${question.a} times ${question.b}. Select an answer column and enter its digit.`}
        />
        <p className="challenge-prompt" aria-live="polite">Enter the {activePlace} digit.</p>
        <NumberInput hideField maxDigits={1} value={digits[activePlace]} onChange={setActiveDigit} disabled={locked} />
        {check(Object.values(digits).every((digit) => digit !== ""), isCorrectNumber(entered, question.answer))}
      </>
    );
  }

  if (question.type === "scale-read" || question.type === "scale-factor") return (
    <>
      <p className="challenge-prompt">
        {question.type === "scale-read"
          ? `${question.subject.tall} is ${question.factor} times ${question.subject.verb} ${question.subject.short}. How ${question.subject.verb.replace("as ", "")} is it?`
          : `How many times ${question.subject.verb} ${question.subject.short} is ${question.subject.tall}?`}
      </p>
      <ScaleComparison question={question} />
      {question.type === "scale-read" ? (
        <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
      ) : input("Number of times", 2)}
      {check(question.type === "scale-read" ? choice !== null : value !== "", question.type === "scale-read" ? choice === question.answer : numericAnswer(question.answer))}
    </>
  );

  if (question.type === "correspondence") {
    const toggleConnection = (id) => setConnections((previous) => (
      previous.includes(id) ? previous.filter((connection) => connection !== id) : [...previous, id]
    ));
    return (
      <>
        <p className="challenge-prompt">Tap every possible pair. Make all {question.noun}.</p>
        <CorrespondenceBoard
          tops={question.tops}
          bottoms={question.bottoms}
          selected={connections}
          onToggle={toggleConnection}
          disabled={locked}
          topName={question.topName}
          bottomName={question.bottomName}
        />
        {check(connections.length > 0, connections.length === question.answer)}
      </>
    );
  }

  if (question.type === "pick-operation") return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>
      <p className="known-fact">Which calculation matches the story?</p>
      <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
      {check(choice !== null, choice === question.answerOption)}
    </>
  );

  if (question.type === "missing-number") return (
    <>
      <p className="challenge-prompt">What number belongs in the gap?</p>
      <p className="equation-display">
        {question.parts.map((part, index) => (
          <span key={`${part}-${index}`} className={part === "?" ? "partition-gap" : ""}>{part}{" "}</span>
        ))}
      </p>
      {input("Missing number")}
      {check(value !== "", numericAnswer(question.answer))}
    </>
  );

  if (question.type === "derive-fact") return (
    <>
      <p className="challenge-prompt">Use the known fact to work out the new fact.</p>
      <p className="known-fact">Known: {question.known}</p>
      <p className="equation-display">{question.derived}</p>
      {input("Missing number")}
      {check(value !== "", numericAnswer(question.answer))}
    </>
  );

  return null;
}

export default Year3MulDivGame;
