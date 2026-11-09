export function createDigitValidator(base: number): (char: string) => boolean {
  const digits = '0123456789abcdef';
  const supportedBases = [2, 8, 10, 16];

  return (char: string): boolean => {
    if (char.length !== 1 || !supportedBases.includes(base)) {
      return false;
    }
    return digits.slice(0, base).includes(char.toLowerCase());
  };
}
