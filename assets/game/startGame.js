import { generateSecret } from './generateSecret.js';
export function startGame(state, now, random) {
    return {
        ...state,
        status: 'playing',
        secret: generateSecret(state.settings.length, state.settings.base, random),
        history: [],
        startedAt: now,
        finishedAt: null,
    };
}
