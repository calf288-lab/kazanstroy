import React from 'react';
import { Zap } from 'lucide-react';
import { trackGoal } from '../utils/metrika';

interface MaxFloatingButtonProps {
  onOpenMax: () => void;
}

export const MaxFloatingButton: React.FC<MaxFloatingButtonProps> = ({ onOpenMax }) => {
  const handleClick = () => {
    trackGoal('max_button_click');
    trackGoal('max_click');
    onOpenMax();
  };

  return (
    <div className="fixed bottom-18 sm:bottom-20 md:bottom-8 right-3 sm:right-6 z-40 group">
      {/* Outer pulsing beacon ring */}
      <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-[#FF6A00] opacity-75 blur-sm animate-pulse group-hover:opacity-100 transition-opacity" />

      <button
        onClick={handleClick}
        id="max-floating-widget-btn"
        className="relative flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-[#FF6A00] to-[#E65300] text-white font-black shadow-2xl shadow-[#FF6A00]/50 hover:shadow-[#FF6A00]/80 hover:scale-105 active:scale-95 transition-all border-2 border-white/20"
        title="MAX — мгновенная связь с бригадиром за 60 секунд"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-200 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>

        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white fill-current animate-bounce" />
        </div>

        <div className="flex flex-col items-start leading-none text-left">
          <span className="text-xs sm:text-sm font-black tracking-wider uppercase drop-shadow">MAX</span>
          <span className="text-[9px] sm:text-[10px] text-amber-100 font-bold hidden sm:inline leading-tight">Бригадир онлайн</span>
        </div>
      </button>
    </div>
  );
};
