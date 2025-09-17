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
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          onClick={onNewGame}
          variant="default"
          size="sm"
          className="flex items-center gap-1"
        >
          <Play className="w-3 h-3" />
          {t.newGame}
        </Button>

        {gameStatus === 'playing' || gameStatus === 'paused' ? (
          <Button
            onClick={onPauseResume}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            {gameStatus === 'playing' ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3" />
            )}
            {t.pauseResume}
          </Button>
        ) : null}

        {gameStatus !== 'idle' && (
          <Button
            onClick={onRestart}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            {t.restart}
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-slate-700">
            {t.language}:
          </label>
          <Select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="text-xs h-8 w-20"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-slate-700">
            {t.playerType}:
          </label>
          <Select
            value={playerType}
            onChange={(e) => onPlayerTypeChange(e.target.value as PlayerType)}
            className="text-xs h-8 w-20"
          >
            <option value="human">{t.human}</option>
            <option value="ai">{t.ai}</option>
          </Select>
        </div>
      </div>
    </div>
  );
}