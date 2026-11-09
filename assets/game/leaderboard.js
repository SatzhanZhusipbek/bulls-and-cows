export function addLeaderboardEntry(records, entry) {
    return [...records, entry]
        .sort((a, b) => a.attempts - b.attempts || a.durationMs - b.durationMs)
        .slice(0, 10);
}
