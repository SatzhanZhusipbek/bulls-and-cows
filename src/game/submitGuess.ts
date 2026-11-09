import { isValidGuess } from './isValidGuess';
import { evaluateGuess } from './evaluateGuess';
import { addGuessToHistory } from './addGuessToHistory';
import type { GameState } from './types';

export function submitGuess(
  state: GameState,
  guess: string,
  now: number,
): GameState {
  if (state.status !== 'playing' || state.secret === null) {
    return state;
  }
  if (!isValidGuess(guess, state.settings.length, state.settings.base)) {
    return state;
  }
  if (state.history.some((entry) => entry.guess === guess.toLowerCase())) {
    return state;
  }
  const result = evaluateGuess(state.secret, guess);
  const entry = {
    guess: guess.toLowerCase(),
    bulls: result.bulls,
    cows: result.cows,
  };
  const updatedState = addGuessToHistory(state, entry);
  if (result.bulls === state.settings.length) {
    return {
      ...updatedState,
      status: 'won',
      finishedAt: now,
    };
  }
  return updatedState;
}
