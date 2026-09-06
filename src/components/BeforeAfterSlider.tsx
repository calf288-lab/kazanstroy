import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, CheckCircle, Sparkles, MessageCircle } from 'lucide-react';
import { KAZAN_BASE_ADDRESS } from '../data/districtsData';

interface BeforeAfterSliderProps {
  onOpenConsultation: (topic?: string) => void;
}

interface CaseItem {
  id: string;
  title: string;
  location: string;
  duration: string;
  cost: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  tags: string[];
}

const CASES: CaseItem[] = [
  {
    id: 'case-1',
    title: 'Капитальный ремонт гостиной в ЖК «Арт Сити»',
    location: 'Казань, Советский район',
    duration: '34 дня',
    cost: '290 000 ₽',
    beforeImg: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    description: 'От голого бетона застройщика до чистового интерьера с скрытой подсветкой, теневым плинтусом и кварцвинилом.',
    tags: ['Штукатурка по маякам', 'Электрика 48 точек', 'Кварцвинил', 'Теневой профиль']
  },
  {
    id: 'case-2',
    title: 'Санузел под ключ в ЖК «Столичный»',
    location: 'Казань, ул. Чистопольская',
    duration: '14 дней',
    cost: '145 000 ₽',
    beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
    description: 'Полная замена труб на Rehau, инсталляция, запил керамогранита под 45 градусов, скрытый ревизионный люк.',
    tags: ['Запил 45°', 'Трубы Rehau', 'Инсталляция', 'Теплый пол']
  },
  {
    id: 'case-3',
    title: 'Кухня-столовая в частном доме в пос. Салмачи',
    location: 'Казань, пос. Салмачи',
    duration: '22 дня',
    cost: '210 000 ₽',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Водяной теплый пол, плитка крупного формата, разводка розеток под кухонную технику, монтаж натяжного потолка.',
    tags: ['Водяной пол', 'Крупный формат', 'Фартук из плитки', 'Вентиляция']
  }
];

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onOpenConsultation }) => {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASES[activeCaseIdx];

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="before-after" className="py-16 sm:py-24 bg-[#0E1015] border-b border-[#242A34] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C212B] border border-[#2D3544] text-xs font-bold text-[#FF6A00] mb-3">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Интерактивное сравнение
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Посмотрите результаты работы: <span className="text-[#FF6A00]">До и После</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-2 max-w-xl">
              Потяните ползунок в центре фотографии, чтобы оценить качество черновых и чистовых работ наших мастеров.
            </p>
          </div>

          {/* Case switcher tabs */}
          <div className="flex flex-wrap gap-2">
            {CASES.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveCaseIdx(idx);
                  setSliderPosition(50);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  activeCaseIdx === idx
                    ? 'bg-[#FF6A00] text-white border-[#FF6A00] shadow-md shadow-[#FF6A00]/25'
                    : 'bg-[#181C23] text-gray-300 border-[#2D3442] hover:border-gray-500'
                }`}
              >
                {c.title.split(' в ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* The Interactive Slider Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full h-[320px] sm:h-[450px] md:h-[500px] rounded-2xl overflow-hidden cursor-ew-resize select-none border-2 border-[#2C3340] shadow-2xl bg-black"
            >
              {/* "AFTER" Image (Full background) */}
              <img
                src={activeCase.afterImg}
                alt={`${activeCase.title} - После ремонта`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/1200x800/181b22/ff6a00?text=ПОСЛЕ+РЕМОНТА';
                }}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-md text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider z-20 shadow-lg">
                ПОСЛЕ РЕМОНТА ✨
              </div>

              {/* "BEFORE" Image (Clipped overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeCase.beforeImg}
                  alt={`${activeCase.title} - До ремонта`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/1200x800/22252c/ffffff?text=ДО+РЕМОНТА';
                  }}
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                    height: '100%'
                  }}
                  draggable={false}
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-gray-300 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider z-20 shadow-lg border border-gray-700">
                  ДО РЕМОНТА
                </div>
              </div>

              {/* Slider Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-30 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Round drag handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FF6A00] border-2 border-white text-white flex items-center justify-center shadow-2xl shadow-black/80">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>

              {/* Instructions banner at bottom */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] text-gray-300 pointer-events-none z-20 border border-gray-800">
                ↔ Тяните влево / вправо для сравнения
              </div>
            </div>
          </div>

          {/* Project Details Panel */}
          <div className="lg:col-span-4 space-y-5 bg-[#161A22] border border-[#29303D] rounded-2xl p-6">
            <div>
              <span className="text-xs font-semibold text-[#FF6A00]">{activeCase.location}</span>
              <h3 className="text-xl font-black text-white mt-1 leading-snug">
                {activeCase.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                {activeCase.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2 border-y border-[#262C38]">
              <div>
                <span className="text-[11px] text-gray-400 block">Срок работ:</span>
                <span className="text-base font-extrabold text-white">{activeCase.duration}</span>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 block">Стоимость работ:</span>
                <span className="text-base font-extrabold text-[#FF6A00]">{activeCase.cost}</span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <div className="text-xs font-bold text-gray-400 mb-2">Выполненные этапы:</div>
              <div className="flex flex-wrap gap-1.5">
                {activeCase.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#1F242F] text-gray-300 px-2.5 py-1 rounded-lg border border-[#2E3544]"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA inside Case */}
            <div className="pt-2 space-y-2">
              <a
                href={`https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent(`Здравствуйте! Понравился проект «${activeCase.title}» на вашем сайте. Хочу узнать точную стоимость аналогичного ремонта для моей квартиры.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold bg-[#FF6A00] hover:bg-[#E05300] text-white flex items-center justify-center gap-2 shadow-lg shadow-[#FF6A00]/25 transition-all text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Хочу такой же ремонт</span>
              </a>

              <button
                type="button"
                onClick={() => onOpenConsultation(`Проект: ${activeCase.title}`)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-gray-400 hover:text-white bg-[#1C2028] hover:bg-[#232934] border border-[#2B3240] transition-colors"
              >
                Задать вопрос бригадиру
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
