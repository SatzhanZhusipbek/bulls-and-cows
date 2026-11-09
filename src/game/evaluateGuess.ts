export function evaluateGuess(
  secret: string,
  guess: string,
): { bulls: number; cows: number } {
  const guessDigits = guess.toLowerCase().split('');
  const secretDigits = secret.toLowerCase().split('');

  const bulls = guessDigits.filter(
    (digit, index) => digit === secretDigits[index],
  ).length;

  const cows = guessDigits.filter(
    (digit, index) =>
      secretDigits.includes(digit) && digit !== secretDigits[index],
  ).length;

  return { bulls, cows };
}
