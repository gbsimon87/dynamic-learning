import { composeReadAloud } from "../../data/mathSpeech.js";

/**
 * Reads a question off the screen for the Maths "Read it to me" button.
 *
 * ChallengeShell renders every challenge's question into one element, so
 * walking that element's visible text reaches all ~330 Maths challenges
 * without touching any of them. What is read:
 *
 *   - visible text, in screen order: side-by-side pieces (number-line cells,
 *     cards in a row, table cells) join with commas, separate lines as
 *     sentences;
 *   - answer options (`.choice-btn` and friends), gathered into one question
 *     at the end: "Is it 18, 20 or 16?".
 *
 * What is NOT read:
 *
 *   - pictures: `svg`, `img`, `role="img"`. Their labels are for screen
 *     readers and often ARE the answer (a clock's label is its time, a
 *     shape's is its name); read-aloud only says the words a child can see;
 *   - controls: the keypad, Check my answer, steppers, every other button
 *     that is not an option, form fields, `aria-hidden` and hidden content;
 *   - visual aids whose text is only tick labels, column digits or the
 *     child's own working (`SKIP` below): reading "0, 10, 20 … 100" off a
 *     ruler is noise, not the question.
 *
 * A challenge whose question would be meaningless this way passes
 * `speak={(question) => string}` to ChallengeShell instead. Any element can
 * also opt out with `data-read-aloud="skip"`.
 */

const SKIP = [
  "[aria-hidden='true']", "[hidden]", "[data-read-aloud='skip']",
  "svg", "img", "canvas", "[role='img']",
  "input", "textarea", "select", "script", "style", "template",
  ".speak-btn", ".keypad", ".submit-btn",
  // The shell's feedback line (a wide science round draws it inside the answer area).
  ".challenge-feedback",
  // Scales, rulers, jugs, thermometers and clocks: tick labels and readouts.
  ".scale", ".scale-controls", ".clock-face", ".time-setter",
  // The child's working: blocks, written columns, coins picked, bars built.
  ".pv-blocks", ".col-sum", ".coin-tray",
  ".pictogram", ".tally-chart", ".block-diagram", ".bar-chart", ".survey-tray",
  ".fraction-number-track", ".fraction-set-board", ".fraction-shade-scroll",
  ".robot-grid", ".perimeter-shape",
].join(", ");

/** Answer options: read together as "Is it …?". */
const OPTION = ".choice-btn, .equivalent-option, .orientation-option";

/** Buttons that show part of the question (a gap in a strip), not a control. */
const READABLE_BUTTON = ".number-cell, .partition-cell";

/** Number-input captions that only say "type here". */
const GENERIC_CAPTION = /^(?:(?:my|your) (?:answer|number)(?: is)?|final answer|(?:the )?missing number(?: is)?|in digits|in numerals)$/i;

function isHidden(element, style) {
  return style.display === "none" || style.visibility === "hidden" || style.opacity === "0";
}

function isInline(style) {
  return style.display === "inline" || style.display === "contents";
}

/** Children of this element sit side by side on screen. */
function isRow(element) {
  if (!element) return false;
  // A science round is a grid only to put the figure beside the panel; its children read in order.
  if (element.matches(".science-round")) return false;
  const style = window.getComputedStyle(element);
  if (style.display === "table-row") return true;
  if (style.display.endsWith("grid")) return true;
  return style.display.endsWith("flex") && !style.flexDirection.startsWith("column");
}

function skipElement(element) {
  if (element.matches(SKIP)) return true;
  // A number line with no gap to fill is a counting aid, not the question.
  if (element.matches(".number-line") && !element.querySelector(".gap")) return true;
  if (element.matches(".number-input-caption") && GENERIC_CAPTION.test(element.textContent.trim())) return true;
  return element.tagName === "BUTTON" && !element.matches(READABLE_BUTTON);
}

/**
 * Walks `root` and returns `{ segments, options }` for `composeReadAloud`.
 * Exported for tests; ChallengeShell uses `readAloudText`.
 */
export function collectQuestion(root) {
  const segments = [];
  const options = [];
  let buffer = "";
  let bufferList = false;

  const flush = () => {
    if (buffer.trim()) segments.push({ text: buffer, list: bufferList });
    buffer = "";
  };

  const visit = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      buffer += node.nodeValue;
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.matches(OPTION)) {
      if (!node.matches(SKIP)) {
        const text = node.textContent.replace(/\s+/g, " ").trim();
        if (text) options.push(text);
      }
      return;
    }
    if (skipElement(node)) return;
    const style = window.getComputedStyle(node);
    if (isHidden(node, style)) return;

    if (isInline(style)) {
      node.childNodes.forEach(visit);
      return;
    }
    // A block: its text is its own segment, a list item when it sits in a row.
    flush();
    const list = isRow(node.parentElement);
    bufferList = list;
    node.childNodes.forEach((child) => {
      visit(child);
      bufferList = list;
    });
    flush();
  };

  root.childNodes.forEach(visit);
  flush();
  return { segments, options };
}

/** The whole spoken text for a question: title, question, options. */
export function readAloudText(root, title) {
  if (!root) return title ? composeReadAloud({ title }) : "";
  return composeReadAloud({ title, ...collectQuestion(root) });
}
