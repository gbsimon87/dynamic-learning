import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import ClockFace from "../../../../../components/challenge/ClockFace";
import CoinTray from "../../../../../components/challenge/CoinTray";
import DragToOrder from "../../../../../components/challenge/DragToOrder";
import MixedUnitBuilder from "../../../../../components/challenge/MixedUnitBuilder";
import NumberInput from "../../../../../components/challenge/NumberInput";
import PerimeterShape from "../../../../../components/challenge/PerimeterShape";
import ScaleReader from "../../../../../components/challenge/ScaleReader";
import TimeSetter from "../../../../../components/challenge/TimeSetter";
import { formatMoney, isValidCoinCombination } from "../../../../../data/challenges/measurement";
import { isCorrectNumber } from "../../../../../data/challenges/placeValue3Digit";
import {
  buildLengthQuestions,
  buildMassQuestions,
  buildVolumeQuestions,
  buildMeasurementArithmeticQuestions,
  buildPerimeterQuestions,
  buildMoneyQuestions,
  buildTimeToMinuteQuestions,
  buildRoman24Questions,
  buildDurationQuestions,
  formatDigital12,
  formatDigital24,
  formatMixed,
  mixedToBase,
} from "../../../../../data/challenges/year3Measurement";

const BUILDERS = {
  length: buildLengthQuestions,
  mass: buildMassQuestions,
  volume: buildVolumeQuestions,
  arithmetic: buildMeasurementArithmeticQuestions,
  perimeter: buildPerimeterQuestions,
  money: buildMoneyQuestions,
  minuteTime: buildTimeToMinuteQuestions,
  roman24: buildRoman24Questions,
  durations: buildDurationQuestions,
};

const TITLES = {
  length: ["Read millimetres on a ruler.", "Compare lengths in different units.", "Build a length in metres and centimetres.", "Solve a length problem."],
  mass: ["Read grams on a scale.", "Compare mass in kilograms and grams.", "Build a mass in kilograms and grams.", "Solve a mass problem."],
  volume: ["Read millilitres on a jug.", "Compare capacity in litres and millilitres.", "Build a capacity in litres and millilitres.", "Solve a capacity problem."],
  arithmetic: ["Calculate with one unit.", "Calculate across mixed units.", "Build the mixed-unit answer.", "Solve a measurement story."],
  perimeter: ["Add every side.", "Find the missing side.", "Trace the whole perimeter.", "Solve a perimeter story."],
  money: ["Add pounds and pence.", "Work out the change.", "Choose coins for the change.", "Solve a two-step money problem."],
  minuteTime: ["Read the clock to the minute.", "Say the time to the minute.", "Set the clock to the minute.", "Solve a time problem."],
  roman24: ["Read a Roman-numeral clock.", "Write an am or pm time in 24-hour time.", "Read 24-hour time as am or pm.", "Set a Roman-numeral clock from 24-hour time."],
  durations: ["Recall time facts.", "Compare durations.", "Order durations.", "Calculate an elapsed time."],
};

