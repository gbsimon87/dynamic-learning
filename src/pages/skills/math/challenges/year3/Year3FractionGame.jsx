import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DragToOrder from "../../../../../components/challenge/DragToOrder";
import EquivalentBarMatch from "../../../../../components/challenge/EquivalentBarMatch";
import FractionBar from "../../../../../components/challenge/FractionBar";
import FractionEquationBoard from "../../../../../components/challenge/FractionEquationBoard";
import FractionNumberTrack from "../../../../../components/challenge/FractionNumberTrack";
import FractionSetBoard from "../../../../../components/challenge/FractionSetBoard";
import FractionShadeBoard from "../../../../../components/challenge/FractionShadeBoard";
import NumberInput from "../../../../../components/challenge/NumberInput";
import {
  buildTenthsQuestions, buildSetQuestions, buildNumbersQuestions,
  buildEquivalentQuestions, buildArithmeticQuestions, buildComparingQuestions,
  buildFractionProblemQuestions, fractionText, fractionValue, shadedParts,
} from "../../../../../data/challenges/year3Fractions";
import { isCorrectNumber } from "../../../../../data/challenges/placeValue3Digit";

const BUILDERS = {
  tenths: buildTenthsQuestions,
  sets: buildSetQuestions,
  numbers: buildNumbersQuestions,
  equivalent: buildEquivalentQuestions,
  arithmetic: buildArithmeticQuestions,
  comparing: buildComparingQuestions,
  problems: buildFractionProblemQuestions,
};

const TITLES = {
  tenths: ["Read tenths on a bar.", "Find tenths on a line.", "Shade tenths yourself.", "Share into ten equal parts."],
  sets: ["Find one equal share.", "Find more than one share.", "Read a fraction of a set.", "Solve a fraction story."],
  numbers: ["Read the shaded fraction.", "Place a fraction on the line.", "Go past one whole.", "Write a fraction past one whole."],
  equivalent: ["Find the matching bar.", "Look for the same amount.", "Build an equal fraction.", "Write the missing top number."],
  arithmetic: ["Add fractions with the same bottom number.", "Build the sum.", "Build the difference.", "Solve a fraction story."],
  comparing: ["Which unit fraction is larger?", "Compare fractions with the same bottom number.", "Order the fractions.", "Compare fractions in a story."],
  problems: ["Find a fraction of a group.", "Add parts of one whole.", "Find an equivalent fraction.", "Solve a two-step fraction story."],
};

