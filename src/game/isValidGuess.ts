import { createDigitValidator } from './createDigitValidator.js';

export function isValidGuess(
  guess: string,
  length: number,
  base: number,
): boolean {
  if (length !== guess.length) {
    return false;
  }
  const isDigitValid = createDigitValidator(base);
  const characters = guess.split('');
  const result = characters.every(isDigitValid);
  const uniqueDigits = new Set(guess.toLowerCase());
  if (uniqueDigits.size !== guess.length) {
    return false;
  }
  return result;
}
