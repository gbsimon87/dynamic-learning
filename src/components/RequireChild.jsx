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
 *                 first. That waits for the rewards read; a failed read just
 *                 lets them through. Learner accounts (older children who
 *                 signed up themselves) are not sent.
 *
 * The attempted location is carried in navigation state as `from` so the
 * login / profile pages can send the user where they were originally headed.
 */
export default function RequireChild() {
  const { status, isLearner } = useContext(AuthContext);
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
    if (rewards.status === "idle" || rewards.status === "loading") return null;
    if (rewards.hydrated && introEligible(rewards.rewards, { pendingBackfill: rewards.pendingBackfill })) {
      return <Navigate to="/hello" replace state={{ from: location }} />;
    }
  }

  return <Outlet />;
}
