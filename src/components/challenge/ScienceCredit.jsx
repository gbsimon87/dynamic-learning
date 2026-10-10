import { createElement } from "react";
import { Link } from "react-router";
import { LICENCES } from "../../data/licences.js";

/**
 * A picture-credit caption that links to the full notices page (/credits),
 * plus the CC BY 4.0 licence itself when the credit names it.
 */
export default function ScienceCredit({ children, as = "span" }) {
  const text = [children].flat().join("");
  return createElement(as, { className: "science-credit" },
    text,
    text.includes("CC BY 4.0") && <>{" · "}<a href={LICENCES["CC-BY-4.0"].url}>CC BY 4.0 licence</a></>,
    " · ", <Link key="all" to="/credits">All credits</Link>,
  );
}
