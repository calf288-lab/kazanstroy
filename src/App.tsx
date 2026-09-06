import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesCatalog } from './components/ServicesCatalog';
import { Calculator } from './components/Calculator';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { Portfolio } from './components/Portfolio';
import { KazanGeoMap } from './components/KazanGeoMap';
import { TrustAndWorkflow } from './components/TrustAndWorkflow';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { MaxWidgetModal } from './components/MaxWidgetModal';
import { FloatingConversionBar } from './components/FloatingConversionBar';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState<string>('Вызов инженера-замерщика');
  const [isMaxOpen, setIsMaxOpen] = useState(false);

  const handleOpenConsultation = (topic?: string) => {
    setConsultationTopic(topic || 'Вызов замерщика на объект');
    setIsConsultationOpen(true);
  };

  const handleOpenMax = () => {
    setIsMaxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-[#F3F4F6] selection:bg-[#FF6A00] selection:text-white font-sans antialiased pb-20 md:pb-16">
      {/* Top Navigation */}
      <Header
        onOpenConsultation={handleOpenConsultation}
        onOpenMax={handleOpenMax}
      />

      {/* Main Content */}
      <main>
        {/* 1. Hero banner with quick lead calculation */}
        <Hero
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 2. Interactive Calculator */}
        <Calculator
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 3. Before & After Interactive Slider */}
        <BeforeAfterSlider
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 4. Complete Services & Prices Catalog */}
        <ServicesCatalog
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 5. Completed Projects in Kazan ЖК */}
        <Portfolio
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 6. Kazan Geography & Zones of Operation */}
        <KazanGeoMap
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 7. 5-step Workflow and Guarantees */}
        <TrustAndWorkflow
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 8. Verified Reviews */}
        <Reviews />
      </main>

      {/* Footer */}
      <Footer
        onOpenConsultation={handleOpenConsultation}
        onOpenMax={handleOpenMax}
      />

      {/* Sticky Bottom Floating Conversion Bar */}
      <FloatingConversionBar
        onOpenMax={handleOpenMax}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        topic={consultationTopic}
        onClose={() => setIsConsultationOpen(false)}
      />

      <MaxWidgetModal
        isOpen={isMaxOpen}
        onClose={() => setIsMaxOpen(false)}
      />
    </div>
  );
}
