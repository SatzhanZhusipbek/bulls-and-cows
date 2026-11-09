import type { GameState, GuessEntry } from './types';

export function addGuessToHistory(
  state: GameState,
  entry: GuessEntry,
): GameState {
  return {
    ...state,
    history: [...state.history, entry],
  };
}
