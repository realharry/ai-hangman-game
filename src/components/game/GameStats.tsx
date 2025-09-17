import { Trophy, X, Clock } from 'lucide-react';
import type { Language } from '../../types/game';
import { languageData } from '../../data/languages';

interface GameStatsProps {
  wins: number;
  losses: number;
  gameTime: number;
  language: Language;
}

export function GameStats({ wins, losses, gameTime, language }: GameStatsProps) {
  const t = languageData[language].ui;

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${remainingSeconds}s`;
  };

  return (
    <div className="flex justify-center gap-8 text-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-green-600">
          <Trophy className="w-5 h-5" />
          <span className="text-2xl font-bold">{wins}</span>
        </div>
        <span className="text-sm text-slate-600">{t.wins}</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-red-600">
          <X className="w-5 h-5" />
          <span className="text-2xl font-bold">{losses}</span>
        </div>
        <span className="text-sm text-slate-600">{t.losses}</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-blue-600">
          <Clock className="w-5 h-5" />
          <span className="text-2xl font-bold">{formatTime(gameTime)}</span>
        </div>
        <span className="text-sm text-slate-600">{t.time}</span>
      </div>
    </div>
  );
}