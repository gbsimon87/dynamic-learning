/**
 * What the API logs about an unexpected error — never the error object itself.
 *
 * A Mongo duplicate-key error carries the offending value (`keyValue`, and the
 * message text), which for `parents.email` is an email address. Logs live with
 * the host under its own retention, so personal data must not reach them.
 * Keep the class, the code and the stack frames; drop the message.
 */
export function errorSummary(err) {
  if (!err || typeof err !== "object") return { name: typeof err };
  const frames = typeof err.stack === "string"
    ? err.stack.split("\n").filter((line) => line.trimStart().startsWith("at ")).slice(0, 8).join("\n")
    : undefined;
  return {
    name: err.name || err.constructor?.name || "Error",
    ...(err.code !== undefined ? { code: err.code } : {}),
    ...(frames ? { stack: frames } : {}),
  };
}
