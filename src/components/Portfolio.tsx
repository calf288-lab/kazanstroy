import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { MapPin, Clock, Coins, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { KAZAN_BASE_ADDRESS } from '../data/districtsData';

interface PortfolioProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenConsultation }) => {
  const [filter, setFilter] = useState<'all' | 'flat' | 'house' | 'bath' | 'commercial'>('all');

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-[#0F1116] border-b border-[#242A34] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C212B] border border-[#2B3444] text-xs font-bold text-[#FF6A00] mb-3">
              Реализованные объекты в Казани
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Наши работы в <span className="text-[#FF6A00]">жилых комплексах Казани</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-2 max-w-xl">
              Фотографии с реальных объектов. По предварительной договоренности можем показать текущий объект в работе в вашем районе.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Все объекты' },
              { id: 'flat', label: 'Квартиры в ЖК' },
              { id: 'house', label: 'Коттеджи' },
              { id: 'bath', label: 'Санузлы' },
              { id: 'commercial', label: 'Коммерция' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  filter === f.id
                    ? 'bg-[#FF6A00] text-white border-[#FF6A00] shadow-md shadow-[#FF6A00]/25'
                    : 'bg-[#181C23] text-gray-300 border-[#2C3341] hover:border-gray-500'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#161921] border border-[#272E3A] hover:border-[#FF6A00]/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60 group"
            >
              <div>
                {/* Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-[#101217]">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/181b22/ff6a00?text=Ремонт+в+Казани';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161921] via-transparent to-black/20" />
                  
                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-gray-700/60 text-[11px] font-bold text-gray-200 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#FF6A00]" />
                    {project.location}
                  </div>

                  <div className="absolute top-3 right-3 bg-[#FF6A00] text-white px-2.5 py-1 rounded-lg text-xs font-black shadow-lg">
                    {project.area} м²
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#FF8533] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Metrics bar */}
                  <div className="grid grid-cols-2 gap-2 my-3 py-2.5 px-3 bg-[#111319] rounded-xl border border-[#242A36] text-xs">
                    <div>
                      <span className="text-gray-400 block text-[11px]">Срок:</span>
                      <span className="font-extrabold text-white">{project.durationDays} дней</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[11px]">Стоимость работ:</span>
                      <span className="font-extrabold text-[#FF6A00]">{project.cost}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Works list preview */}
                  <div className="mt-3 pt-3 border-t border-[#232833] space-y-1">
                    {project.worksDone.slice(0, 3).map((w, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-gray-400">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-2">
                <a
                  href={`https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent(`Здравствуйте! Понравился проект «${project.title}». Можете рассчитать смету для моей квартиры?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#202530] hover:bg-[#FF6A00] text-gray-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-[#2E3644] hover:border-[#FF6A00] transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Узнать стоимость такого ремонта</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
