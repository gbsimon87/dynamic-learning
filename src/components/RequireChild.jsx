import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthContext } from "../context/auth-context";

/**
 * Route guard for Curriculum Mode.
 *
 * Curriculum progress belongs to a specific child profile, so nothing under
 * this guard may render until we know which child is active:
 *   loading    -> render nothing (the store read is still in flight)
 *   signedOut  -> /login
 *   needsChild -> /profiles
 *   ready      -> the routed page
 *
 * The attempted location is carried in navigation state as `from` so the
 * login / profile pages can send the user where they were originally headed.
 */
export default function RequireChild() {
  const { status } = useContext(AuthContext);
  const location = useLocation();

  if (status === "loading") return null;

  if (status === "signedOut") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (status === "needsChild") {
    return <Navigate to="/profiles" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
