/**
 * Daily streaks, with forgiving freezes. Pure: `today` is always passed in.
 *
 * A day is the device's local calendar date ("YYYY-MM-DD"). Gaps are measured
 * on UTC midnights so a daylight-saving change can never make a day vanish.
 * `current` counts days PLAYED in a row; a frozen day bridges a gap but does
 * not add to it. `recent`/`frozen` are capped lists for the Mon–Sun dots only.
 */
export const MAX_FREEZES = 2;
export const FREEZE_EVERY = 5;
export const STREAK_MILESTONES = [3, 7, 14, 30];
const KEEP = 14;

export function localDay(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function utc(day) {
  const [y, m, d] = day.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function daysBetween(from, to) {
  return Math.round((utc(to) - utc(from)) / 86_400_000);
}

export function addDays(day, n) {
  return new Date(utc(day) + n * 86_400_000).toISOString().slice(0, 10);
}

const keep = (days, day) => [...days, day].slice(-KEEP);

export function recordDay(streak, today) {
  const gap = streak.lastDay ? daysBetween(streak.lastDay, today) : null;
  // Same day — or one day "ahead", which is simply another device in an
  // earlier time zone (or a late queued run): already counted.
  if (gap === 0 || gap === -1) {
    return { streak, outcome: "none", usedFreezes: 0, earnedFreeze: false };
  }
  // A last day further in the FUTURE means the device clock was once set
  // ahead. Left alone, no day would count until the calendar caught up, weeks
  // later, so the streak is pulled back to today, later days dropped, kept.
  if (gap !== null && gap < -1) {
    const past = (days) => days.filter((day) => daysBetween(day, today) >= 0);
    const recent = past(streak.recent);
    return {
      streak: {
        ...streak,
        lastDay: today,
        recent: recent.includes(today) ? recent : keep(recent, today),
        frozen: past(streak.frozen),
      },
      outcome: "none",
      usedFreezes: 0,
      earnedFreeze: false,
    };
  }

  let current;
  let outcome;
  let usedFreezes = 0;
  let freezes = streak.freezes;
  let frozen = streak.frozen;

  if (!streak.lastDay) {
    current = 1;
    outcome = "started";
  } else {
    const missed = daysBetween(streak.lastDay, today) - 1;
    if (missed === 0) {
      current = streak.current + 1;
      outcome = "extended";
    } else if (missed <= freezes) {
      usedFreezes = missed;
      freezes -= missed;
      for (let i = 1; i <= missed; i++) frozen = keep(frozen, addDays(streak.lastDay, i));
      current = streak.current + 1;
      outcome = "saved";
    } else {
      // Too long a gap: a fresh start, and the freezes are kept, not wasted.
      current = 1;
      outcome = "restarted";
    }
  }

  const earnedFreeze = current % FREEZE_EVERY === 0 && freezes < MAX_FREEZES;
  if (earnedFreeze) freezes += 1;

  return {
    streak: {
      ...streak,
      current,
      best: Math.max(streak.best, current),
      lastDay: today,
      freezes,
      recent: keep(streak.recent, today),
      frozen,
    },
    outcome,
    usedFreezes,
    earnedFreeze,
  };
}

/** For display only: what the streak looks like right now, without writing. */
export function streakStatus(streak, today) {
  if (!streak.lastDay) return { current: 0, alive: false, playedToday: false, atRisk: false };
  const gap = daysBetween(streak.lastDay, today);
  if (gap <= 0) return { current: streak.current, alive: true, playedToday: true, atRisk: false };
  if (gap - 1 <= streak.freezes) {
    return { current: streak.current, alive: true, playedToday: false, atRisk: true };
  }
  return { current: 0, alive: false, playedToday: false, atRisk: false };
}

/** The Monday-to-Sunday week containing `today`, each day's dot state. */
export function weekDots(streak, today) {
  const mondayOffset = (new Date(utc(today)).getUTCDay() + 6) % 7;
  const monday = addDays(today, -mondayOffset);
  return Array.from({ length: 7 }, (_, i) => {
    const day = addDays(monday, i);
    const state = streak.recent.includes(day)
      ? "played"
      : streak.frozen.includes(day)
        ? "frozen"
        : day === today
          ? "today"
          : "empty";
    return { day, state };
  });
}
