import { Button } from '../ui/button';
import { cn } from '../../utils/cn';

interface AlphabetKeyboardProps {
  word: string;
  guessedLetters: Set<string>;
  onLetterClick: (letter: string) => void;
  disabled?: boolean;
  language: 'en' | 'es';
}

export function AlphabetKeyboard({ 
  word, 
  guessedLetters, 
  onLetterClick, 
  disabled = false,
  language 
}: AlphabetKeyboardProps) {
  // English and Spanish alphabet (Spanish includes Ñ)
  const alphabets = {
    en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    es: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')
  };

  const alphabet = alphabets[language];

  const getLetterState = (letter: string) => {
    if (!guessedLetters.has(letter)) return 'default';
    return word.includes(letter) ? 'correct' : 'incorrect';
  };

  return (
    <div className="grid grid-cols-6 gap-1 max-w-xs mx-auto">
      {alphabet.map((letter) => {
        const state = getLetterState(letter);
        const isGuessed = guessedLetters.has(letter);
        
        return (
          <Button
            key={letter}
            variant={
              state === 'correct' 
                ? 'default' 
                : state === 'incorrect' 
                ? 'destructive' 
                : 'outline'
            }
            size="sm"
            className={cn(
              'h-8 text-xs font-bold transition-all duration-200 p-1',
              {
                'bg-green-500 hover:bg-green-600 text-white': state === 'correct',
                'bg-red-500 hover:bg-red-600 text-white': state === 'incorrect',
                'opacity-50 cursor-not-allowed': isGuessed || disabled
              }
            )}
            onClick={() => onLetterClick(letter)}
            disabled={isGuessed || disabled}
          >
            {letter}
          </Button>
        );
      })}
    </div>
  );
}