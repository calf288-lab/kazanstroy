import React, { useState } from 'react';
import { KAZAN_DISTRICTS, KAZAN_BASE_ADDRESS } from '../data/districtsData';
import { MapPin, Navigation, Clock, CheckCircle2, Phone, MessageCircle, ExternalLink } from 'lucide-react';

interface KazanGeoMapProps {
  onOpenConsultation: (districtName?: string) => void;
}

export const KazanGeoMap: React.FC<KazanGeoMapProps> = ({ onOpenConsultation }) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('sovetsky');

  const selectedDistrict = KAZAN_DISTRICTS.find((d) => d.id === selectedDistrictId) || KAZAN_DISTRICTS[0];

  return (
    <section id="geomap" className="py-16 sm:py-24 bg-[#12151B] border-b border-[#242A34] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F2530] border border-[#2E3645] text-xs font-bold text-[#FF6A00] mb-3">
            <Navigation className="w-3.5 h-3.5" />
            География выездов по Казани
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Работаем во всех районах Казани <span className="text-[#FF6A00]">и пригороде до 50 км</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-2">
            База и склад инструмента расположены на ул. Юлиуса Фучика, 90А. Бригадир выезжает на бесплатный замер в день обращения.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Districts List Column */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Выберите ваш район или пригород:
            </div>

            {KAZAN_DISTRICTS.map((district) => {
              const isSelected = district.id === selectedDistrictId;
              return (
                <div
                  key={district.id}
                  onClick={() => setSelectedDistrictId(district.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1D232F] border-[#FF6A00] shadow-lg shadow-[#FF6A00]/10 ring-1 ring-[#FF6A00]'
                      : 'bg-[#161921] border-[#272D38] hover:border-gray-500 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                      isSelected ? 'bg-[#FF6A00] text-white' : 'bg-[#222732] text-gray-400'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-white text-sm sm:text-base">
                        {district.name}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {district.baseRadius}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/25">
                      <Clock className="w-3 h-3" />
                      ~{district.etaMinutes} мин
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* District Details & Map Display Column */}
          <div className="lg:col-span-7 bg-[#171A22] border border-[#2B3240] rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Visual Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#262C38]">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6A00]">
                  Выбранный сектор:
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {selectedDistrict.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Время выезда инженера-замерщика: <strong className="text-white font-bold">до {selectedDistrict.etaMinutes} минут</strong>
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenConsultation(`Выезд в ${selectedDistrict.name}`)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#FF6A00] hover:bg-[#E55F00] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-[#FF6A00]/25 transition-all"
                >
                  Вызвать мастера в этот район
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-200 leading-relaxed">
              {selectedDistrict.description}
            </p>

            {/* Popular streets in this district */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Популярные улицы и жилые комплексы в работе:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedDistrict.popularStreets.map((street, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#202530] text-gray-300 px-3 py-1.5 rounded-lg border border-[#2E3645]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6A00]" />
                    {street}
                  </span>
                ))}
              </div>
            </div>

            {/* Suburbs if present */}
            {selectedDistrict.suburbs && selectedDistrict.suburbs.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Охватываемые поселки и микрорайоны:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedDistrict.suburbs.map((sub, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-[#13161C] text-gray-400 px-2.5 py-1 rounded-md border border-[#242A34]"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Base info banner */}
            <div className="bg-[#12151B] border border-[#29303D] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF6A00] animate-pulse" />
                  <span>Главная база: {KAZAN_BASE_ADDRESS.street} ({KAZAN_BASE_ADDRESS.city})</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  {KAZAN_BASE_ADDRESS.workHours} · Подача бригады и инструмента собственным транспортом
                </p>
              </div>

              <a
                href="https://yandex.ru/maps/43/kazan/house/ulitsa_yuliusa_fuchika_90a/YEwYdgdmSkEOQFtvfXt2cXliYw==/?ll=49.231940%2C55.753300&z=17"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6A00] hover:text-amber-300 transition-colors"
              >
                <span>Точка на Яндекс.Картах</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
