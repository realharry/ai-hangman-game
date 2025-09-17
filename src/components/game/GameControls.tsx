import { Button } from '../ui/button';
import { Select } from '../ui/select';
import { Play, Pause, RotateCcw } from 'lucide-react';
import type { Language, PlayerType, GameStatus } from '../../types/game';
import { languageData } from '../../data/languages';

interface GameControlsProps {
  language: Language;
  playerType: PlayerType;
  gameStatus: GameStatus;
  onNewGame: () => void;
  onPauseResume: () => void;
  onRestart: () => void;
  onLanguageChange: (language: Language) => void;
  onPlayerTypeChange: (playerType: PlayerType) => void;
}

export function GameControls({
  language,
  playerType,
  gameStatus,
  onNewGame,
  onPauseResume,
  onRestart,
  onLanguageChange,
  onPlayerTypeChange
}: GameControlsProps) {
  const t = languageData[language].ui;

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Button
        onClick={onNewGame}
        variant="default"
        className="flex items-center gap-2"
      >
        <Play className="w-4 h-4" />
        {t.newGame}
      </Button>

      {gameStatus === 'playing' || gameStatus === 'paused' ? (
        <Button
          onClick={onPauseResume}
          variant="outline"
          className="flex items-center gap-2"
        >
          {gameStatus === 'playing' ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {t.pauseResume}
        </Button>
      ) : null}

      {gameStatus !== 'idle' && (
        <Button
          onClick={onRestart}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          {t.restart}
        </Button>
      )}

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-700">
          {t.language}:
        </label>
        <Select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="w-32"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-700">
          {t.playerType}:
        </label>
        <Select
          value={playerType}
          onChange={(e) => onPlayerTypeChange(e.target.value as PlayerType)}
          className="w-32"
        >
          <option value="human">{t.human}</option>
          <option value="ai">{t.ai}</option>
        </Select>
      </div>
    </div>
  );
}