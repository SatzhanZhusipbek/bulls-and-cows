const STORAGE_KEY = 'bulls-and-cows-leaderboard';
export function loadLeaderboard() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === null) {
            return [];
        }
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed
            .filter((value) => {
            if (typeof value !== 'object' || value === null) {
                return false;
            }
            const entry = value;
            return (typeof entry.length === 'number' &&
                [2, 8, 10, 16].includes(entry.base ?? -1) &&
                typeof entry.attempts === 'number' &&
                Number.isInteger(entry.attempts) &&
                entry.attempts > 0 &&
                typeof entry.durationMs === 'number' &&
                Number.isFinite(entry.durationMs) &&
                entry.durationMs >= 0);
        })
            .slice(0, 10);
    }
    catch {
        return [];
    }
}
export function saveLeaderboard(records) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
        return true;
    }
    catch {
        return false;
    }
}
