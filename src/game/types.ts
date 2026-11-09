export type GameStatus = 'setup' | 'playing' | 'won';

export type GameBase = 2 | 8 | 10 | 16;

export interface GameSettings {
  length: number;
  base: GameBase;
}

export interface GuessEntry {
  guess: string;
  bulls: number;
  cows: number;
}

export interface GameState {
  status: GameStatus;
  settings: GameSettings;
  secret: string | null;
  history: GuessEntry[];
  startedAt: number | null;
  finishedAt: number | null;
}
