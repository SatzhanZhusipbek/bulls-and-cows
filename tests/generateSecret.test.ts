import { describe, it, expect } from 'vitest';
import { generateSecret } from '../src/game/generateSecret';
import { createDigitValidator } from '../src/game/createDigitValidator';

//Возвращаемая строка имеет правильную длину.
//Все цифры уникальны.
//Все цифры допустимы для выбранной системы счисления.
//Функция работает с двоичной, восьмеричной, десятичной и шестнадцатеричной системами.
//При одинаковой последовательности случайных чисел результат одинаков — это проверка детерминированности.
describe('generateSecret', () => {
  it('generates a secret with the correct length', () => {
    const generatedSecret = generateSecret(4, 10);
    const generatedSecretBin = generateSecret(2, 2);
    const generatedSecretOct = generateSecret(4, 8);
    const generatedSecretHex = generateSecret(6, 16);
    expect(generatedSecret.length).toBe(4);
    expect(generatedSecretBin.length).toBe(2);
    expect(generatedSecretOct.length).toBe(4);
    expect(generatedSecretHex.length).toBe(6);
  });

  it('generates a secret with unique digits', () => {
    const generatedSecret = generateSecret(4, 10);
    const generatedSecretBin = generateSecret(2, 2);
    const generatedSecretOct = generateSecret(4, 8);
    const generatedSecretHex = generateSecret(6, 16);

    expect(new Set(generatedSecret.toLowerCase()).size).toBe(4);
    expect(new Set(generatedSecretBin.toLowerCase()).size).toBe(2);
    expect(new Set(generatedSecretOct.toLowerCase()).size).toBe(4);
    expect(new Set(generatedSecretHex.toLowerCase()).size).toBe(6);
  });

  it('generates a secret with valid digits', () => {
    const generatedSecret = generateSecret(4, 10);
    const isDigitValid = createDigitValidator(10);
    const generatedSecretBin = generateSecret(2, 2);
    const isDigitValidBin = createDigitValidator(2);
    const generatedSecretOct = generateSecret(4, 8);
    const isDigitValidOct = createDigitValidator(8);
    const generatedSecretHex = generateSecret(6, 16);
    const isDigitValidHex = createDigitValidator(16);

    expect(generatedSecret.split('').every(isDigitValid)).toBe(true);
    expect(generatedSecretBin.split('').every(isDigitValidBin)).toBe(true);
    expect(generatedSecretOct.split('').every(isDigitValidOct)).toBe(true);
    expect(generatedSecretHex.split('').every(isDigitValidHex)).toBe(true);
  });

  it('generates the same secret with identical random sequences', () => {
    const random1 = createMockRandom();
    const random2 = createMockRandom();
    const secret1 = generateSecret(4, 10, random1);
    const secret2 = generateSecret(4, 10, random2);

    expect(secret1).toBe(secret2);
  });
});

function createMockRandom(): () => number {
  const values = [0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95];
  let index = 0;

  return (): number => {
    const value = values[index % values.length];
    index++;

    return value;
  };
}
