import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Zap } from 'lucide-react';
import { KAZAN_BASE_ADDRESS } from '../data/districtsData';

interface FooterProps {
  onOpenConsultation: (topic?: string) => void;
  onOpenMax: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onOpenMax }) => {
  return (
    <footer className="bg-[#090B0E] border-t border-[#222731] text-gray-400 text-xs sm:text-sm pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1E232B]">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#E05300] flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-[#FF6A00]/20">
                КС
              </div>
              <div className="text-lg font-black text-white leading-tight">
                КАЗАНЬСТРОЙ <span className="text-[#FF6A00]">РЕМОНТ</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Профессиональный капитальный и косметический ремонт квартир, домов, коттеджей и коммерческих помещений в Казани. Опыт более 10 лет.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Официальный договор · Гарантия 3 года</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Навигация
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#services" className="hover:text-[#FF6A00] transition-colors">Прайс-лист на работы</a></li>
              <li><a href="#calculator" className="hover:text-[#FF6A00] transition-colors">Онлайн-калькулятор ремонта</a></li>
              <li><a href="#before-after" className="hover:text-[#FF6A00] transition-colors">Сравнение До и После</a></li>
              <li><a href="#portfolio" className="hover:text-[#FF6A00] transition-colors">Сданные объекты в ЖК</a></li>
              <li><a href="#geomap" className="hover:text-[#FF6A00] transition-colors">Зоны выезда по Казани</a></li>
              <li><a href="#reviews" className="hover:text-[#FF6A00] transition-colors">Отзывы заказчиков</a></li>
            </ul>
          </div>

          {/* Services Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Популярные услуги
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>Ремонт квартир в новостройках от 2 500 ₽/м²</li>
              <li>Капитальный ремонт под ключ от 3 000 ₽/м²</li>
              <li>Косметический ремонт от 1 500 ₽/м²</li>
              <li>Ремонт ванных комнат и санузлов</li>
              <li>Сантехника и электрика под ключ</li>
              <li>Устройство фундаментов и фасадов</li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Контакты в Казани
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${KAZAN_BASE_ADDRESS.rawPhone}`}
                className="flex items-center gap-2 text-white hover:text-[#FF6A00] font-black text-base transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FF6A00]" />
                <span>{KAZAN_BASE_ADDRESS.phone}</span>
              </a>

              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-[#FF6A00] shrink-0" />
                <span>{KAZAN_BASE_ADDRESS.city}, {KAZAN_BASE_ADDRESS.street}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4 text-[#FF6A00] shrink-0" />
                <span>{KAZAN_BASE_ADDRESS.workHours}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent('Здравствуйте! Обращаюсь с сайта КазаньСтрой Ремонт.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={onOpenMax}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#222834] hover:bg-[#FF6A00] text-amber-300 hover:text-white font-bold text-xs border border-[#343D4E] transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
                <span>Связь MAX</span>
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Legal & 152-FZ */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center md:text-left">
          <div>
            © 2016–2026 «КазаньСтрой Ремонт». Все права защищены.
            <div className="text-[11px] text-gray-600 mt-1">
              Информация на сайте не является публичной офертой (ст. 437 ГК РФ). Окончательная стоимость определяется сметой.
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/policy.html"
              target="_blank"
              className="text-gray-400 hover:text-white underline transition-colors"
            >
              Политика конфиденциальности (152-ФЗ)
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
