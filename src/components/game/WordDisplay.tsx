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
      <div className="text-4xl font-mono font-bold tracking-widest text-slate-800 mb-4">
        {displayWord}
      </div>
      {showWord && (
        <div className="text-sm text-slate-600">
          Complete word: {word}
        </div>
      )}
    </div>
  );
}