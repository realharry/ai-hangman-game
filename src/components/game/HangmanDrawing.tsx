interface HangmanDrawingProps {
  wrongGuesses: number;
  maxWrongGuesses: number;
}

export function HangmanDrawing({ wrongGuesses, maxWrongGuesses }: HangmanDrawingProps) {
  const parts = [
    // Base
    <line key="base" x1="10" y1="330" x2="100" y2="330" stroke="#2d3748" strokeWidth="4" />,
    // Pole
    <line key="pole" x1="30" y1="330" x2="30" y2="30" stroke="#2d3748" strokeWidth="4" />,
    // Top
    <line key="top" x1="30" y1="30" x2="150" y2="30" stroke="#2d3748" strokeWidth="4" />,
    // Noose
    <line key="noose" x1="150" y1="30" x2="150" y2="70" stroke="#2d3748" strokeWidth="4" />,
    // Head
    <circle key="head" cx="150" cy="90" r="20" stroke="#2d3748" strokeWidth="4" fill="none" />,
    // Body
    <line key="body" x1="150" y1="110" x2="150" y2="230" stroke="#2d3748" strokeWidth="4" />,
    // Arms
    <g key="arms">
      <line x1="150" y1="150" x2="120" y2="180" stroke="#2d3748" strokeWidth="4" />
      <line x1="150" y1="150" x2="180" y2="180" stroke="#2d3748" strokeWidth="4" />
    </g>,
    // Legs
    <g key="legs">
      <line x1="150" y1="230" x2="120" y2="280" stroke="#2d3748" strokeWidth="4" />
      <line x1="150" y1="230" x2="180" y2="280" stroke="#2d3748" strokeWidth="4" />
    </g>
  ];

  // Face (shown when game is lost)
  const face = wrongGuesses >= maxWrongGuesses ? (
    <g key="face">
      {/* Eyes (X marks) */}
      <line x1="140" y1="85" x2="145" y2="90" stroke="#e53e3e" strokeWidth="2" />
      <line x1="145" y1="85" x2="140" y2="90" stroke="#e53e3e" strokeWidth="2" />
      <line x1="155" y1="85" x2="160" y2="90" stroke="#e53e3e" strokeWidth="2" />
      <line x1="160" y1="85" x2="155" y2="90" stroke="#e53e3e" strokeWidth="2" />
      {/* Mouth */}
      <line x1="145" y1="100" x2="155" y2="100" stroke="#e53e3e" strokeWidth="2" />
    </g>
  ) : null;

  // Always show gallows (first 4 parts), then show body parts based on wrong guesses
  const visibleParts = parts.slice(0, Math.min(4 + wrongGuesses, parts.length));

  return (
    <div className="flex justify-center items-center bg-gray-50 rounded-lg border p-2">
      <svg width="200" height="240" viewBox="0 0 200 240">
        {visibleParts}
        {face}
      </svg>
    </div>
  );
}