/**
 * Controlled answer controls for the quiz runner. Each one edits a raw value
 * only; scoring happens in the store. Large targets, keyboard alternatives for
 * every pointer action, and no control strips characters to make a different
 * answer. See technical contract §4 "Input capacity".
 */
import { acceptsNumberDraft } from "../../data/assessmentInputRules.js";

export function AssessmentNumberInput({ input, value, onChange, disabled, id }) {
  const press = (key) => {
    if (disabled) return;
    let next = value;
    if (key === "back") next = value.slice(0, -1);
    else if (key === "sign") next = value.startsWith("-") ? value.slice(1) : `-${value}`;
    else if (key === ".") next = value.includes(".") ? value : `${value.replace(/^-$/, "-0") || "0"}.`;
    else next = `${value}${key}`;
    if (acceptsNumberDraft(input, next)) onChange(next);
  };
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ...(input.signed ? ["sign"] : []), "0", ...(input.decimalPlaces ? ["."] : []), "back"];
  const labels = { sign: "−/+", back: "⌫", ".": "." };
  const names = { sign: "Change sign", back: "Delete", ".": "Decimal point" };
  return <div className="cj-number">
    <label className="cj-input-label" htmlFor={id}>{input.label ?? "Your answer"}</label>
    <input id={id} className="cj-number-field" type="text" inputMode={input.decimalPlaces || input.signed ? "decimal" : "numeric"}
      autoComplete="off" value={value} disabled={disabled}
      onChange={(event) => { if (acceptsNumberDraft(input, event.target.value)) onChange(event.target.value); }} />
    <div className="cj-keypad" role="group" aria-label="Number keypad">
      {keys.map((key) => <button key={key} type="button" disabled={disabled} onClick={() => press(key)}
        aria-label={names[key] ?? key}>{labels[key] ?? key}</button>)}
    </div>
  </div>;
}

export function AssessmentTextInput({ input, value, onChange, disabled, id }) {
  const insert = (character) => { if (!disabled && value.length < input.maxLength) onChange(`${value}${character}`); };
  return <div className="cj-text">
    <label className="cj-input-label" htmlFor={id}>{input.label ?? "Type your answer"}</label>
    <input id={id} className="cj-text-field" type="text" value={value} disabled={disabled} maxLength={input.maxLength}
      autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} lang={input.characters ? "fr" : undefined}
      onChange={(event) => onChange(event.target.value.slice(0, input.maxLength))} />
    {input.characters && <div className="cj-characters" role="group" aria-label="Accented letters">
      {input.characters.map((c) => <button key={c} type="button" disabled={disabled} onClick={() => insert(c)} aria-label={`Type ${c}`}>{c}</button>)}
    </div>}
  </div>;
}

export function AssessmentChoice({ input, value, onChange, disabled, labelledBy }) {
  return <div className="cj-choices" role="radiogroup" aria-labelledby={labelledBy}>
    {input.options.map((option) => <button key={option.id} type="button" role="radio" aria-checked={value === option.id}
      className={value === option.id ? "is-selected" : ""} disabled={disabled} onClick={() => onChange(option.id)}>{option.label}</button>)}
  </div>;
}

export function AssessmentOrder({ input, value, onChange, disabled }) {
  const order = value ?? input.cards.map((c) => c.id);
  const label = (id) => input.cards.find((c) => c.id === id).label;
  const move = (index, delta) => {
    const next = [...order];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    onChange(next);
  };
  return <ol className="cj-order">
    {order.map((id, index) => <li key={id}>
      <span className="cj-order-position" aria-hidden="true">{index + 1}</span>
      <span className="cj-order-label">{label(id)}</span>
      <button type="button" disabled={disabled || index === 0} onClick={() => move(index, -1)} aria-label={`Move ${label(id)} up`}>↑</button>
      <button type="button" disabled={disabled || index === order.length - 1} onClick={() => move(index, 1)} aria-label={`Move ${label(id)} down`}>↓</button>
    </li>)}
  </ol>;
}

export function AssessmentSort({ input, value, onChange, disabled }) {
  const chosen = new Map((value ?? []).map((v) => [v.cardId, v.binId]));
  const assign = (cardId, binId) => {
    const next = new Map(chosen); next.set(cardId, binId);
    onChange(input.cards.filter((c) => next.has(c.id)).map((c) => ({ cardId: c.id, binId: next.get(c.id) })));
  };
  return <ul className="cj-sort">
    {input.cards.map((card) => <li key={card.id}>
      <span className="cj-sort-card" id={`cj-sort-${card.id}`}>{card.label}</span>
      <span className="cj-sort-bins" role="radiogroup" aria-labelledby={`cj-sort-${card.id}`}>
        {input.bins.map((bin) => <button key={bin.id} type="button" role="radio" aria-checked={chosen.get(card.id) === bin.id}
          className={chosen.get(card.id) === bin.id ? "is-selected" : ""} disabled={disabled} onClick={() => assign(card.id, bin.id)}>{bin.label}</button>)}
      </span>
    </li>)}
  </ul>;
}

export function AssessmentFractionShade({ input, value, onChange, disabled }) {
  const shaded = new Set(value ?? []);
  const toggle = (i) => { const next = new Set(shaded); if (next.has(i)) next.delete(i); else next.add(i); onChange([...next].sort((a, b) => a - b)); };
  return <div className="cj-shade" role="group" aria-label={`${input.parts} equal parts. Tap parts to shade them.`}>
    {Array.from({ length: input.parts }, (_, i) => <button key={i} type="button" aria-pressed={shaded.has(i)} disabled={disabled}
      className={shaded.has(i) ? "is-shaded" : ""} onClick={() => toggle(i)} aria-label={`Part ${i + 1}`} />)}
  </div>;
}

export function AssessmentNumberTrack({ input, value, onChange, disabled }) {
  const ticks = input.denominator * input.wholes;
  return <div className="cj-track" role="radiogroup" aria-label={`Number line from 0 to ${input.wholes}, split into ${input.denominator} equal steps per whole`}>
    {Array.from({ length: ticks + 1 }, (_, i) => <button key={i} type="button" role="radio" aria-checked={value === i} disabled={disabled}
      className={value === i ? "is-selected" : ""} onClick={() => onChange(i)}
      aria-label={i % input.denominator === 0 ? String(i / input.denominator) : `Mark ${i}`}>{i % input.denominator === 0 ? i / input.denominator : "·"}</button>)}
  </div>;
}