function Year3FractionGame({ topic, level, onComplete }) {
  const questions = useMemo(() => BUILDERS[topic](level, Math.random), [topic, level]);
  return (
    <ChallengeShell
      title={TITLES[topic][level - 1]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index }) => (
        <FractionRound key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CheckButton({ disabled, onClick }) {
  return <button type="button" className="submit-btn" disabled={disabled} onClick={onClick}>Check my answer</button>;
}

function FractionRound({ question, submit, locked }) {
  const [choice, setChoice] = useState(null);
  const [value, setValue] = useState("");
  const [picked, setPicked] = useState([]);
  const [position, setPosition] = useState(null);
  const [order, setOrder] = useState(question.items ?? []);
  const countPicked = picked.filter(Boolean).length;
  const toggle = (index) => setPicked((previous) => {
    const next = [...previous];
    next[index] = !next[index];
    return next;
  });
  const numericAnswer = (answer) => isCorrectNumber(value, answer);
  const input = (label) => <NumberInput label={label} value={value} onChange={setValue} disabled={locked} />;
  const check = (ready, correct) => <CheckButton disabled={locked || !ready} onClick={() => submit(correct)} />;

  if (question.type === "read-bar") {
    const answer = fractionText(question.numerator, question.denominator);
    return <>
      <p className="challenge-prompt">What fraction of the bar is shaded?</p>
      <FractionBar parts={shadedParts(question.numerator, question.denominator)} label="A bar divided into equal parts; count the shaded parts" />
      <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
      {check(choice !== null, choice === answer)}
    </>;
  }

  if (question.type === "track") return <>
    <p className="challenge-prompt">Tap {fractionText(question.numerator, question.denominator)} on the number line.</p>
    <FractionNumberTrack denominator={question.denominator} wholes={question.wholes ?? 1} selected={position} onSelect={setPosition} disabled={locked} />
    {check(position !== null, position === question.numerator)}
  </>;

  if (question.type === "shade") return <>
    <p className="challenge-prompt">Shade {fractionText(question.numerator, question.denominator)} of the whole.</p>
    <FractionShadeBoard denominator={question.denominator} selected={picked} onToggle={toggle} disabled={locked} />
    {check(countPicked > 0, countPicked === question.numerator)}
  </>;

  if (question.type === "share-tenths") return <>
    <p className="challenge-prompt">Share {question.numerator} cakes equally between 10 children. Each child gets how many tenths of a cake?</p>
    {input("Top number, above 10")}
    {check(value !== "", numericAnswer(question.numerator))}
  </>;

  if (question.type === "select-set") return <>
    <p className="challenge-prompt">Tap {fractionText(question.numerator, question.denominator)} of these {question.total} objects.</p>
    <FractionSetBoard total={question.total} selected={picked} groupSize={question.groupSize} onToggle={toggle} disabled={locked} />
    {check(countPicked > 0, countPicked === question.answer)}
  </>;

  if (question.type === "read-set") return <>
    <p className="challenge-prompt">{question.answer} of these {question.total} objects are coloured. What fraction is that? Fill in the top number of ?/{question.denominator}.</p>
    <FractionSetBoard total={question.total} selected={shadedParts(question.answer, question.total)} groupSize={question.total / question.denominator} />
    {input("Top number of the fraction")}
    {check(value !== "", numericAnswer(question.numerator))}
  </>;

  if (question.type === "set-story") return <>
    <p className="challenge-prompt">There are {question.total} counters. {fractionText(question.numerator, question.denominator)} of them are blue. How many are blue?</p>
    <FractionSetBoard total={question.total} />
    {input("Blue counters")}
    {check(value !== "", numericAnswer(question.answer))}
  </>;

  if (question.type === "mixed-number-story") return <>
    <p className="challenge-prompt">A ribbon is 1 whole metre and {fractionText(question.numerator - question.denominator, question.denominator)} metre more. How many {question.denominator}ths of a metre is that altogether?</p>
    {input("Number of equal parts")}
    {check(value !== "", numericAnswer(question.numerator))}
  </>;

  if (question.type === "match-bars") {
    const correct = question.options.findIndex((option) => fractionValue(option) === fractionValue(question.target));
    return <>
      <EquivalentBarMatch target={question.target} options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
      {check(choice !== null, choice === correct)}
    </>;
  }

  if (question.type === "shade-equivalent" || question.type === "write-equivalent") return <>
    <p className="challenge-prompt">{fractionText(question.target.numerator, question.target.denominator)} is the same as how many {question.answerDenominator}ths?</p>
    <FractionBar parts={shadedParts(question.target.numerator, question.target.denominator)} label={`${question.target.numerator} of ${question.target.denominator} parts shaded`} />
    <FractionShadeBoard denominator={question.answerDenominator} selected={picked} onToggle={question.type === "shade-equivalent" ? toggle : undefined} disabled={locked} label={`Bar with ${question.answerDenominator} equal parts`} />
    {question.type === "write-equivalent" && input("Top number of the equivalent fraction")}
    {check(question.type === "shade-equivalent" ? countPicked > 0 : value !== "", question.type === "shade-equivalent" ? countPicked === question.answer : numericAnswer(question.answer))}
  </>;

  if (question.type === "equation-choice" || question.type === "equation-build") return <>
    <p className="challenge-prompt">{fractionText(question.first, question.denominator)} {question.operation === "add" ? "+" : "−"} {fractionText(question.second, question.denominator)} = ?</p>
    <FractionEquationBoard denominator={question.denominator} first={question.first} second={question.second} operation={question.operation} selected={picked} onToggle={question.type === "equation-build" ? toggle : undefined} disabled={locked} />
    {question.type === "equation-choice" && <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />}
    {check(question.type === "equation-build" ? countPicked > 0 : choice !== null, question.type === "equation-build" ? countPicked === question.answer : choice === fractionText(question.answer, question.denominator))}
  </>;

  if (question.type === "equation-story") return <>
    <p className="challenge-prompt">A strip is split into {question.denominator} equal parts. {question.first} parts are coloured, then {question.second} more are coloured. How many parts are coloured now?</p>
    {input("Coloured parts")}
    {check(value !== "", numericAnswer(question.answer))}
  </>;

  if (question.type === "compare-pair") {
    const left = fractionText(question.left.numerator, question.left.denominator);
    const right = fractionText(question.right.numerator, question.right.denominator);
    return <>
      <p className="challenge-prompt">Which fraction is larger?</p>
      <div className="fraction-compare-bars">
        <div><strong>{left}</strong><FractionBar parts={shadedParts(question.left.numerator, question.left.denominator)} label={`${left} shaded`} /></div>
        <div><strong>{right}</strong><FractionBar parts={shadedParts(question.right.numerator, question.right.denominator)} label={`${right} shaded`} /></div>
      </div>
      <ChoiceGrid options={[left, right]} selected={choice} onSelect={setChoice} disabled={locked} />
      {check(choice !== null, choice === (question.answer === "left" ? left : right))}
    </>;
  }

  if (question.type === "order-fractions") return <>
    <p className="challenge-prompt">Move the fractions from smallest to largest.</p>
    <DragToOrder items={order} onReorder={setOrder} disabled={locked} />
    {check(true, order.every((item, index) => item.id === question.ordered[index]))}
  </>;

  if (question.type === "compare-story") return <>
    <p className="challenge-prompt">Mia has {fractionText(question.left.numerator, question.left.denominator)} of a cake. Sam has {fractionText(question.right.numerator, question.right.denominator)}. Who has more cake?</p>
    <ChoiceGrid options={["Mia", "Sam"]} selected={choice} onSelect={setChoice} disabled={locked} />
    {check(choice !== null, choice === (question.answer === "left" ? "Mia" : "Sam"))}
  </>;

  if (question.type === "problem-set") return <>
    <p className="challenge-prompt">There are {question.total} stickers. {fractionText(question.numerator, question.denominator)} are stars. How many star stickers are there?</p>
    <FractionSetBoard total={question.total} />
    {input("Star stickers")}
    {check(value !== "", numericAnswer(question.answer))}
  </>;

  if (question.type === "problem-add") return <>
    <p className="challenge-prompt">A path is {fractionText(question.first, question.denominator)} km long. Another part is {fractionText(question.second, question.denominator)} km. How many {question.denominator}ths of a kilometre altogether?</p>
    {input("Number of equal parts")}
    {check(value !== "", numericAnswer(question.answer))}
  </>;

  if (question.type === "problem-equivalent") return <>
    <p className="challenge-prompt">A picture has {fractionText(question.target.numerator, question.target.denominator)} coloured. How many {question.answerDenominator}ths is the same amount?</p>
    <FractionBar parts={shadedParts(question.target.numerator, question.target.denominator)} label="Coloured part of the picture" />
    {input("Number of equal parts")}
    {check(value !== "", numericAnswer(question.answer))}
  </>;

  return <>
    <p className="challenge-prompt">A ribbon is {fractionText(question.start, question.denominator)} metre long. First {fractionText(question.usedFirst, question.denominator)} metre is cut off, then {fractionText(question.usedSecond, question.denominator)} metre. How many {question.denominator}ths of a metre are left?</p>
    {input("Parts left")}
    {check(value !== "", numericAnswer(question.answer))}
  </>;
}

export default Year3FractionGame;
