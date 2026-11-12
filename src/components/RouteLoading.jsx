import { useNavigation } from "react-router";
import BixLoader from "./mascot/BixLoader";

/**
 * Bix's loading screen while the router fetches a page's code on a link
 * click. Rendered beside the root layout from main.jsx (never inside it), so
 * the layout still renders under a plain MemoryRouter in tests, where there
 * is no navigation state to read.
 */
export default function RouteLoading() {
  const { state } = useNavigation();
  return state === "loading" ? <BixLoader message="Off we go" /> : null;
}
