const cache = new Map();
export function countPossibleSecrets(length, base) {
    if (length === 0) {
        return 1;
    }
    if (length > base || base <= 0) {
        return 0;
    }
    const key = `${length}:${base}`;
    const cached = cache.get(key);
    if (cached !== undefined) {
        return cached;
    }
    const result = base * countPossibleSecrets(length - 1, base - 1);
    cache.set(key, result);
    return result;
}
