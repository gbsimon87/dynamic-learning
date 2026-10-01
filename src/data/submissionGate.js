/** Synchronous acceptance, including stale callbacks from answered questions. */
export function createSubmissionGate() {
  let answered = -1;
  return (index, correct) => {
    if (index <= answered) return false;
    if (correct) answered = index;
    return true;
  };
}
