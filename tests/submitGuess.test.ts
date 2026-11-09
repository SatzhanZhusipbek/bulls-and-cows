import { describe, it, expect } from 'vitest';
import { submitGuess } from '../src/game/submitGuess';
import { createInitialState } from '../src/game/createInitialState';
import type { GameState } from '../src/game/types';

function createPlayingState(): GameState {
  return {
    ...createInitialState(),
    status: 'playing',
    secret: '1234',
    startedAt: 1000,
  };
}

describe('submitGuess', () => {
  it('does not accept a guess when game is not started', () => {
    const state = createInitialState();

    const result = submitGuess(state, '1234', 2000);

    expect(result).toBe(state);
  });

  it('adds a valid guess to history', () => {
    const state = createPlayingState();

    const result = submitGuess(state, '1325', 2000);

    expect(result.history).toEqual([{ guess: '1325', bulls: 1, cows: 2 }]);

    expect(result.status).toBe('playing');
  });

  it('does not accept an invalid guess', () => {
    const state = createPlayingState();

    const result = submitGuess(state, '1123', 2000);

    expect(result).toBe(state);
    expect(result.history).toHaveLength(0);
  });

  it('does not accept a duplicate guess', () => {
    const state = createPlayingState();

    const firstResult = submitGuess(state, '1325', 2000);
    const secondResult = submitGuess(firstResult, '1325', 3000);

    expect(secondResult).toBe(firstResult);
    expect(secondResult.history).toHaveLength(1);
  });

  it('finishes the game when the secret is guessed', () => {
    const state = createPlayingState();

    const result = submitGuess(state, '1234', 5000);

    expect(result.status).toBe('won');
    expect(result.finishedAt).toBe(5000);
    expect(result.history).toEqual([{ guess: '1234', bulls: 4, cows: 0 }]);
  });

  it('does not mutate the original state', () => {
    const state = createPlayingState();
    const originalHistory = state.history;

    const result = submitGuess(state, '1325', 2000);

    expect(state.history).toEqual([]);
    expect(state.status).toBe('playing');
    expect(state.finishedAt).toBeNull();

    expect(result).not.toBe(state);
    expect(result.history).not.toBe(originalHistory);
    expect(result.history).toHaveLength(1);
  });
});
