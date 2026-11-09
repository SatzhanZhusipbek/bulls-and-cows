export function addGuessToHistory(state, entry) {
    return {
        ...state,
        history: [...state.history, entry],
    };
}
