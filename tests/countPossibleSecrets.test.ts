import { describe, it, expect } from 'vitest';
import { countPossibleSecrets } from '../src/game/countPossibleSecrets';

describe('countPossibleSecrets', () => {
  it('counts possible secrets in binary system', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('counts possible secrets in octal system', () => {
    expect(countPossibleSecrets(3, 8)).toBe(336);
  });

  it('counts possible secrets in decimal system', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });

  it('counts possible secrets in decimal system with 6 digits', () => {
    expect(countPossibleSecrets(6, 10)).toBe(151200);
  });

  it('counts possible secrets in hexadecimal system', () => {
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });

  it('returns 1 when length is 0', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });
});
