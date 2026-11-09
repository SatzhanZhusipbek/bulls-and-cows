import { describe, it, expect } from 'vitest';
import { evaluateGuess } from '../src/game/evaluateGuess';

describe('evaluateGuess', () => {
  it('returns correct bulls and cows for a mixed guess', () => {
    expect(evaluateGuess('1234', '1325')).toEqual({
      bulls: 1,
      cows: 2,
    });
  });

  it('returns correct bulls and cows for a correct guess', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({
      bulls: 4,
      cows: 0,
    });
  });

  it('returns 0 bulls and cows for an incorrect guess', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({
      bulls: 0,
      cows: 0,
    });
  });

  it('returns 0 bulls and 4 cows for a guess with incorrect positions', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({
      bulls: 0,
      cows: 4,
    });
  });

  it('returns 4 bulls and 0 cows for a guess with hexadecimal digits', () => {
    expect(evaluateGuess('a1f3', 'A1F3')).toEqual({
      bulls: 4,
      cows: 0,
    });
  });

  it('returns 1 bull and 2 cows for a guess with hexadecimal digits', () => {
    expect(evaluateGuess('a1f3', 'f1A2')).toEqual({
      bulls: 1,
      cows: 2,
    });
  });
});
