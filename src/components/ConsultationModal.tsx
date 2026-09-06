import React, { useState } from 'react';
import { X, Phone, MessageCircle, CheckCircle2, ShieldCheck, Calendar, MapPin } from 'lucide-react';
import { KAZAN_BASE_ADDRESS, KAZAN_DISTRICTS } from '../data/districtsData';

interface ConsultationModalProps {
  isOpen: boolean;
  topic?: string;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, topic, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Советский район');
  const [agreeFz, setAgreeFz] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeFz || !phone) return;

    const text = `Здравствуйте! Заявка на бесплатный замер с сайта КазаньСтрой Ремонт:
• Услуга / Тема: ${topic || 'Вызов замерщика на объект'}
• Район в Казани: ${district}
• Имя: ${name || 'Клиент'}
• Телефон: ${phone}
Прошу связаться со мной для согласования времени выезда.`;

    window.open(`https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#161A22] border-2 border-[#2F3746] rounded-2xl p-6 sm:p-8 shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#222733] transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">Заявка принята!</h3>
            <p className="text-sm text-gray-300">
              Диалог в WhatsApp открыт. Бригадир свяжется с вами в течение 5-10 минут для согласования точного времени бесплатного замера.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${KAZAN_BASE_ADDRESS.rawPhone}`}
                className="px-5 py-3 rounded-xl bg-[#232A37] text-white text-xs sm:text-sm font-bold border border-[#374152] flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#FF6A00]" />
                <span>Позвонить прямо сейчас</span>
              </a>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-[#FF6A00] text-white text-xs sm:text-sm font-bold shadow-lg"
              >
                Вернуться на сайт
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] text-xs font-bold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                Бесплатный выезд инженера по Казани
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {topic || 'Запись на бесплатный замер и расчет сметы'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Инженер приедет с лазерным дальномером, ответит на вопросы и составит точную смету без обязательств.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Ваш телефон <span className="text-[#FF6A00]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-[#101318] border border-[#2B3342] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 font-bold focus:outline-none focus:border-[#FF6A00] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Район объекта в Казани
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#101318] border border-[#2B3342] rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-[#FF6A00] transition-colors"
                >
                  {KAZAN_DISTRICTS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} (выезд ~{d.etaMinutes} мин)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Ваше имя (необязательно)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться"
                  className="w-full bg-[#101318] border border-[#2B3342] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6A00] transition-colors"
                />
              </div>

              {/* 152-FZ compliance */}
              <div className="pt-1">
                <label className="flex items-start gap-2 text-[11px] text-gray-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={agreeFz}
                    onChange={(e) => setAgreeFz(e.target.checked)}
                    className="mt-0.5 rounded border-gray-600 text-[#FF6A00] focus:ring-[#FF6A00] bg-[#101318]"
                  />
                  <span>
                    Согласен на обработку персональных данных в соответствии с{' '}
                    <a href="/policy.html" target="_blank" className="text-[#FF6A00] underline">
                      152-ФЗ и политикой конфиденциальности
                    </a>
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-xl shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Отправить заявку в WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Бесплатный выезд не обязывает вас заключать договор</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
