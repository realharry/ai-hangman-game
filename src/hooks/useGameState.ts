import { useState, useCallback } from 'react';
import type { GameState, Language, PlayerType, GameStatus } from '../types/game';
import { languageData } from '../data/languages';
import { soundManager } from '../utils/sounds';

const STORAGE_KEY = 'hangman-game-score';
const MAX_WRONG_GUESSES = 6;

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedScore = localStorage.getItem(STORAGE_KEY);
    const score = savedScore ? JSON.parse(savedScore) : { wins: 0, losses: 0 };
    
    return {
      word: '',
      guessedLetters: new Set(),
      wrongGuesses: 0,
      maxWrongGuesses: MAX_WRONG_GUESSES,
      status: 'idle',
      language: 'en',
      playerType: 'human',
      startTime: null,
      endTime: null,
      score
    };
  });

  const saveScore = useCallback((score: { wins: number; losses: number }) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(score));
  }, []);

  const getRandomWord = useCallback((language: Language) => {
    const words = languageData[language].words;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].word.toUpperCase();
  }, []);

  const startNewGame = useCallback((language?: Language, playerType?: PlayerType) => {
    const newLanguage = language || gameState.language;
    const newPlayerType = playerType || gameState.playerType;
    const word = getRandomWord(newLanguage);
    
    setGameState(prev => ({
      ...prev,
      word,
      guessedLetters: new Set(),
      wrongGuesses: 0,
      status: 'playing',
      language: newLanguage,
      playerType: newPlayerType,
      startTime: Date.now(),
      endTime: null
    }));
  }, [gameState.language, gameState.playerType, getRandomWord]);

  const makeGuess = useCallback((letter: string) => {
    const upperLetter = letter.toUpperCase();
    
    if (gameState.status !== 'playing' || gameState.guessedLetters.has(upperLetter)) {
      return;
    }

    setGameState(prev => {
      const newGuessedLetters = new Set(prev.guessedLetters);
      newGuessedLetters.add(upperLetter);

      const isCorrectGuess = prev.word.includes(upperLetter);
      const newWrongGuesses = isCorrectGuess ? prev.wrongGuesses : prev.wrongGuesses + 1;

      // Play sound effects
      if (isCorrectGuess) {
        soundManager.playCorrectGuess();
      } else {
        soundManager.playWrongGuess();
      }

      // Check win condition
      const hasWon = prev.word.split('').every(char => newGuessedLetters.has(char));
      
      // Check lose condition
      const hasLost = newWrongGuesses >= prev.maxWrongGuesses;

      let newStatus: GameStatus = 'playing';
      let newScore = prev.score;
      let endTime = prev.endTime;

      if (hasWon) {
        newStatus = 'won';
        newScore = { ...prev.score, wins: prev.score.wins + 1 };
        endTime = Date.now();
        soundManager.playGameWon();
      } else if (hasLost) {
        newStatus = 'lost';
        newScore = { ...prev.score, losses: prev.score.losses + 1 };
        endTime = Date.now();
        soundManager.playGameLost();
      }

      if (newStatus !== 'playing') {
        saveScore(newScore);
      }

      return {
        ...prev,
        guessedLetters: newGuessedLetters,
        wrongGuesses: newWrongGuesses,
        status: newStatus,
        score: newScore,
        endTime
      };
    });
  }, [gameState.status, gameState.guessedLetters, saveScore]);

  const pauseResume = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: prev.status === 'playing' ? 'paused' : 'playing'
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      word: '',
      guessedLetters: new Set(),
      wrongGuesses: 0,
      status: 'idle',
      startTime: null,
      endTime: null
    }));
  }, []);

  const setLanguage = useCallback((language: Language) => {
    setGameState(prev => ({
      ...prev,
      language
    }));
  }, []);

  const setPlayerType = useCallback((playerType: PlayerType) => {
    setGameState(prev => ({
      ...prev,
      playerType
    }));
  }, []);

  // Calculate game time
  const gameTime = gameState.startTime 
    ? (gameState.endTime || Date.now()) - gameState.startTime 
    : 0;

  return {
    gameState,
    startNewGame,
    makeGuess,
    pauseResume,
    resetGame,
    setLanguage,
    setPlayerType,
    gameTime
  };
}