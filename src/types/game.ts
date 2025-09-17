export type Language = 'en' | 'es';

export type GameStatus = 'idle' | 'playing' | 'paused' | 'won' | 'lost';

export type PlayerType = 'human' | 'ai';

export interface GameState {
  word: string;
  guessedLetters: Set<string>;
  wrongGuesses: number;
  maxWrongGuesses: number;
  status: GameStatus;
  language: Language;
  playerType: PlayerType;
  startTime: number | null;
  endTime: number | null;
  score: {
    wins: number;
    losses: number;
  };
}

export interface WordData {
  word: string;
  hint?: string;
}

export interface LanguageData {
  words: WordData[];
  ui: {
    [key: string]: string;
  };
}