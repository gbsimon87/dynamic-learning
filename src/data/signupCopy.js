/** Everything Bix and the sign-up screens say. Kept apart so it can be read and tested in one place. */
import { maskEmail } from "../../shared/emailAddress.js";
import { CHILD_NAME_MAX } from "./childFields.js";
import { MIN_PASSWORD_LENGTH } from "./passwordStrength.js";
import { STEP } from "./signupFlow.js";

const SUBJECT_CHEERS = {
  math: "Numbers are my favourite!",
  english: "I love stories!",
  science: "Ooh, I love magnets!",
  geography: "Let's explore the world!",
};

function learnerOf(draft, cursor) {
  return cursor.index !== undefined ? draft.learners[cursor.index] : null;
}

export function bixLine(draft, cursor) {
  const learner = learnerOf(draft, cursor);
  const name = String(learner?.name ?? "").trim();
  const me = draft.learnFor === "me";
  switch (cursor.step) {
    case STEP.birthYear: return "Hi! I'm Bix. Let's get you set up!";
    case STEP.gate: return "You'll need a grown-up for this bit!";
    case STEP.who: return "Who am I going to meet?";
    case STEP.count: return "How many friends will I make?";
    case STEP.name: return name ? `Hi ${name}! 👋` : "A nickname is fine!";
    case STEP.year: return me ? "We can always change it later." : `Which class is ${name} in?`;
    case STEP.look: return learner?.avatar ? "Ooh, good choice!" : "Pick your favourites!";
    case STEP.subjects: return SUBJECT_CHEERS[learner?.subjects?.at(-1)] ?? "Pick as many as you like!";
    case STEP.summary: return me ? "Looking good!" : "Look at your crew!";
    case STEP.account: return "Nearly there!";
    case STEP.code: return `I sent a code to ${maskEmail(draft.email)}`;
    default: return "Let's go!";
  }
}

export function stepTitle(draft, cursor) {
  const learner = learnerOf(draft, cursor);
  const name = String(learner?.name ?? "").trim();
  const me = draft.learnFor === "me";
  switch (cursor.step) {
    case STEP.birthYear: return "What year were you born?";
    case STEP.gate: return "Ask a grown-up";
    case STEP.who: return "Who's going to learn?";
    case STEP.count: return "How many children?";
    case STEP.name: return me ? "What should Bix call you?" : "What should Bix call them?";
    case STEP.year: return me ? "Which year's work would you like?" : `Which school year is ${name} in?`;
    case STEP.look: return "Pick a picture and a colour";
    case STEP.subjects: return me ? "What would you like to do?" : `What would ${name} like to do?`;
    case STEP.summary: return me ? "All about you" : "Your family";
    case STEP.account: return "Your email and a password";
    case STEP.code: return "Check your email";
    default: return "Ready!";
  }
}

export const ERROR_MESSAGES = {
  HANDOVER_FAILED: "Hmm, that didn't work. Tap again!",
  CHOOSE_ONE: "Pick one to carry on.",
  CHOOSE_LOOK: "Pick a picture and a colour.",
  NAME_REQUIRED: "Type a name first! ✏️",
  NAME_TOO_LONG: `That's a long one! Try ${CHILD_NAME_MAX} letters or fewer.`,
  EMAIL_INVALID: "That email doesn't look quite right.",
  EMAIL_REQUIRED: "Type your email address.",
  EMAIL_TAKEN: "That email already has an account.",
  PASSWORD_TOO_SHORT: `At least ${MIN_PASSWORD_LENGTH} characters, please.`,
  PASSWORD_MISMATCH: "Those passwords don't match.",
  CODE_RECENTLY_SENT: "I've just sent one — give it a moment.",
  TOO_MANY_CODES: "Let's take a break — try again in a little while.",
  TOO_MANY_ATTEMPTS: "Let's take a break — try again in a little while.",
  EMAIL_SEND_FAILED: "I couldn't send the email. Try again?",
  CODE_INCORRECT: "Hmm, let's try that again.",
  CODE_EXPIRED: "That code has run out. Let's send a new one.",
  CODE_ATTEMPTS_EXCEEDED: "Too many tries — let's send a fresh code.",
  NETWORK_ERROR: "I can't reach the internet. Try again?",
  SIGNUP_FAILED: "Something went wrong — nothing was saved. Try again?",
};

export function errorMessage(code, details = {}) {
  if (code === "CODE_INCORRECT" && Number.isInteger(details?.attemptsLeft)) {
    const n = details.attemptsLeft;
    return `Hmm, let's try that again — ${n} ${n === 1 ? "try" : "tries"} left.`;
  }
  if ((code === "TOO_MANY_CODES" || code === "TOO_MANY_ATTEMPTS") && details?.retryAfterSeconds > 0) {
    const minutes = Math.ceil(details.retryAfterSeconds / 60);
    return `Let's take a break — try again in ${minutes} ${minutes === 1 ? "minute" : "minutes"}.`;
  }
  return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.SIGNUP_FAILED;
}
