import Mascot from "./Mascot";
import { jokeAnnouncement, useBixJoke } from "./useBixJoke";

/**
 * "Bix has a joke for you!" — a small reward at the end of a topic (or
 * anything bigger), on the celebration's final step.
 *
 * Child-paced: one tap shows the setup, another the punchline, a third tells
 * another. It is ONE button whose words change, so keyboard focus stays put.
 * Spoken only while the app's sound is on; the text alone carries it when
 * muted. Deliberately compact and placed after the next actions, so the
 * "Next challenge" button keeps its place and its prominence.
 */
export default function BixJokeCard() {
  const { joke, revealed, tell, reveal } = useBixJoke();

  const action = !joke
    ? { label: "Tell me a joke", run: tell }
    : revealed
      ? { label: "Tell me another", run: tell }
      : { label: "Tell me!", run: reveal };

  return (
    <section className="bix-joke-card" aria-label="Bix's joke">
      <span className="bix-joke-card-bix">
        <Mascot className="mascot-small" decorative />
      </span>

      <div className="bix-joke-card-body">
        {joke ? (
          <p className="mascot-joke-setup">{joke.setup}</p>
        ) : (
          <p className="bix-joke-card-title">Bix has a joke for you!</p>
        )}
        {revealed && (
          <p className="mascot-joke-punchline">
            {joke.punchline} <span aria-hidden="true">😄</span>
          </p>
        )}
        <button type="button" className="mascot-joke-action" onClick={action.run}>
          {action.label}
        </button>
      </div>

      <span className="sr-only" aria-live="polite">
        {jokeAnnouncement(joke, revealed)}
      </span>
    </section>
  );
}
