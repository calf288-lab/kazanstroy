import React from 'react';
import { X, Zap, Phone, MessageCircle, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { KAZAN_BASE_ADDRESS } from '../data/districtsData';
import { trackGoal } from '../utils/metrika';

interface MaxWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MaxWidgetModal: React.FC<MaxWidgetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#161922] border-2 border-amber-500/50 rounded-2xl p-6 sm:p-7 shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#222733] transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-[#FF6A00] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#FF6A00]/30 mb-3">
            <Zap className="w-8 h-8 fill-current" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            MAX — Быстрая связь за 60 секунд
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Прямой контакт с бригадиром
          </h3>
          <p className="text-xs text-gray-300 mt-1">
            Без секретарей и посредников. На связи старший мастер по ремонтам в Казани.
          </p>
        </div>

        {/* Action channels */}
        <div className="space-y-3">
          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent('Здравствуйте! Обращаюсь через кнопку MAX на сайте. Мне нужна срочная консультация / расчет ремонта.')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGoal('max_whatsapp_click')}
            className="flex items-center justify-between p-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow-lg shadow-emerald-950/30 transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-black">Написать в WhatsApp</div>
                <div className="text-[11px] text-emerald-100 font-normal">Ответим за 1-2 минуты</div>
              </div>
            </div>
            <span className="text-xs bg-emerald-700/60 px-2.5 py-1 rounded-md font-bold">
              Онлайн
            </span>
          </a>

          {/* Direct Phone Call */}
          <a
            href={`tel:${KAZAN_BASE_ADDRESS.rawPhone}`}
            onClick={() => trackGoal('max_call_click')}
            className="flex items-center justify-between p-4 rounded-xl bg-[#202530] hover:bg-[#29303D] border border-[#343D4E] hover:border-[#FF6A00] text-white font-extrabold transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#2B3342] text-[#FF6A00] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-black">{KAZAN_BASE_ADDRESS.phone}</div>
                <div className="text-[11px] text-gray-400 font-normal">Прямой телефон бригадира</div>
              </div>
            </div>
            <span className="text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md font-bold">
              Вызов
            </span>
          </a>
        </div>

        {/* Working Hours and Base */}
        <div className="mt-6 pt-5 border-t border-[#262C38] space-y-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF6A00] shrink-0" />
            <span>Время работы: {KAZAN_BASE_ADDRESS.workHours}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#FF6A00] shrink-0" />
            <span>{KAZAN_BASE_ADDRESS.city}, {KAZAN_BASE_ADDRESS.street}</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Срочный аварийный выезд мастера: 30-45 минут</span>
          </div>
        </div>

      </div>
    </div>
  );
};
