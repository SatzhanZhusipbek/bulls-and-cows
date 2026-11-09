export function generateSecret(
  length: number,
  base: number,
  random: () => number = Math.random,
): string {
  const digits = '0123456789abcdef';
  const availableDigits = digits.slice(0, base).split('');
  let result = '';
  for (let i = 0; i < length; i++) {
    const index = Math.floor(random() * availableDigits.length);
    const selected = availableDigits.splice(index, 1)[0];
    result += selected;
  }
  return result;
}
