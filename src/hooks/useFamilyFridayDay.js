import { useSyncExternalStore } from 'react';
import { londonDay } from '../../shared/familyFridaySchedule.js';

function subscribe(onChange) {
  // Also catches a tab left open across Friday midnight or resumed after sleep.
  const timer = window.setInterval(onChange, 30000);
  window.addEventListener('focus', onChange);
  document.addEventListener('visibilitychange', onChange);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener('focus', onChange);
    document.removeEventListener('visibilitychange', onChange);
  };
}

// A date-dependent banner must not be frozen into the build-time prerender.
const serverSnapshot = () => null;
const snapshot = () => londonDay();
export function useFamilyFridayDay() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
