import type { GameState } from './types.js';

export function createInitialState(): GameState {
  return {
    status: 'setup',
    settings: {
      length: 4,
      base: 10,
    },
    secret: null,
    history: [],
    startedAt: null,
    finishedAt: null,
  };
}
