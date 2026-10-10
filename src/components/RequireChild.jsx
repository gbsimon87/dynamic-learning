import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthContext } from "../context/auth-context";
import { useRewards } from "../hooks/useRewards";
import { introEligible } from "../data/intro";

/**
 * Route guard for Curriculum Mode.
 *
 * Curriculum progress belongs to a specific child profile, so nothing under
 * this guard may render until we know which child is active:
 *   loading    -> render nothing (the store read is still in flight)
 *   signedOut  -> /login
 *   needsChild -> /profiles
 *   ready      -> the routed page, except that a brand-new child (never
 *                 played, intro not done) is sent to Bix's intro at /hello
 *                 first. That waits for the child's FIRST rewards read of
 *                 the session; a failed read just lets them through, and
 *                 later re-reads never blank the page. Learner accounts
 *                 (older children who signed up themselves) are not sent.
 *
 * The attempted location is carried in navigation state as `from` so the
 * login / profile pages can send the user where they were originally headed.
 */
// Children whose first rewards read has settled this session. The guard waits
// for that first read only: later re-reads (a retry after a failure, a
// refresh) put the status back to "loading", and blanking every gated page
// for each of them unmounted the page that asked for the re-read, which asked
// again on remount, in a loop.
const settled = new Set();

export default function RequireChild() {
  const { status, isLearner, child } = useContext(AuthContext);
  const rewards = useRewards();
  const location = useLocation();

  if (status === "loading") return null;

  if (status === "signedOut") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (status === "needsChild") {
    return <Navigate to="/profiles" replace state={{ from: location }} />;
  }

  if (!isLearner && location.pathname !== "/hello") {
    const childId = child?._id;
    if (!settled.has(childId)) {
      if (rewards.status === "idle" || rewards.status === "loading") return null;
      settled.add(childId);
    }
    if (rewards.hydrated && introEligible(rewards.rewards, { pendingBackfill: rewards.pendingBackfill })) {
      return <Navigate to="/hello" replace state={{ from: location }} />;
    }
  }

  return <Outlet />;
}
