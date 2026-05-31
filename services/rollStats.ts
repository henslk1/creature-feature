import { getRange, rollInRange } from "../lib/serviceUtils";

export function rollStats(stats: any[], statRanges: any[]): Record<string, number> {
  const finalStats: Record<string, number> = {};

  for (const stat of stats) {
    const { min, max } = getRange(stat, statRanges);
    finalStats[stat.name] = rollInRange(min, max);
  }

  return finalStats;
}
