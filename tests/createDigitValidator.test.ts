import { describe, it, expect } from 'vitest';
import { createDigitValidator } from '../src/game/createDigitValidator';

describe('createDigitValidator', () => {
  it('accepts only 0 and 1 for binary system', () => {
    const isBinaryDigit = createDigitValidator(2);

    expect(isBinaryDigit('0')).toBe(true);
    expect(isBinaryDigit('1')).toBe(true);
    expect(isBinaryDigit('2')).toBe(false);
  });

  it('accepts digits from 0 to 7 for octal system', () => {
    const isOctalDigit = createDigitValidator(8);

    expect(isOctalDigit('0')).toBe(true);
    expect(isOctalDigit('7')).toBe(true);
    expect(isOctalDigit('8')).toBe(false);
  });

  it('accepts digits from 0 to 9 for decimal system', () => {
    const isDecimalDigit = createDigitValidator(10);

    expect(isDecimalDigit('0')).toBe(true);
    expect(isDecimalDigit('9')).toBe(true);
    expect(isDecimalDigit('A')).toBe(false);
  });

  it('accepts digits from 0 to F for hexadecimal system', () => {
    const isHexadecimalDigit = createDigitValidator(16);

    expect(isHexadecimalDigit('0')).toBe(true);
    expect(isHexadecimalDigit('9')).toBe(true);
    expect(isHexadecimalDigit('a')).toBe(true);
    expect(isHexadecimalDigit('f')).toBe(true);
    expect(isHexadecimalDigit('A')).toBe(true);
    expect(isHexadecimalDigit('F')).toBe(true);
    expect(isHexadecimalDigit('G')).toBe(false);
  });

  it('rejects empty strings, multiple characters and invalid symbols', () => {
    const isDecimalDigit = createDigitValidator(10);

    expect(isDecimalDigit('')).toBe(false);
    expect(isDecimalDigit('12')).toBe(false);
    expect(isDecimalDigit('@')).toBe(false);
    expect(isDecimalDigit(' ')).toBe(false);
  });
});
