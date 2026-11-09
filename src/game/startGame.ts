import { generateSecret } from './generateSecret';
import type { GameState } from './types';

export function startGame(state: GameState): GameState {
  return {
    ...state,
    status: 'playing',
    secret: generateSecret(state.settings.length, state.settings.base),
    history: [],
    startedAt: Date.now(),
    finishedAt: null,
  };
}
