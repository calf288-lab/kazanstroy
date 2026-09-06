import React, { useState } from 'react';
import { Phone, MessageCircle, Zap, Calendar, Menu, X, MapPin, Clock } from 'lucide-react';
import { KAZAN_BASE_ADDRESS } from '../data/districtsData';

interface HeaderProps {
  onOpenConsultation: (topic?: string) => void;
  onOpenMax: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation, onOpenMax }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Услуги', href: '#services' },
    { label: 'Калькулятор', href: '#calculator' },
    { label: 'До / После', href: '#before-after' },
    { label: 'Портфолио', href: '#portfolio' },
    { label: 'Зоны выезда', href: '#geomap' },
    { label: 'Отзывы', href: '#reviews' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#12151A]/95 backdrop-blur-md border-b border-[#252A33] transition-all w-full max-w-full overflow-hidden">
      {/* Top info bar */}
      <div className="hidden lg:block bg-[#0D0F13] border-b border-[#1E232B] text-xs py-1.5 px-4 text-[#9CA3AF] w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 xl:gap-6 min-w-0">
            <span className="flex items-center gap-1.5 text-gray-300 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
              <span className="truncate">{KAZAN_BASE_ADDRESS.city}, {KAZAN_BASE_ADDRESS.street} ({KAZAN_BASE_ADDRESS.district})</span>
            </span>
            <span className="hidden xl:flex items-center gap-1.5 text-gray-400 shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
              {KAZAN_BASE_ADDRESS.workHours}
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              Выезд замерщика сегодня — 0 ₽
            </span>
            <span className="text-gray-400 hidden 2xl:inline">Гарантия 3 года</span>
          </div>
        </div>
      </div>

      {/* Main header navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2 sm:gap-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#E05300] flex items-center justify-center text-white font-extrabold text-lg sm:text-xl shadow-lg shadow-[#FF6A00]/20 group-hover:scale-105 transition-transform">
              КС
            </div>
            <div>
              <div className="text-base sm:text-lg lg:text-xl font-extrabold tracking-tight text-white leading-tight">
                КАЗАНЬСТРОЙ <span className="text-[#FF6A00]">РЕМОНТ</span>
              </div>
              <p className="hidden sm:block text-[10px] sm:text-[11px] text-[#9CA3AF] font-medium leading-none mt-0.5">
                Ремонт квартир и домов в Казани · опыт 10+ лет
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-5 text-xs 2xl:text-sm font-semibold text-[#D1D5DB]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#FF6A00] transition-colors py-1 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Phone */}
            <div className="hidden lg:flex flex-col items-end mr-1">
              <a
                href={`tel:${KAZAN_BASE_ADDRESS.rawPhone}`}
                className="text-white font-black text-sm xl:text-base tracking-tight hover:text-[#FF6A00] transition-colors whitespace-nowrap"
              >
                {KAZAN_BASE_ADDRESS.phone}
              </a>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Сейчас на связи
              </span>
            </div>

            {/* Direct phone call button on tablet/mobile */}
            <a
              href={`tel:${KAZAN_BASE_ADDRESS.rawPhone}`}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl text-xs font-bold bg-[#222730] text-gray-200 hover:text-white border border-[#323945]"
              title="Позвонить"
            >
              <Phone className="w-4 h-4 text-[#FF6A00]" />
            </a>

            {/* WhatsApp button */}
            <a
              href={`https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent('Здравствуйте! Хочу проконсультироваться по ремонту в Казани и узнать примерную смету.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-700/20 transition-all hover:-translate-y-0.5"
              title="Написать в WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* MAX button */}
            <button
              onClick={onOpenMax}
              className="inline-flex items-center justify-center gap-1 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-500 to-[#FF6A00] text-white shadow-md shadow-[#FF6A00]/25 hover:brightness-110 transition-all hover:-translate-y-0.5"
              title="MAX — мгновенная связь с бригадиром"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>MAX</span>
            </button>

            {/* Free measurement request button */}
            <button
              onClick={() => onOpenConsultation('Вызов замерщика')}
              className="hidden lg:inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FF6A00] hover:bg-[#E55F00] text-white shadow-lg shadow-[#FF6A00]/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Замер 0 ₽</span>
            </button>

            {/* Mobile / tablet menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-[#222730]"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#12151A] border-b border-[#252A33] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2 border-b border-[#222730] pb-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-200 hover:text-[#FF6A00] font-medium py-2 text-base px-2 rounded-lg hover:bg-[#1A1E26]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={`tel:${KAZAN_BASE_ADDRESS.rawPhone}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#1F242C] text-white font-bold rounded-xl border border-[#303743]"
            >
              <Phone className="w-4 h-4 text-[#FF6A00]" />
              {KAZAN_BASE_ADDRESS.phone}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation('Вызов замерщика с сайта');
              }}
              className="w-full py-3 bg-[#FF6A00] hover:bg-[#E55F00] text-white font-bold rounded-xl shadow-lg shadow-[#FF6A00]/30"
            >
              Вызвать замерщика бесплатно
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
