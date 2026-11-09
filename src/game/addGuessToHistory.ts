import type { GameState, GuessEntry } from './types.js';

export function addGuessToHistory(
  state: GameState,
  entry: GuessEntry,
): GameState {
  return {
    ...state,
    history: [...state.history, entry],
  };
}
