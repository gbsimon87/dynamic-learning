import SortBins from "./SortBins";
import "./science-kit.css";

const BINS = [{ id: "change", label: "Change this" }, { id: "keep", label: "Keep the same" }];
/** Controlled comparison setup. The question defines a single changed factor;
 * the caller validates the complete card set, not just the changed card. */
export default function FairTestBoard({ prompt, comparison, cards, placement, onPlace, disabled }) {
  return <section className="science-fair-test" aria-label="Fair comparison setup">
    <p><strong>{prompt}</strong></p>
    <p>{comparison}</p>
    <p>A fair comparison changes one requirement. Keep the other conditions the same.</p>
    <SortBins bins={BINS} cards={cards} placement={placement} onPlace={(id, bin) => { if (!disabled) onPlace(id, bin); }} disabled={disabled} />
  </section>;
}
