import React from 'react';
import { ClipboardCheck, Ruler, FileText, Camera, ShieldCheck, CheckCircle2, Truck, Percent, Award, HeartHandshake } from 'lucide-react';
import { KAZAN_BASE_ADDRESS } from '../data/districtsData';

interface TrustAndWorkflowProps {
  onOpenConsultation: (topic?: string) => void;
}

export const TrustAndWorkflow: React.FC<TrustAndWorkflowProps> = ({ onOpenConsultation }) => {
  const steps = [
    {
      num: '01',
      title: 'Звонок или заявка',
      desc: 'Ответим за 2 минуты, сориентируем по примерной стоимости и согласуем удобное время замера.',
      icon: ClipboardCheck,
    },
    {
      num: '02',
      title: 'Бесплатный выезд замерщика',
      desc: 'Приедем на объект с лазерным дальномером, снимем точные размеры, проверим кривизну стен и состояние проводки.',
      icon: Ruler,
    },
    {
      num: '03',
      title: 'Смета и договор',
      desc: 'Составим подробную смету до копейки. Фиксируем цену и сроки в официальном договоре подряда.',
      icon: FileText,
    },
    {
      num: '04',
      title: 'Поэтапный ремонт без авансов',
      desc: 'Выполняем работы строго по СНиПам. Присылаем ежедневные фото и видео в WhatsApp. Оплата только за принятые этапы.',
      icon: Camera,
    },
    {
      num: '05',
      title: 'Сдача объекта и гарантия 3 года',
      desc: 'Убираем весь мусор, проводим клининг, подписываем акт приемки-передачи и выдаем гарантийный сертификат.',
      icon: ShieldCheck,
    },
  ];

  const advantages = [
    {
      title: 'Официальный договор',
      desc: 'Фиксированная смета и жесткие сроки. Штраф за каждый день просрочки.',
      icon: FileText,
    },
    {
      title: 'Без предоплаты за работу',
      desc: 'Оплата поэтапная: сделали демонтаж — проверили — оплатили. Сделали электрику — проверили — оплатили.',
      icon: CheckCircle2,
    },
    {
      title: 'Скидка до 20% на материалы',
      desc: 'Имеем оптовые скидки на базах Казани: Мегастрой, Леруа Мерлен, Сатурн. Предоставляем все чеки.',
      icon: Percent,
    },
    {
      title: 'Профессиональный инструмент',
      desc: 'Штроборезы с пылесосами Bosch, лазерные уровни Hilti, плиткорезы с водяным охлаждением.',
      icon: Award,
    },
    {
      title: 'Удаленный контроль 24/7',
      desc: 'Вам не нужно жить на стройке. Бригадир ежедневно скидывает видеоотчеты в персональный чат WhatsApp.',
      icon: HeartHandshake,
    },
    {
      title: 'Свой транспорт и вывоз мусора',
      desc: 'Завезем тяжелые материалы, поднимем на этаж и вывезем строительный мусор на официальный полигон.',
      icon: Truck,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0E1015] border-b border-[#242A34] relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Workflow Steps Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C212B] border border-[#2B3444] text-xs font-bold text-[#FF6A00] mb-3">
            Простой и понятный процесс
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            5 понятных шагов к идеальному ремонту <span className="text-[#FF6A00]">без нервов</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-2">
            Вам не придется контролировать каждый гвоздь — весь процесс отлажен годами практики в Казани.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-[#151921] border border-[#262C38] rounded-2xl p-5 relative flex flex-col justify-between hover:border-[#FF6A00]/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1F2530] text-[#FF6A00] flex items-center justify-center border border-[#2D3646]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-gray-600">
                    {step.num}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why choose us Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Почему клиенты в Казани выбирают нас, <br className="hidden sm:block" />
            <span className="text-[#FF6A00]">а не случайные бригады с улицы</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((adv, idx) => {
            const AdvIcon = adv.icon;
            return (
              <div
                key={idx}
                className="bg-[#171A22] border border-[#282F3C] rounded-2xl p-6 hover:border-gray-500 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6A00]/20 to-amber-500/10 border border-[#FF6A00]/30 text-[#FF6A00] flex items-center justify-center mb-4">
                  <AdvIcon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-white mb-2">
                  {adv.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
