import "./ProgressError.css";

/** Keep failures visible without exposing server details to a learner. */
export default function ProgressError({ loading = false, retry }) {
  return (
    <div className="progress-error" role="alert">
      <p>{loading ? "We couldn’t load your progress. Please try again." : "Your progress hasn’t saved yet. Keep this page open and try again."}</p>
      <button type="button" onClick={retry}>Try again</button>
    </div>
  );
}
