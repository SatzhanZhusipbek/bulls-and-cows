import type { GameBase } from './types.js';

export interface LeaderboardEntry {
  length: number;
  base: GameBase;
  attempts: number;
  durationMs: number;
}

export function addLeaderboardEntry(
  records: readonly LeaderboardEntry[],
  entry: LeaderboardEntry,
): LeaderboardEntry[] {
  return [...records, entry]
    .sort((a, b) => a.attempts - b.attempts || a.durationMs - b.durationMs)
    .slice(0, 10);
}
