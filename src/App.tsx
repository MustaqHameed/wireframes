import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { NewsNotices } from './components/sections/NewsNotices';
import { SearchRecords } from './components/sections/SearchRecords';
import { CalendarSection } from './components/sections/Calendar';
import { Footer } from './components/layout/Footer';
import { StaffPortal } from './components/StaffPortal';

function AppContent() {
  const [showStaffPortal, setShowStaffPortal] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar onStaffLogin={() => setShowStaffPortal(true)} />
      
      <main>
        <Hero />
        <NewsNotices />
        <SearchRecords />
        <CalendarSection />
      </main>

      <Footer />

      {showStaffPortal && (
        <StaffPortal onClose={() => setShowStaffPortal(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
