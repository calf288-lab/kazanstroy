import React from 'react';
import { REVIEWS_LIST } from '../data/reviewsData';
import { Star, CheckCircle, ExternalLink, MessageCircle } from 'lucide-react';
import { KAZAN_BASE_ADDRESS } from '../data/districtsData';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#111317] border-b border-[#242A34] relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C212B] border border-[#2B3444] text-xs font-bold text-[#FF6A00] mb-3">
              Честные отзывы заказчиков
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Что говорят жители Казани <span className="text-[#FF6A00]">о нашей работе</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mt-2 max-w-xl">
              Средняя оценка <strong className="text-amber-400 font-bold">4.9 из 5.0</strong> на основе более чем 100 сданных квартир и домов.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://uslugi.yandex.ru/profile/FanisMusin-2672053?from=suggest&occupationId=%2Fremont-i-stroitel_stvo&specId=%2Fremont-i-stroitel_stvo%2Fremont-kvartir-i-domov&text=%D1%80%D0%B5%D0%BC%D0%BE%D0%BD%D1%82+%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80+%D0%BA%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C#/remont-i-stroitel_stvo/remont-kvartir-i-domov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C212B] hover:bg-[#252C39] border border-[#2F3746] text-xs sm:text-sm font-bold text-gray-200 hover:text-white transition-colors"
            >
              <span>Профиль на Яндекс.Услугах</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FF6A00]" />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS_LIST.map((review) => (
            <div
              key={review.id}
              className="bg-[#171A21] border border-[#282F3C] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#FF6A00]/40 transition-colors"
            >
              <div>
                {/* Header with avatar & stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/22252c/ffffff?text=К';
                      }}
                      className="w-12 h-12 rounded-full object-cover border border-[#313948]"
                    />
                    <div>
                      <div className="font-extrabold text-white text-base leading-tight">
                        {review.name}
                      </div>
                      <div className="text-xs text-[#FF6A00] font-semibold mt-0.5">
                        {review.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Work Type Badge */}
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#1F2530] text-gray-300 px-3 py-1 rounded-lg border border-[#2D3645] mb-3">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Вид работ: {review.workType}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  «{review.comment}»
                </p>
              </div>

              {/* Date & Verified */}
              <div className="mt-5 pt-4 border-t border-[#232935] flex items-center justify-between text-xs text-gray-500">
                <span>{review.date}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Проверенный заказ
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action for reviews */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400 mb-3">
            Хотите такой же аккуратный и качественный ремонт в срок?
          </p>
          <a
            href={`https://wa.me/${KAZAN_BASE_ADDRESS.rawPhone}?text=${encodeURIComponent('Здравствуйте! Прочитал отзывы на вашем сайте. Хочу пригласить замерщика на объект.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-950/40 transition-all hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Написать в WhatsApp и забронировать замер</span>
          </a>
        </div>

      </div>
    </section>
  );
};
