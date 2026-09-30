/**
 * XP and levels. Pure.
 *
 * XP is earned per FINISHED challenge (saved once, with the badges), never
 * per answer. Practice replays earn a little, but only the first
 * PRACTICE_XP_PER_DAY of them each day, so replaying the easiest challenge
 * is not a way to level up.
 */
import { getTopicStats } from "./curriculumProgressStats.js";

export const XP = { first: 10, practice: 5, combo: 2, backfill: 10 };
export const PRACTICE_XP_PER_DAY = 2;

export function xpForRun({ firstTime, combos = 0, practice, today }) {
  const comboXp = Math.max(0, Math.floor(Number(combos) || 0)) * XP.combo;
  if (firstTime) return { xp: XP.first + comboXp, practice, practiceCapped: false };

  const count = practice.day === today ? practice.count : 0;
  if (count >= PRACTICE_XP_PER_DAY) {
    return { xp: 0, practice: { day: today, count }, practiceCapped: true };
  }
  return { xp: XP.practice + comboXp, practice: { day: today, count: count + 1 }, practiceCapped: false };
}

/** 10 XP for each completed, BUILT challenge across every curriculum. */
export function backfillXp(candidates) {
  let completed = 0;
  for (const { curriculum, progress, isBuilt } of candidates ?? []) {
    for (const category of curriculum ?? []) {
      for (const topic of category.topics) {
        completed += getTopicStats(progress, category.id, topic, isBuilt).completed;
      }
    }
  }
  return completed * XP.backfill;
}

/** Level 2 at 100 XP; each next gap is 50 XP bigger than the last. */
export function levelFor(xp) {
  let level = 1;
  let floor = 0;
  let gap = 100;
  while (xp >= floor + gap) {
    floor += gap;
    level += 1;
    gap += 50;
  }
  return { level, into: xp - floor, needed: gap };
}

/** What to show before a pending back-fill has been stored. */
export function displayXp(rewards, pendingBackfill) {
  const pending = !rewards.xpBackfilled && Number.isFinite(pendingBackfill) ? pendingBackfill : 0;
  return rewards.xp + pending;
}

/**
 * A grown-up's (read-only) view of a child's XP: a child not yet back-filled
 * shows the same one-off back-fill their own view shows, without storing it.
 */
export function grownUpXp(rewards, candidates) {
  return displayXp(rewards, rewards.xpBackfilled ? null : backfillXp(candidates));
}
