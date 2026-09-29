import { useCallback, useSyncExternalStore } from "react";
import { isMuted, setMuted, subscribe } from "./player";

/** The mute switch as React state: `[muted, toggle]`. */
export function useSoundMuted() {
  const muted = useSyncExternalStore(subscribe, isMuted, () => false);
  const toggle = useCallback(() => setMuted(!isMuted()), []);
  return [muted, toggle];
}
