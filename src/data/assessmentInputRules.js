// Pure draft/submit rules for the quiz answer controls (AssessmentInputs.jsx).

export function numberPattern(input) {
  const whole = input.signed ? "-?\\d*" : "\\d*";
  return new RegExp(`^${whole}${input.decimalPlaces ? `(\\.\\d{0,${input.decimalPlaces}})?` : ""}$`);
}

/** True when the edited text is acceptable as a (possibly unfinished) entry. */
export function acceptsNumberDraft(input, text) {
  return numberPattern(input).test(text) && text.replace(/\D/g, "").length <= input.maxDigits;
}

/** True when the text is a complete number the scorer can read. */
export function isCompleteNumber(text) {
  return /^-?\d+(\.\d+)?$/.test(text);
}

/** Whether a draft value is complete enough to submit for this input. */
export function isSubmittable(input, value) {
  switch (input.kind) {
    case "number": return typeof value === "string" && isCompleteNumber(value);
    case "text": return typeof value === "string" && value.trim().length > 0;
    case "choice": return typeof value === "string";
    case "order": return Array.isArray(value) && value.length === input.cards.length;
    case "sort": return Array.isArray(value) && value.length === input.cards.length;
    case "fractionShade": return Array.isArray(value);
    case "numberTrack": return Number.isInteger(value);
    default: return false;
  }
}
