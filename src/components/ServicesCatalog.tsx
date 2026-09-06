import React, { useState } from 'react';
import { SERVICES_LIST, CATEGORIES } from '../data/servicesData';
import { Home, Paintbrush, Droplets, Zap, Hammer, Wrench, MessageCircle, ArrowUpRight, Search, Check } from 'lucide-react';
import { KAZAN_BASE_ADDRESS } from '../data/districtsData';

interface ServicesCatalogProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({ onOpenConsultation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('flats');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-4 h-4" />;
      case 'Paintbrush': return <Paintbrush className="w-4 h-4" />;
      case 'Droplets': return <Droplets className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Hammer': return <Hammer className="w-4 h-4" />;
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  const filteredServices = SERVICES_LIST.filter((s) => {
    const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#111317] border-b border-[#242A34] relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C212B] border border-[#2B3444] text-xs font-bold text-[#FF6A00] mb-3">
            Прайс-лист на работы 2026 года
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Все виды строительных и <span className="text-[#FF6A00]">отделочных работ в Казани</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-2">
            Прозрачные расценки, опытные профильные мастера, работа по официальному договору подряда с гарантией.
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск услуги (сантехника, штукатурка, стяжка...)"
              className="w-full bg-[#171B23] border border-[#2B3240] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6A00] transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border shrink-0 ${
              activeCategory === 'all'
                ? 'bg-[#FF6A00] text-white border-[#FF6A00] shadow-md shadow-[#FF6A00]/20'
                : 'bg-[#181C23] text-gray-300 border-[#2A313E] hover:border-gray-500 hover:text-white'
            }`}
          >
            Все услуги ({SERVICES_LIST.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#FF6A00] text-white border-[#FF6A00] shadow-md shadow-[#FF6A00]/20'
                  : 'bg-[#181C23] text-gray-300 border-[#2A313E] hover:border-gray-500 hover:text-white'
              }`}
            >
              {getCategoryIcon(cat.icon)}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#171A21] border border-[#29303D] hover:border-[#FF6A00]/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 group relative"
            >
              {service.popular && (
                <span className="absolute top-4 right-4 text-[10px] font-extrabold uppercase tracking-wider bg-[#FF6A00]/15 text-[#FF6A00] px-2 py-0.5 rounded-md border border-[#FF6A00]/30">
                  Популярно
                </span>
              )}

              <div>
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#FF8533] transition-colors pr-16 leading-snug">
                  {service.name}
                </h3>

                <div className="mt-3 mb-2 flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl font-black text-[#FF6A00]">
                    {service.price}
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    / {service.unit}
                  </span>
                </div>

                {service.description && (
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed mt-2">
                    {service.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-[#252C38] flex items-center gap-2">
                <a
                  href={`https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent(`Здравствуйте! Интересует услуга: «${service.name}» (${service.price}/${service.unit}). Подскажите сроки и стоимость для моего объекта в Казани.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>В WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenConsultation(`Услуга: ${service.name}`)}
                  className="p-2.5 rounded-xl bg-[#222732] hover:bg-[#2B3240] text-gray-300 hover:text-white border border-[#313845] transition-colors"
                  title="Заказать замер или консультацию"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="py-12 text-center text-gray-400 bg-[#171B22] rounded-2xl border border-[#272E3A]">
            <p className="text-base font-semibold">По вашему запросу услуг не найдено.</p>
            <p className="text-xs text-gray-400 mt-1">Позвоните нам по телефону +7 950 969-97-20 или напишите в WhatsApp — мы рассчитаем любые нестандартные строительные задачи!</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#FF6A00] text-white text-xs font-bold"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#1E242F] to-[#171B22] border border-[#2D3544] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-extrabold text-white">
              Не нашли нужную строительную услугу в списке?
            </h4>
            <p className="text-xs sm:text-sm text-gray-300">
              Выполняем любые нестандартные задачи: алмазное бурение, гидроизоляцию фундаментов, монтаж металлоконструкций, кладку перегородок.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${KAZAN_BASE_ADDRESS.rawPhone}`}
              className="px-5 py-3 rounded-xl bg-[#232935] hover:bg-[#2C3443] border border-[#373F50] text-white text-xs sm:text-sm font-bold transition-colors"
            >
              {KAZAN_BASE_ADDRESS.phone}
            </a>
            <a
              href={`https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent('Здравствуйте! У меня нестандартная строительная задача в Казани. Можете помочь?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#FF6A00] hover:bg-[#E55F00] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#FF6A00]/25 transition-all"
            >
              Спросить в WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
