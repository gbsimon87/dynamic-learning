import { useMemo, useState } from "react";
import ChallengeShell from "../ChallengeShell";
import ChoiceGrid from "../ChoiceGrid";
import HintNote from "../HintNote";
import LetterInput from "../LetterInput";
import NumberInput from "../NumberInput";
import ReadingPassage from "../ReadingPassage";
import SortBins from "../SortBins";
import SpeakButton from "../SpeakButton";
import TileBuilder from "../TileBuilder";
import DragToOrder from "../DragToOrder";
import WordPicker from "../WordPicker";
import NumberLine from "../NumberLine";
import BarChart from "../BarChart";
import PictogramChart from "../PictogramChart";
import TallyChart from "../TallyChart";
import ClockFace from "../ClockFace";
import TimeSetter from "../TimeSetter";
import CoinTray from "../CoinTray";
import FractionBar from "../FractionBar";
import FractionShadeBoard from "../FractionShadeBoard";
import PlaceValueBlocks from "../PlaceValueBlocks";
import { showHint } from "../hints";
import { formatMoney } from "../../../data/challenges/measurement";
import {
  blankFill,
  initialResponse,
  isCorrect,
  isReady,
  richRuns,
  visibleOptions,
} from "../../../data/challenges/questionKinds";

/**
 * Draws a challenge AUTHORED AS DATA: `build(level, rng)` returns questions
 * of the kinds in `data/challenges/questionKinds.js`, and this renders each
 * with the shared kit. The rules — what a response starts as, when Check is
 * ready, whether it is right — all live in questionKinds, so they are tested
 * without a browser (`questionKinds.test.js`, `lintBuild`).
 *
 * Generalises EnglishPracticeGame (choice / sort / build / type) to every
 * kind, Maths included. A topic's challenge file becomes:
 *
 *   export default function MyTopicChallenge2({ onComplete }) {
 *     return <DataChallenge level={2} build={buildMyTopic} titles={TITLES} onComplete={onComplete} />;
 *   }
 *
 * `renderVisual(question)` optionally supplies a read-only diagram before the
 * answer control. `checkAnswer` optionally adds subject-specific validation.
 * `readAloud` forces ChallengeShell's "Read it to me" button on or off.
 */
export default function DataChallenge({ level, build, titles, onComplete, renderVisual, readAloud, checkAnswer }) {
  const questions = useMemo(() => build(level, Math.random), [build, level]);
  const title = Array.isArray(titles) ? titles[level - 1] : titles?.[level];

  return (
    <ChallengeShell
      title={title}
      readAloud={readAloud}
      questions={questions}
      onComplete={onComplete}
      render={({ question, index, submit, locked, misses }) => (
        <DataRound key={index} question={question} submit={submit} locked={locked} hint={showHint(misses)} renderVisual={renderVisual} checkAnswer={checkAnswer} />
      )}
    />
  );
}

/** One question. checkAnswer optionally supplies subject-specific response validation. */
export function DataRound({ question: q, submit, locked, hint, renderVisual, checkAnswer = isCorrect }) {
  const [response, setResponse] = useState(() => initialResponse(q));
  const ready = isReady(q, response);
  const [before, after] = (q.sentence ?? "").split("___");
  const fill = blankFill(q, response);

  return (
    <>
      {q.rule && <p className="challenge-prompt"><Rich text={q.rule} /></p>}
      {q.picture && <span className="english-picture" role="img" aria-label={q.pictureLabel}>{q.picture}</span>}
      {q.passage && <ReadingPassage passage={q.passage} speak={q.readTextAloud !== false} />}
      {q.text && <ReadingPassage passage={{ blocks: [{ type: "p", text: q.text }] }} speak={q.readTextAloud !== false} />}

      {(q.prompt || q.speak) && (
        <div className="english-prompt-row">
          {q.prompt && <p className="challenge-prompt"><Rich text={q.prompt} /></p>}
          {q.speak && <SpeakButton text={q.speak} compact label="Read the question" />}
        </div>
      )}

      {q.equation && (
        <div className="equation-display">
          {[q.equation].flat().map((line) => <p key={line}>{line}</p>)}
        </div>
      )}

      {q.sentence && (
        <p className="english-focus">
          {before}<span className="english-blank">{fill || "?"}</span>{after}
        </p>
      )}

      {hint && q.hint && <HintNote><Rich text={q.hint} /></HintNote>}

      {renderVisual?.(q)}

      <KindControl q={q} response={response} setResponse={setResponse} locked={locked} hint={hint} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || !ready}
        onClick={() => submit(checkAnswer(q, response))}
      >
        Check my answer
      </button>
    </>
  );
}

/** `**bold**` runs as <strong>. */
function Rich({ text }) {
  return richRuns(text).map((run, i) => (run.bold ? <strong key={i}>{run.text}</strong> : <span key={i}>{run.text}</span>));
}

/** The answer control the visual "read" kinds share: tap an option, or type a number. */
function ReadAnswer({ q, response, setResponse, locked, hint }) {
  if (q.options) {
    return (
      <ChoiceGrid
        options={visibleOptions(q, hint)}
        selected={response}
        onSelect={setResponse}
        disabled={locked}
        variant={q.variant ?? ""}
      />
    );
  }
  return <NumberInput value={response} onChange={setResponse} disabled={locked} label={q.label ?? "My answer"} maxDigits={q.maxDigits} />;
}

