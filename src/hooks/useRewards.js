import { useContext } from "react";
import { RewardsContext } from "../context/rewards-context";
import { normaliseRewards } from "../data/rewardsShape";

const INERT = {
  rewards: normaliseRewards(null),
  status: "idle",
  hydrated: false,
  pendingBackfill: null,
  xp: 0,
  award: () => null,
  clearNews: () => {},
  retry: () => {},
  refresh: () => {},
};

/**
 * The active child's rewards, from RewardsProvider (src/context/). Outside the
 * provider it is inert: never a read, never a write.
 */
export function useRewards() {
  return useContext(RewardsContext) ?? INERT;
}
