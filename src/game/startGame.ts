import { generateSecret } from './generateSecret.js';
import type { GameState } from './types.js';

export function startGame(
  state: GameState,
  now: number,
  random: () => number,
): GameState {
  return {
    ...state,
    status: 'playing',
    secret: generateSecret(state.settings.length, state.settings.base, random),
    history: [],
    startedAt: now,
    finishedAt: null,
  };
}
