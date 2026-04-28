import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { NewsNotices } from './components/sections/NewsNotices';
import { SearchRecords } from './components/sections/SearchRecords';
import { CalendarSection } from './components/sections/Calendar';
import { Footer } from './components/layout/Footer';
import { StaffPortal } from './components/StaffPortal';

import { NewsPage } from './components/sections/NewsPage';
import { ContactSection } from './components/sections/ContactSection';
import { FullCalendarPage } from './components/sections/FullCalendarPage';

function AppContent() {
  const [showStaffPortal, setShowStaffPortal] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'calendar' | 'news'>('home');

  const scrollToContact = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Wait for navigation then scroll
      setTimeout(() => {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentPage === 'calendar') {
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navbar 
          onStaffLogin={() => setShowStaffPortal(true)} 
          onGoHome={() => setCurrentPage('home')}
          onViewCalendar={() => setCurrentPage('calendar')}
          onViewContact={scrollToContact}
        />
        <FullCalendarPage onBack={() => setCurrentPage('home')} />
        <Footer />
        {showStaffPortal && (
          <StaffPortal onClose={() => setShowStaffPortal(false)} />
        )}
      </div>
    );
  }

  if (currentPage === 'news') {
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navbar 
          onStaffLogin={() => setShowStaffPortal(true)} 
          onGoHome={() => setCurrentPage('home')}
          onViewCalendar={() => setCurrentPage('calendar')}
          onViewContact={scrollToContact}
        />
        <NewsPage onBack={() => setCurrentPage('home')} />
        <Footer />
        {showStaffPortal && (
          <StaffPortal onClose={() => setShowStaffPortal(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar 
        onStaffLogin={() => setShowStaffPortal(true)}
        onGoHome={() => setCurrentPage('home')}
        onViewCalendar={() => setCurrentPage('calendar')}
        onViewContact={scrollToContact}
      />
      
      <main>
        <Hero onViewCalendar={() => setCurrentPage('calendar')} onViewContact={scrollToContact} />
        <NewsNotices onViewAll={() => setCurrentPage('news')} />
        <SearchRecords />
        <CalendarSection onViewFullCalendar={() => setCurrentPage('calendar')} />
        <ContactSection />
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
      <DataProvider>
        <AppContent />
      </DataProvider>
    </LanguageProvider>
  );
}
