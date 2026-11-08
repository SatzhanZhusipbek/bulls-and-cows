import { describe, it, expect } from 'vitest';
import { isValidGuess } from '../src/game/isValidGuess';

describe('isValidGuess', () => {
  it('accepts a valid guess with unique digits', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
    expect(isValidGuess('0123', 4, 10)).toBe(true);
  });

  it('rejects a guess with a wrong length', () => {
    expect(isValidGuess('', 4, 10)).toBe(false);
    expect(isValidGuess('12345', 4, 10)).toBe(false);
    expect(isValidGuess('23', 3, 10)).toBe(false);
  });

  it('rejects a guess with repeating digits', () => {
    expect(isValidGuess('1224', 4, 10)).toBe(false);
    expect(isValidGuess('2344', 4, 10)).toBe(false);
  });

  it('rejects digits not allowed in the selected base', () => {
    expect(isValidGuess('1287', 4, 8)).toBe(false);
    expect(isValidGuess('12A4', 4, 10)).toBe(false);
    expect(isValidGuess('12G4', 4, 16)).toBe(false);
  });

  it('accepts a valid guess with digits in lower and uppercase', () => {
    expect(isValidGuess('123b', 4, 16)).toBe(true);
    expect(isValidGuess('123A', 4, 16)).toBe(true);
  });

  it('rejects a guess with repeating digits in lower and uppercase', () => {
    expect(isValidGuess('12aA', 4, 16)).toBe(false);
    expect(isValidGuess('13bB', 4, 16)).toBe(false);
  });
});