function Year3MeasurementGame({ topic, level, onComplete }) {
  const questions = useMemo(() => BUILDERS[topic](level, Math.random), [topic, level]);
  return (
    <ChallengeShell
      title={TITLES[topic][level - 1]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index }) => (
        <MeasurementRound key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CheckButton({ disabled, onClick }) {
  return <button type="button" className="submit-btn" disabled={disabled} onClick={onClick}>Check my answer</button>;
}

function MeasureCards({ question }) {
  return (
    <div className="measure-compare" aria-label={`Compare ${question.leftLabel} with ${question.rightLabel}`}>
      <strong>{question.leftLabel}</strong>
      <span className="measure-compare-gap">?</span>
      <strong>{question.rightLabel}</strong>
    </div>
  );
}

function DurationTimeline({ question }) {
  const start = formatDigital24(question.startHour, question.startMinute);
  const end = formatDigital24(question.endHour, question.endMinute);
  return (
    <div className="duration-timeline" role="img" aria-label={`An event starts at ${start} and ends at ${end}`}>
      <span><strong>{start}</strong><small>start</small></span>
      <i aria-hidden="true" />
      <span><strong>{end}</strong><small>end</small></span>
    </div>
  );
}

function MeasurementRound({ question, submit, locked }) {
  const [choice, setChoice] = useState(null);
  const [value, setValue] = useState("");
  const [mixed, setMixed] = useState({ major: 0, minor: 0 });
  const [traced, setTraced] = useState(0);
  const [picked, setPicked] = useState([]);
  const [time, setTime] = useState(() => ({
    hour: question.hour ?? 12,
    minute: question.type === "set-clock-minute" || question.type === "set-roman-clock"
      ? (question.minute + 55) % 60
      : 0,
  }));
  const [period, setPeriod] = useState("am");
  const [order, setOrder] = useState(question.items ?? []);

  const numericAnswer = (answer) => isCorrectNumber(value, answer);
  const input = (label, maxDigits = 4) => (
    <NumberInput label={label} value={value} onChange={setValue} disabled={locked} maxDigits={maxDigits} />
  );
  const check = (ready, correct) => (
    <CheckButton disabled={locked || !ready} onClick={() => submit(correct)} />
  );

  if (question.type === "read-scale" || question.type === "read-jug") return (
    <>
      <p className="challenge-prompt">
        {question.type === "read-jug" ? `How much ${question.thing} is in the jug?` : `How long is the ${question.thing}?`}
      </p>
      <ScaleReader
        min={question.min}
        max={question.max}
        majorStep={question.majorStep}
        minorStep={question.minorStep}
        value={question.answer}
        unit={question.unit}
        orientation={question.type === "read-jug" ? "vertical" : "horizontal"}
        variant={question.type === "read-jug" ? "jug" : ""}
        label={`The marker is on ${question.answer} ${question.unit}`}
      />
      <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
      {check(choice !== null, choice === question.answer)}
    </>
  );

  if (question.type === "compare-measures" || question.type === "compare-durations") return (
    <>
      <p className="challenge-prompt">Choose the symbol that makes this true.</p>
      <MeasureCards question={question} />
      <ChoiceGrid options={["<", "=", ">"]} selected={choice} onSelect={setChoice} disabled={locked} />
      {check(choice !== null, choice === question.answer)}
    </>
  );

  if (question.type === "mixed-build" || question.type === "mixed-result") {
    const stepMixed = ({ unit, delta }) => setMixed((previous) => {
      if (unit === "major") {
        return { ...previous, major: Math.min(question.maxMajor, Math.max(0, previous.major + delta)) };
      }
      const change = delta * question.minorStep;
      return { ...previous, minor: Math.min(question.factor - question.minorStep, Math.max(0, previous.minor + change)) };
    });
    const current = mixedToBase(mixed.major, mixed.minor, question.factor);
    return (
      <>
        <p className="challenge-prompt">
          {question.type === "mixed-result"
            ? `${question.calculation} = ? Build the answer.`
            : `Build ${formatMixed(question.major, question.minor, question.majorUnit, question.minorUnit)}.`}
        </p>
        <MixedUnitBuilder
          {...mixed}
          majorUnit={question.majorUnit}
          minorUnit={question.minorUnit}
          factor={question.factor}
          onStep={stepMixed}
          disabled={locked}
          label={`Build a measurement using ${question.majorUnit} and ${question.minorUnit}`}
        />
        {check(true, current === question.answer)}
      </>
    );
  }

  if (["measure-story", "mixed-calculation", "money-change", "money-story", "time-story"].includes(question.type)) return (
    <>
      <p className="challenge-prompt">
        {question.prompt ?? `${question.calculation} = ? Give the answer in ${question.unit}.`}
      </p>
      {input(question.type.startsWith("money") ? "My answer in pence" : "My answer is")}
      {check(value !== "", numericAnswer(question.answer))}
    </>
  );

  if (question.type === "measure-calculation") return (
    <>
      <p className="equation-display">{question.calculation} = ?</p>
      <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
      {check(choice !== null, choice === `${question.answer} ${question.unit}`)}
    </>
  );

  if (question.type === "perimeter-read") return (
    <>
      <p className="challenge-prompt">What is the distance all the way around this shape?</p>
      <PerimeterShape shape={question.shape} sides={question.sides} traced={question.sides.length} label="A shape with every side length labelled" />
      <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
      {check(choice !== null, choice === `${question.answer} cm`)}
    </>
  );

  if (question.type === "perimeter-missing") return (
    <>
      <p className="challenge-prompt">The perimeter is {question.perimeter} cm. What is the missing side?</p>
      <PerimeterShape shape={question.shape} sides={question.sides} traced={question.sides.length} label={`A shape with one missing side and a perimeter of ${question.perimeter} centimetres`} />
      {input("Missing side in cm", 2)}
      {check(value !== "", numericAnswer(question.answer))}
    </>
  );

  if (question.type === "perimeter-trace") {
    const running = question.sides.slice(0, traced).reduce((sum, side) => sum + side.length, 0);
    return (
      <>
        <p className="challenge-prompt">Trace each side to travel around the whole shape.</p>
        <PerimeterShape shape={question.shape} sides={question.sides} traced={traced} running={running} label={`${traced} of ${question.sides.length} sides traced`} />
        <button type="button" className="trace-side-btn" disabled={locked || traced === question.sides.length} onClick={() => setTraced((previous) => Math.min(question.sides.length, previous + 1))}>
          Trace the next side
        </button>
        {check(traced === question.sides.length, running === question.answer)}
      </>
    );
  }

  if (question.type === "money-add") return (
    <>
      <p className="challenge-prompt">{formatMoney(question.first)} + {formatMoney(question.second)} = ?</p>
      <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
      {check(choice !== null, choice === question.answerLabel)}
    </>
  );

  if (question.type === "money-coins") return (
    <>
      <p className="challenge-prompt">An item costs {formatMoney(question.cost)}. The customer pays {formatMoney(question.paid)}. Tap coins to give the change.</p>
      <CoinTray
        picked={picked}
        disabled={locked}
        onPick={(coin) => setPicked((previous) => [...previous, coin])}
        onRemove={(index) => setPicked((previous) => previous.filter((_, itemIndex) => itemIndex !== index))}
      />
      {check(picked.length > 0, isValidCoinCombination(picked, question.answer))}
    </>
  );

  if (question.type === "read-clock-minute" || question.type === "clock-words" || question.type === "roman-clock-read") return (
    <>
      <ClockFace
        hour={question.hour}
        minute={question.minute}
        numeralStyle={question.type === "roman-clock-read" ? "roman" : "arabic"}
        label={`A clock showing ${question.answer}`}
      />
      <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} variant={question.type === "clock-words" ? "wordy" : ""} />
      {check(choice !== null, choice === question.answer)}
    </>
  );

  if (question.type === "set-clock-minute" || question.type === "set-roman-clock") {
    const is24Hour = question.type === "set-roman-clock";
    const enteredHour24 = period === "am" ? time.hour % 12 : (time.hour % 12) + 12;
    const correct = is24Hour
      ? enteredHour24 === question.hour24 && time.minute === question.minute
      : time.hour === question.hour && time.minute === question.minute;
    return (
      <>
        <p className="challenge-prompt">
          Show <strong>{is24Hour ? formatDigital24(question.hour24, question.minute) : formatDigital12(question.hour, question.minute)}</strong>.
        </p>
        <ClockFace hour={time.hour} minute={time.minute} numeralStyle={is24Hour ? "roman" : "arabic"} label="The clock you are setting" />
        <TimeSetter hour={time.hour} minute={time.minute} minuteStep={1} onChange={setTime} disabled={locked} />
        {is24Hour && <ChoiceGrid options={["am", "pm"]} selected={period} onSelect={setPeriod} disabled={locked} />}
        {check(true, correct)}
      </>
    );
  }

  if (question.type === "to-24-hour") return (
    <>
      <p className="challenge-prompt">Write {formatDigital12(question.hour, question.minute)} {question.period} in 24-hour time.</p>
      <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
      {check(choice !== null, choice === question.answer)}
    </>
  );

  if (question.type === "from-24-hour") return (
    <>
      <p className="challenge-prompt">What is {formatDigital24(question.hour, question.minute)} in 12-hour time?</p>
      <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} variant="wordy" />
      {check(choice !== null, choice === question.answer)}
    </>
  );

  if (question.type === "time-fact") return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>
      <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
      {check(choice !== null, choice === question.answer)}
    </>
  );

  if (question.type === "order-durations") return (
    <>
      <p className="challenge-prompt">Move the durations from shortest to longest.</p>
      <DragToOrder items={order} onReorder={setOrder} disabled={locked} />
      {check(true, order.map((item) => item.label).every((label, index) => label === question.ordered[index]))}
    </>
  );

  if (question.type === "duration-timeline") return (
    <>
      <p className="challenge-prompt">How many minutes does this event last?</p>
      <DurationTimeline question={question} />
      {input("Duration in minutes", 3)}
      {check(value !== "", numericAnswer(question.answer))}
    </>
  );

  return null;
}

export default Year3MeasurementGame;
