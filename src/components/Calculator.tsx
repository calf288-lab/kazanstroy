import React, { useState, useId } from 'react';
import { Calculator as CalcIcon, MessageCircle, Calendar, Sparkles, Check, Info, ShieldCheck } from 'lucide-react';
import { KAZAN_BASE_ADDRESS } from '../data/districtsData';

interface CalculatorProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onOpenConsultation }) => {
  const [area, setArea] = useState<number>(54);
  const [propertyType, setPropertyType] = useState<'новостройка' | 'вторичка' | 'дом' | 'ванная' | 'офис'>('новостройка');
  const [renovationRate, setRenovationRate] = useState<number>(3000); // 1500, 2500, 3000, 8000
  const [renovationName, setRenovationName] = useState<string>('Капитальный ремонт');

  // Checkboxes
  const [includePlumbing, setIncludePlumbing] = useState<boolean>(true); // 30000
  const [includeElectric, setIncludeElectric] = useState<boolean>(true); // 30000
  const [includeWarmFloor, setIncludeWarmFloor] = useState<boolean>(false); // 15000
  const [includeWelding, setIncludeWelding] = useState<boolean>(false); // 5000
  const [includeDemolition, setIncludeDemolition] = useState<boolean>(false); // 12000
  const [includeGarbageRemoval, setIncludeGarbageRemoval] = useState<boolean>(true); // 6000

  // 152-FZ
  const [agreeFz, setAgreeFz] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>('');

  const calcAreaId = useId();

  // Price calculation
  let baseWorks = area * renovationRate;
  if (includePlumbing) baseWorks += 30000;
  if (includeElectric) baseWorks += 30000;
  if (includeWarmFloor) baseWorks += 15000;
  if (includeWelding) baseWorks += 5000;
  if (includeDemolition) baseWorks += 12000;
  if (includeGarbageRemoval) baseWorks += 6000;

  // Approximate duration calculation
  let estimatedDays = Math.max(12, Math.round(area * 0.55));
  if (renovationRate >= 8000) estimatedDays = Math.round(area * 0.9);
  if (renovationRate <= 1500) estimatedDays = Math.round(area * 0.35);

  const handleRenovationTypeChange = (rate: number, name: string) => {
    setRenovationRate(rate);
    setRenovationName(name);
  };

