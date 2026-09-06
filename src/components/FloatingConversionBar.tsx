import React from 'react';
import { Phone, MessageCircle, Zap, Calculator } from 'lucide-react';
import { KAZAN_BASE_ADDRESS } from '../data/districtsData';

interface FloatingConversionBarProps {
  onOpenMax: () => void;
  onOpenConsultation: (topic?: string) => void;
}

export const FloatingConversionBar: React.FC<FloatingConversionBarProps> = ({ onOpenMax, onOpenConsultation }) => {
  return (
    <aside aria-label="Быстрые действия" className="fixed bottom-0 left-0 right-0 z-40 bg-[#101318]/95 backdrop-blur-lg border-t border-[#262C38] px-3 py-2.5 sm:py-3 shadow-2xl transition-all w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 w-full">
        
        {/* Left: Phone & status */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${KAZAN_BASE_ADDRESS.rawPhone}`}
            className="flex items-center gap-2 text-white hover:text-[#FF6A00] font-black text-sm lg:text-base transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1F2530] text-[#FF6A00] flex items-center justify-center border border-[#2D3645]">
              <Phone className="w-4 h-4" />
            </div>
            <span>{KAZAN_BASE_ADDRESS.phone}</span>
          </a>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Мастера на связи в Казани
          </span>
        </div>

        {/* Right / Mobile main action cluster */}
        <div className="flex items-center justify-between w-full md:w-auto gap-2">
          {/* Direct call on mobile */}
          <a
            href={`tel:${KAZAN_BASE_ADDRESS.rawPhone}`}
            className="md:hidden flex-1 py-2.5 px-3 rounded-xl bg-[#1C212B] border border-[#2F3746] text-white font-bold text-xs flex items-center justify-center gap-1.5 active:bg-[#252C39]"
          >
            <Phone className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>Звонок</span>
          </a>

          {/* Calculator Jump */}
          <a
            href="#calculator"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#202531] hover:bg-[#2A313E] border border-[#323A48] text-gray-200 text-xs font-bold transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>Калькулятор</span>
          </a>

          {/* MAX Button */}
          <button
            onClick={onOpenMax}
            className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#FF6A00] text-white font-black text-xs sm:text-sm flex items-center gap-1 shadow-md shadow-[#FF6A00]/20 hover:brightness-110 transition-all shrink-0"
            title="MAX — мгновенная связь"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>MAX</span>
          </button>

          {/* WhatsApp Main Button */}
          <a
            href={`https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent('Здравствуйте! Пишу с сайта КазаньСтрой Ремонт. Хочу рассчитать стоимость ремонта.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial py-2.5 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Написать в WhatsApp</span>
          </a>

          {/* Free Measurement button */}
          <button
            onClick={() => onOpenConsultation('Замер с нижней панели')}
            className="hidden lg:inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#FF6A00] hover:bg-[#E05300] text-white font-extrabold text-xs shadow-md transition-all"
          >
            Бесплатный замер
          </button>
        </div>

      </div>
    </aside>
  );
};
