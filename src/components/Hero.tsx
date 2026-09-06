import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Calculator, ArrowRight, MessageCircle, Phone, Star, MapPin, Sparkles } from 'lucide-react';
import { KAZAN_BASE_ADDRESS } from '../data/districtsData';

interface HeroProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const [quickPhone, setQuickPhone] = useState('');
  const [quickArea, setQuickArea] = useState('55');
  const [quickType, setQuickType] = useState('Капитальный ремонт');
  const [agreeFz, setAgreeFz] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeFz || !quickPhone) return;

    // Send to WhatsApp directly
    const text = `Здравствуйте! Заявка на экспресс-расчет с сайта КазаньСтрой Ремонт.
Площадь: ${quickArea} м²
Тип ремонта: ${quickType}
Телефон для связи: ${quickPhone}
Хочу получить предварительную смету и зафиксировать скидку 10%.`;

    const waUrl = `https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    setIsSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#222731] bg-gradient-to-b from-[#14171E] via-[#111317] to-[#0E1014]">
      {/* Subtle ambient lighting mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-[#FF6A00]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-[-100px] w-[400px] h-[350px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Geo badge & trust tag */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1F242C] border border-[#313845] text-xs font-semibold text-gray-200 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>Казань и пригород в радиусе 50 км</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 рейтинг на Яндекс.Услугах · 10+ лет опыта</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Выезд замерщика сегодня — 0 ₽</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Ремонт квартир и домов <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] via-[#FF8533] to-amber-400">под ключ в Казани</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-300 mt-2">
                от 1 500 ₽/м² с гарантией 3 года
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl font-normal leading-relaxed">
              Слаженная русскоязычная бригада мастеров со своим профессиональным инструментом. 
              Фиксируем смету в договоре, берем оплату <strong className="text-white font-semibold">поэтапно по факту сдачи</strong> и экономим до 20% на материалах на базах Казани.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                { title: 'Фиксированная цена в договоре', sub: 'Смета не вырастет ни на рубль' },
                { title: 'Оплата без авансов за работу', sub: 'Платите частями за принятые этапы' },
                { title: 'Закупка со скидкой до 20%', sub: 'Оптовые цены в Леруа и Мегастрое' },
                { title: 'Фото/видео отчеты в WhatsApp', sub: 'Контролируйте ремонт удаленно' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-[#171A21]/70 border border-[#262C36] p-2.5 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#FF6A00] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">{item.title}</div>
                    <div className="text-[11px] text-gray-400 leading-tight mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-extrabold bg-gradient-to-r from-[#FF6A00] to-[#E65300] hover:from-[#FF7A1A] hover:to-[#FF6000] text-white shadow-xl shadow-[#FF6A00]/25 transition-all hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <Calculator className="w-5 h-5" />
                <span>Рассчитать смету онлайн</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent('Здравствуйте! Хочу узнать стоимость ремонта в Казани. Подскажите, когда возможен замер?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-base font-bold bg-[#1F252E] hover:bg-[#282F3B] text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 transition-all hover:-translate-y-0.5 text-center"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>Заявка в WhatsApp</span>
              </a>

              <button
                onClick={() => onOpenConsultation('Вызов инженера-замерщика')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-4 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-[#1E232B] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FF6A00]" />
                <span>Заказать звонок</span>
              </button>
            </div>

            {/* Mini trust stats strip */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#232832] text-xs sm:text-sm text-gray-400">
              <div>
                <span className="text-lg sm:text-xl font-black text-white">280+</span>
                <span className="ml-1.5 text-gray-400">объектов сдано</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600 hidden sm:block" />
              <div>
                <span className="text-lg sm:text-xl font-black text-white">3 года</span>
                <span className="ml-1.5 text-gray-400">гарантия по договору</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600 hidden sm:block" />
              <div>
                <span className="text-lg sm:text-xl font-black text-[#FF6A00]">0 ₽</span>
                <span className="ml-1.5 text-gray-400">замер и смета</span>
              </div>
            </div>

          </div>

          {/* Quick Quiz / Lead Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#181C23] border-2 border-[#2F3642] rounded-2xl p-6 sm:p-7 shadow-2xl shadow-black/40 relative">
              {/* Badge */}
              <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-amber-500 to-[#FF6A00] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Бонус за заявку с сайта
              </div>

              <div className="mt-1 mb-5">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  Узнайте точную стоимость за 60 секунд
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Ответьте на 2 вопроса и получите <strong className="text-amber-400 font-semibold">скидку 10% на работы</strong> + бесплатный расчет сметы в WhatsApp.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-extrabold text-white">Заявка отправлена в WhatsApp!</h4>
                  <p className="text-sm text-gray-300">
                    Бригадир уже формирует предварительную смету для вашей площади. Если диалог не открылся автоматически, нажмите кнопку ниже:
                  </p>
                  <a
                    href={`https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent('Здравствуйте! Я отправил заявку на сайте. Хочу получить смету.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-700/30"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Открыть диалог в WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  {/* Select type */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Тип ремонта или услуги
                    </label>
                    <select
                      value={quickType}
                      onChange={(e) => setQuickType(e.target.value)}
                      className="w-full bg-[#11141A] border border-[#2E3542] rounded-xl px-3.5 py-3 text-sm text-white font-medium focus:outline-none focus:border-[#FF6A00] transition-colors"
                    >
                      <option value="Капитальный ремонт">Капитальный ремонт квартиры (от 3 000 ₽/м²)</option>
                      <option value="Косметический ремонт">Косметический ремонт (от 1 500 ₽/м²)</option>
                      <option value="Ремонт в новостройке">Ремонт в новостройке под ключ (от 2 500 ₽/м²)</option>
                      <option value="Ремонт ванной и санузла">Ремонт ванной / санузла под ключ</option>
                      <option value="Сантехника и электрика">Сантехник + электрик под ключ</option>
                      <option value="Отделка коттеджа / дома">Отделка коттеджа / дома</option>
                      <option value="Фундаменты и бетон">Фундаменты и бетонные работы</option>
                      <option value="Сварочные работы / мастер">Сварочные работы / мастер на час</option>
                    </select>
                  </div>

                  {/* Area input */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-300 mb-1.5">
                      <span>Примерная площадь: <strong className="text-[#FF6A00] text-sm">{quickArea} м²</strong></span>
                      <span className="text-gray-400 text-[11px]">(или укажите вручную)</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 mb-2">
                      {['35', '55', '75', '110'].map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setQuickArea(a)}
                          className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                            quickArea === a
                              ? 'bg-[#FF6A00] text-white border-[#FF6A00]'
                              : 'bg-[#12151B] text-gray-300 border-[#2A313C] hover:border-gray-500'
                          }`}
                        >
                          {a} м²
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={quickArea}
                      onChange={(e) => setQuickArea(e.target.value)}
                      placeholder="Площадь в м²"
                      className="w-full bg-[#11141A] border border-[#2E3542] rounded-xl px-3.5 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-[#FF6A00] transition-colors"
                    />
                  </div>

                  {/* Phone input */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Ваш телефон для расчета <span className="text-[#FF6A00]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-[#11141A] border border-[#2E3542] rounded-xl px-3.5 py-3 text-sm text-white placeholder-gray-500 font-bold focus:outline-none focus:border-[#FF6A00] transition-colors"
                    />
                  </div>

                  {/* 152-FZ Mandate Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 text-[11px] text-gray-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        required
                        checked={agreeFz}
                        onChange={(e) => setAgreeFz(e.target.checked)}
                        className="mt-0.5 rounded border-gray-600 text-[#FF6A00] focus:ring-[#FF6A00] bg-[#11141A]"
                      />
                      <span>
                        Согласен на обработку персональных данных согласно{' '}
                        <a href="/policy.html" target="_blank" className="text-[#FF6A00] underline hover:text-amber-400">
                          политике конфиденциальности (152-ФЗ)
                        </a>
                      </span>
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-xl shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Получить расчет в WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Без спама. Перезвонит лично мастер или пришлет смету.</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
