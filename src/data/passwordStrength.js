export const MIN_PASSWORD_LENGTH = 8;

/* ===== PASSWORD STRENGTH =====
   Shown live as the password is typed, rather than as an error after the form
   is submitted. Deliberately simple and deliberately generous: this is a
   nudge towards a longer password, not a policy. Only `length` actually gates
   submission — see `validateDetails`. */
export function passwordStrength(password) {
  if (!password) return null;
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { level: "short", label: `A bit short — ${MIN_PASSWORD_LENGTH}+ characters` };
  }

  const variety =
    (/[a-z]/.test(password) ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0);

  if (password.length >= 12 && variety >= 3) {
    return { level: "strong", label: "Strong password 💪" };
  }
  if (variety >= 2) return { level: "good", label: "Good password 👍" };
  return { level: "okay", label: "That'll do — a number or symbol would help" };
}
