import { useEffect, useCallback } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { HangmanDrawing } from './HangmanDrawing';
import { WordDisplay } from './WordDisplay';
import { AlphabetKeyboard } from './AlphabetKeyboard';
import { GameControls } from './GameControls';
import { GameStats } from './GameStats';
import { languageData } from '../../data/languages';

export function HangmanGame() {
  const {
    gameState,
    startNewGame,
    makeGuess,
    pauseResume,
    resetGame,
    setLanguage,
    setPlayerType,
    gameTime
  } = useGameState();

  const t = languageData[gameState.language].ui;

  // Handle keyboard input for human players
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.playerType !== 'human' || gameState.status !== 'playing') {
      return;
    }

    const letter = event.key.toUpperCase();
    const alphabet = gameState.language === 'es' 
      ? 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (alphabet.includes(letter)) {
      makeGuess(letter);
    }
  }, [gameState.playerType, gameState.status, gameState.language, makeGuess]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // AI Player logic (simplified - could be enhanced with more sophisticated AI)
  useEffect(() => {
    if (gameState.playerType === 'ai' && gameState.status === 'playing') {
      const timer = setTimeout(() => {
        // Simple AI: guess common letters first, then remaining letters
        const commonLetters = gameState.language === 'es' 
          ? ['E', 'A', 'O', 'S', 'R', 'N', 'I', 'D', 'L', 'T', 'U', 'C', 'M', 'P', 'B', 'G', 'V', 'Y', 'Q', 'H', 'F', 'Z', 'J', 'Ñ', 'X', 'K', 'W']
          : ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R', 'D', 'L', 'U', 'C', 'M', 'W', 'F', 'G', 'Y', 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z'];
        
        const availableLetters = commonLetters.filter(letter => 
          !gameState.guessedLetters.has(letter)
        );

        if (availableLetters.length > 0) {
          makeGuess(availableLetters[0]);
        }
      }, 1500); // AI makes a guess every 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, [gameState.playerType, gameState.status, gameState.guessedLetters, gameState.language, makeGuess]);

  const renderGameMessage = () => {
    if (gameState.status === 'won') {
      return (
        <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            {t.gameWon}
          </h2>
          <p className="text-green-700">
            {t.time}: {Math.floor(gameTime / 1000)}s
          </p>
        </div>
      );
    }

    if (gameState.status === 'lost') {
      return (
        <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            {t.gameLost}
          </h2>
          <p className="text-red-700 font-mono text-xl">
            {gameState.word}
          </p>
        </div>
      );
    }

    if (gameState.status === 'paused') {
      return (
        <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h2 className="text-2xl font-bold text-yellow-800">
            Game Paused
          </h2>
        </div>
      );
    }

    if (gameState.status === 'idle') {
      return (
        <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">
            {t.title}
          </h2>
          <p className="text-blue-700">
            Click "{t.newGame}" to start playing!
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2">
      <div className="max-w-sm mx-auto space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            {t.title}
          </h1>
          <GameStats 
            wins={gameState.score.wins}
            losses={gameState.score.losses}
            gameTime={gameTime}
            language={gameState.language}
          />
        </div>

        {/* Game Controls */}
        <GameControls
          language={gameState.language}
          playerType={gameState.playerType}
          gameStatus={gameState.status}
          onNewGame={() => startNewGame()}
          onPauseResume={pauseResume}
          onRestart={resetGame}
          onLanguageChange={setLanguage}
          onPlayerTypeChange={setPlayerType}
        />

        {/* Game Message */}
        {renderGameMessage()}

        {/* Main Game Area */}
        {gameState.status !== 'idle' && (
          <div className="space-y-4">
            {/* Hangman Drawing */}
            <div className="flex justify-center">
              <HangmanDrawing
                wrongGuesses={gameState.wrongGuesses}
                maxWrongGuesses={gameState.maxWrongGuesses}
              />
            </div>

            {/* Word and Controls */}
            <div className="space-y-4">
              <WordDisplay
                word={gameState.word}
                guessedLetters={gameState.guessedLetters}
                showWord={gameState.status === 'lost'}
              />

              <div className="text-center">
                <p className="text-sm text-slate-700 mb-2">
                  {t.wrongGuesses}: {gameState.wrongGuesses} / {gameState.maxWrongGuesses}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(gameState.wrongGuesses / gameState.maxWrongGuesses) * 100}%`
                    }}
                  />
                </div>
              </div>

              {gameState.playerType === 'human' && (
                <AlphabetKeyboard
                  word={gameState.word}
                  guessedLetters={gameState.guessedLetters}
                  onLetterClick={makeGuess}
                  disabled={gameState.status !== 'playing'}
                  language={gameState.language}
                />
              )}

              {gameState.playerType === 'ai' && gameState.status === 'playing' && (
                <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-purple-800 font-medium text-sm">
                    AI is thinking... 🤖
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}