  // Generate WhatsApp message
  const generateWhatsAppUrl = () => {
    const options: string[] = [];
    if (includePlumbing) options.push('Сантехника под ключ');
    if (includeElectric) options.push('Электрика под ключ');
    if (includeWarmFloor) options.push('Теплые полы');
    if (includeWelding) options.push('Сварочные работы');
    if (includeDemolition) options.push('Демонтаж');
    if (includeGarbageRemoval) options.push('Вывоз мусора');

    const msg = `Здравствуйте! Рассчитал стоимость на сайте КазаньСтрой Ремонт:
• Объект: ${propertyType}, площадь: ${area} м²
• Тип ремонта: ${renovationName} (${renovationRate.toLocaleString('ru-RU')} ₽/м²)
• Дополнительно: ${options.length > 0 ? options.join(', ') : 'Без доп. опций'}
• Предварительная смета: ~${baseWorks.toLocaleString('ru-RU')} ₽
• Срок: ~${estimatedDays} дн.
${phone ? `• Мой телефон: ${phone}` : ''}
Хочу зафиксировать скидку 10% и записаться на бесплатный замер.`;

    return `https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-[#12151B] border-b border-[#242A34] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F2530] border border-[#2E3645] text-xs font-bold text-[#FF6A00] mb-3">
            <CalcIcon className="w-3.5 h-3.5" />
            Онлайн-калькулятор сметы
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Рассчитайте стоимость ремонта <span className="text-[#FF6A00]">в Казани за 30 секунд</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-2">
            Прозрачные расценки без скрытых наценок. Итоговая смета фиксируется в официальном договоре.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#171B23] border border-[#2B3240] rounded-2xl p-6 sm:p-8 space-y-7 shadow-xl">
            
            {/* 1. Property Type */}
            <div>
              <label className="block text-sm font-extrabold text-white mb-3">
                1. Тип вашего объекта в Казани
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'новостройка', label: 'Новостройка' },
                  { id: 'вторичка', label: 'Вторичное жилье' },
                  { id: 'дом', label: 'Дом / Коттедж' },
                  { id: 'ванная', label: 'Санузел / Ванная' },
                  { id: 'офис', label: 'Офис / Коммерция' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPropertyType(item.id as any)}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${
                      propertyType === item.id
                        ? 'bg-[#FF6A00] text-white border-[#FF6A00] shadow-md shadow-[#FF6A00]/20'
                        : 'bg-[#11141A] text-gray-300 border-[#2A313E] hover:border-gray-500 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={calcAreaId} className="text-sm font-extrabold text-white">
                  2. Площадь помещения по полу
                </label>
                <div className="flex items-center gap-1.5 bg-[#101318] px-3.5 py-1.5 rounded-xl border border-[#2B3340]">
                  <input
                    type="number"
                    id={calcAreaId}
                    min="10"
                    max="500"
                    value={area}
                    onChange={(e) => setArea(Math.max(1, Number(e.target.value)))}
                    className="w-16 bg-transparent text-right font-black text-lg text-[#FF6A00] focus:outline-none"
                  />
                  <span className="text-sm font-bold text-gray-300">м²</span>
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="15"
                max="250"
                step="1"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2.5 bg-[#252C38] rounded-lg appearance-none cursor-pointer accent-[#FF6A00]"
              />

              {/* Quick Area presets */}
              <div className="flex items-center justify-between text-xs text-gray-400 mt-2 px-1">
                <span>15 м² (студия)</span>
                <span>45 м² (1-к)</span>
                <span>65 м² (2-к)</span>
                <span>85 м² (3-к)</span>
                <span>150+ м² (дом)</span>
              </div>
            </div>

            {/* 3. Renovation Tier */}
            <div>
              <label className="block text-sm font-extrabold text-white mb-3">
                3. Категория ремонта
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    rate: 1500,
                    name: 'Косметический ремонт',
                    tag: 'Быстро и экономно',
                    desc: 'Обои, ламинат/линолеум, покраска потолков, замена выключателей.'
                  },
                  {
                    rate: 2500,
                    name: 'В новостройке с нуля',
                    tag: 'Хит новостроек Казани',
                    desc: 'Подготовка поверхностей, разводка инженерии, чистовая отделка.'
                  },
                  {
                    rate: 3000,
                    name: 'Капитальный ремонт',
                    tag: 'Самый популярный',
                    desc: 'Демонтаж, стяжка, штукатурка по маякам, электрика, сантехника, плитка.'
                  },
                  {
                    rate: 8000,
                    name: 'Премиальный / Дизайнерский',
                    tag: 'Люкс под ключ',
                    desc: 'Сложный дизайн-проект, скрытый плинтус, керамогранит, умный свет.'
                  },
                ].map((tier) => (
                  <div
                    key={tier.rate}
                    onClick={() => handleRenovationTypeChange(tier.rate, tier.name)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all relative ${
                      renovationRate === tier.rate
                        ? 'bg-[#1C222C] border-[#FF6A00] ring-1 ring-[#FF6A00]'
                        : 'bg-[#11141A] border-[#29303D] hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00] bg-[#FF6A00]/10 px-2 py-0.5 rounded">
                        {tier.tag}
                      </span>
                      <span className="font-extrabold text-white text-sm">
                        от {tier.rate.toLocaleString('ru-RU')} ₽/м²
                      </span>
                    </div>
                    <div className="font-bold text-white text-sm mt-1">{tier.name}</div>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{tier.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Additional Packages */}
            <div>
              <label className="block text-sm font-extrabold text-white mb-3">
                4. Дополнительные инженерные и специализированные работы
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { state: includePlumbing, setter: setIncludePlumbing, title: 'Сантехника под ключ', price: '+ от 30 000 ₽' },
                  { state: includeElectric, setter: setIncludeElectric, title: 'Электромонтаж под ключ', price: '+ от 30 000 ₽' },
                  { state: includeWarmFloor, setter: setIncludeWarmFloor, title: 'Монтаж теплого пола', price: '+ от 15 000 ₽' },
                  { state: includeWelding, setter: setIncludeWelding, title: 'Сварочные работы', price: '+ от 5 000 ₽' },
                  { state: includeDemolition, setter: setIncludeDemolition, title: 'Демонтаж перегородок/плитки', price: '+ от 12 000 ₽' },
                  { state: includeGarbageRemoval, setter: setIncludeGarbageRemoval, title: 'Вывоз строительного мусора', price: '+ от 6 000 ₽' },
                ].map((item, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs font-semibold select-none transition-colors ${
                      item.state
                        ? 'bg-[#1D232E] border-[#FF6A00]/60 text-white'
                        : 'bg-[#11141A] border-[#282F3B] text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        item.state ? 'bg-[#FF6A00] border-[#FF6A00] text-white' : 'border-gray-600 bg-transparent'
                      }`}>
                        {item.state && <Check className="w-3 h-3" />}
                      </div>
                      <span>{item.title}</span>
                    </div>
                    <span className="text-[#FF6A00] font-bold text-[11px]">{item.price}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Total Output Column */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-gradient-to-b from-[#1E232E] to-[#161921] border-2 border-[#FF6A00]/50 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#2F3746]">
                <div>
                  <span className="text-xs font-semibold text-gray-400">Предварительная смета</span>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-0.5">
                    {baseWorks.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-gray-400">Срок выполнения</span>
                  <div className="text-lg font-black text-[#FF6A00] mt-0.5">
                    ~{estimatedDays} дней
                  </div>
                </div>
              </div>

              {/* Breakdown details */}
              <div className="py-4 space-y-2 text-xs border-b border-[#2F3746]">
                <div className="flex justify-between text-gray-300">
                  <span>Базовая отделка ({area} м² × {renovationRate.toLocaleString('ru-RU')} ₽):</span>
                  <span className="font-bold text-white">{(area * renovationRate).toLocaleString('ru-RU')} ₽</span>
                </div>
                {includePlumbing && (
                  <div className="flex justify-between text-gray-300">
                    <span>Сантехника под ключ:</span>
                    <span className="font-bold text-white">30 000 ₽</span>
                  </div>
                )}
                {includeElectric && (
                  <div className="flex justify-between text-gray-300">
                    <span>Электромонтаж под ключ:</span>
                    <span className="font-bold text-white">30 000 ₽</span>
                  </div>
                )}
                {includeWarmFloor && (
                  <div className="flex justify-between text-gray-300">
                    <span>Теплые полы:</span>
                    <span className="font-bold text-white">15 000 ₽</span>
                  </div>
                )}
                {includeWelding && (
                  <div className="flex justify-between text-gray-300">
                    <span>Сварочные работы:</span>
                    <span className="font-bold text-white">5 000 ₽</span>
                  </div>
                )}
                {includeDemolition && (
                  <div className="flex justify-between text-gray-300">
                    <span>Демонтаж:</span>
                    <span className="font-bold text-white">12 000 ₽</span>
                  </div>
                )}
                {includeGarbageRemoval && (
                  <div className="flex justify-between text-gray-300">
                    <span>Вывоз строительного мусора:</span>
                    <span className="font-bold text-white">6 000 ₽</span>
                  </div>
                )}
              </div>

              {/* Bonus banner */}
              <div className="my-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200">
                  <strong className="text-amber-300 font-bold block">Бонус за отправку в WhatsApp:</strong>
                  Скидка 10% на чистовые работы + бесплатный выезд замерщика с лазерным дальномером по Казани.
                </div>
              </div>

              {/* Phone input optional for prefill */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Ваш телефон для связи (необязательно):
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-[#11141A] border border-[#2E3542] rounded-xl px-3.5 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              {/* 152-FZ Mandate */}
              <div className="mb-4">
                <label className="flex items-start gap-2 text-[11px] text-gray-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeFz}
                    onChange={(e) => setAgreeFz(e.target.checked)}
                    className="mt-0.5 rounded border-gray-600 text-[#FF6A00] focus:ring-[#FF6A00] bg-[#11141A]"
                  />
                  <span>
                    Согласен на обработку данных по <a href="/policy.html" target="_blank" className="text-[#FF6A00] underline">152-ФЗ</a>
                  </span>
                </label>
              </div>

              {/* Main WA button */}
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-xl font-black text-sm sm:text-base text-white flex items-center justify-center gap-2 shadow-xl transition-all ${
                  agreeFz
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-emerald-900/40 hover:-translate-y-0.5'
                    : 'bg-gray-600 cursor-not-allowed opacity-50'
                }`}
                onClick={(e) => {
                  if (!agreeFz) e.preventDefault();
                }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Отправить расчет в WhatsApp</span>
              </a>

              {/* Secondary button: Call measurement */}
              <button
                type="button"
                onClick={() => onOpenConsultation(`Расчет на ${area} м² (${renovationName})`)}
                className="w-full mt-2.5 py-3 rounded-xl font-bold text-xs sm:text-sm text-gray-300 hover:text-white bg-[#222732] hover:bg-[#2A313E] border border-[#343B48] flex items-center justify-center gap-2 transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#FF6A00]" />
                <span>Вызвать замерщика на объект (0 ₽)</span>
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400 text-center">
                <Info className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>Точная смета составляется бесплатно после очного замера</span>
              </div>
            </div>

            {/* Guarantee note */}
            <div className="bg-[#151820] border border-[#272D38] p-4 rounded-xl flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div className="text-xs text-gray-300 leading-snug">
                <strong>Цена в смете фиксируется в договоре.</strong> Никаких непредвиденных доплат в процессе ремонта.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
