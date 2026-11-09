export function createInitialState() {
    return {
        status: 'setup',
        settings: {
            length: 4,
            base: 10,
        },
        secret: null,
        history: [],
        startedAt: null,
        finishedAt: null,
    };
}