function KindControl({ q, response, setResponse, locked, hint }) {
  const read = <ReadAnswer q={q} response={response} setResponse={setResponse} locked={locked} hint={hint} />;

  switch (q.kind) {
    case "choice":
      return (
        <ChoiceGrid
          options={visibleOptions(q, hint)}
          selected={response}
          onSelect={setResponse}
          disabled={locked}
          variant={q.variant ?? ""}
        />
      );

    case "number":
      return <NumberInput value={response} onChange={setResponse} disabled={locked} label={q.label ?? "My answer"} maxDigits={q.maxDigits} />;

    case "type":
      return (
        <LetterInput
          value={response}
          onChange={setResponse}
          disabled={locked}
          label={q.label ?? "Your spelling"}
          maxLength={q.maxLength ?? 32}
          apostrophe={q.apostrophe ?? true}
          hideLine={Boolean(q.sentence)}
        />
      );

    case "build":
      return (
        <TileBuilder
          tiles={q.tiles}
          placed={response}
          onChange={setResponse}
          disabled={locked}
          kind={q.letters ? "letters" : "words"}
          fixed={q.fixed ?? null}
        />
      );

    case "sort":
      return (
        <SortBins
          bins={q.bins}
          cards={q.cards}
          placement={response}
          onPlace={(id, bin) =>
            setResponse((prev) => {
              const next = { ...prev };
              if (bin === null) delete next[id];
              else next[id] = bin;
              return next;
            })
          }
          disabled={locked}
        />
      );

    case "order":
      return <DragToOrder items={response} onReorder={setResponse} disabled={locked} direction={q.direction ?? "horizontal"} />;

    case "pick":
      return (
        <WordPicker
          tokens={q.tokens}
          selected={response}
          onSelect={setResponse}
          disabled={locked}
          mode={q.mode ?? "word"}
          pickable={q.pickable}
          hinted={hint ? q.hinted : undefined}
          variant={q.variant ?? ""}
          innerGaps={Boolean(q.innerGaps)}
        />
      );

    case "sequence": {
      const active = response.active;
      return (
        <>
          <NumberLine
            terms={q.terms}
            gaps={q.gaps}
            values={response.values}
            active={active}
            onFocusGap={(gap) => setResponse((prev) => ({ ...prev, active: gap }))}
            disabled={locked}
            highlight={q.highlight}
            captions={q.captions}
          />
          <NumberInput
            hideField
            maxDigits={q.maxDigits}
            value={response.values[active] ?? ""}
            // NumberInput hands back an updater (prev => next) for keypad taps.
            onChange={(next) =>
              setResponse((prev) => {
                const current = prev.values[prev.active] ?? "";
                const value = typeof next === "function" ? next(current) : next;
                return { ...prev, values: { ...prev.values, [prev.active]: value } };
              })
            }
            disabled={locked}
          />
        </>
      );
    }

    case "chart":
      return (
        <>
          <Chart chart={q.chart} />
          {read}
        </>
      );

    case "clock":
      if (q.mode === "set") {
        return (
          <>
            <ClockFace hour={response.hour} minute={response.minute} label={`Clock showing ${response.hour}:${String(response.minute).padStart(2, "0")}`} />
            <TimeSetter hour={response.hour} minute={response.minute} onChange={setResponse} disabled={locked} minuteStep={q.minuteStep ?? 5} />
          </>
        );
      }
      return (
        <>
          <ClockFace hour={q.time.hour} minute={q.time.minute} label="A clock" />
          {read}
        </>
      );

    case "coins":
      if (q.mode === "make") {
        return (
          <CoinTray
            picked={response}
            target={q.target}
            onPick={(coin) => setResponse((prev) => [...prev, coin])}
            onRemove={(index) => setResponse((prev) => prev.filter((_, i) => i !== index))}
            disabled={locked}
          />
        );
      }
      return (
        <>
          <div className="coin-row" role="img" aria-label={`Coins: ${q.coins.map(formatMoney).join(", ")}`}>
            {q.coins.map((coin, i) => (
              <span key={i} className={`coin coin-${coin}`} aria-hidden="true">{formatMoney(coin)}</span>
            ))}
          </div>
          {read}
        </>
      );

    case "fraction":
      if (q.mode === "shade") {
        return (
          <FractionShadeBoard
            denominator={q.parts}
            selected={response}
            onToggle={(index) =>
              setResponse((prev) => {
                const next = Array.from({ length: q.parts }, (_, i) => Boolean(prev[i]));
                next[index] = !next[index];
                return next;
              })
            }
            disabled={locked}
            label={`Bar with ${q.parts} equal parts`}
          />
        );
      }
      return (
        <>
          <FractionBar parts={shadedParts(q)} label={`A bar in ${q.parts} equal parts`} />
          {read}
        </>
      );

    case "placeValue":
      if (q.mode === "build") {
        return (
          <PlaceValueBlocks
            blocks={response}
            onStep={(place, delta) =>
              setResponse((prev) => ({ ...prev, [place]: Math.min(9, Math.max(0, (prev[place] ?? 0) + delta)) }))
            }
            label="Blocks you have made"
          />
        );
      }
      return (
        <>
          <PlaceValueBlocks
            blocks={q.blocks}
            highlight={q.ask && q.ask !== "value" ? q.ask : undefined}
            label="Base-ten blocks"
          />
          {read}
        </>
      );

    default:
      return null;
  }
}

function shadedParts(q) {
  const shaded = Array.isArray(q.shaded)
    ? new Set(q.shaded)
    : new Set(Array.from({ length: q.shaded ?? 0 }, (_, i) => i));
  return Array.from({ length: q.parts }, (_, i) => shaded.has(i));
}

function Chart({ chart }) {
  if (chart.type === "bar") {
    return <BarChart bars={chart.rows} step={chart.step ?? 1} unit={chart.unit} label="Bar chart" />;
  }
  if (chart.type === "pictogram") {
    return <PictogramChart rows={chart.rows} ratio={chart.ratio} symbol={chart.symbol} highlight={chart.highlight} />;
  }
  return <TallyChart rows={chart.rows} highlight={chart.highlight} />;
}
