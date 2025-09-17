interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
  showWord?: boolean;
}

export function WordDisplay({ word, guessedLetters, showWord = false }: WordDisplayProps) {
  const displayWord = word
    .split('')
    .map(letter => {
      if (showWord || guessedLetters.has(letter)) {
        return letter;
      }
      return '_';
    })
    .join(' ');

  return (
    <div className="text-center">
      <div className="text-xl font-mono font-bold tracking-wide text-slate-800 mb-2 break-all">
        {displayWord}
      </div>
      {showWord && (
        <div className="text-xs text-slate-600">
          Complete word: {word}
        </div>
      )}
    </div>
  );
}