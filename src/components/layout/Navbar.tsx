import React from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useData } from '@/src/context/DataContext';
import { Button } from '@/components/ui/button';
import { Globe, LogIn, Menu, Facebook, Twitter, Instagram, Search, Home } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const Navbar = ({ onStaffLogin, onGoHome, onViewCalendar, onViewContact }: { onStaffLogin: () => void, onGoHome?: () => void, onViewCalendar?: () => void, onViewContact?: () => void }) => {
  const { language, setLanguage, t } = useLanguage();
  const { settings } = useData();

  const navItems = [
    { title: t('Visitors', 'Visiteurs'), href: '#' },
    { title: t('Business', 'Affaires'), href: '#' },
    { title: t('Residents', 'Résidents'), onClick: onViewCalendar },
    { title: t('Town Hall', 'Hôtel de Ville'), onClick: onViewContact },
  ];

  return (
    <header className="w-full z-50">
      {/* Utility Top Bar */}
      <div className="bg-white border-b py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-primary">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onGoHome?.()} 
              className="hover:text-accent flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 appearance-none font-inherit"
            >
              <Home className="h-3 w-3" /> {t('Home', 'Accueil')}
            </button>
            <a href="#" className="hover:text-accent">{t('Getting Here', 'Accès')}</a>
            <a href="#" className="hover:text-accent">{t('Submit Your Event', 'Suggérer un événement')}</a>
            <a href="#" className="hover:text-accent">{t('Contact', 'Contact')}</a>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Facebook className="h-4 w-4 cursor-pointer hover:text-accent" />
              <Twitter className="h-4 w-4 cursor-pointer hover:text-accent" />
              <Instagram className="h-4 w-4 cursor-pointer hover:text-accent" />
              <Search className="h-4 w-4 cursor-pointer hover:text-accent" />
            </div>
            <span className="border-l pl-4 font-normal">Phone: {settings.contactPhone}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="h-6 px-2 text-[10px]"
            >
              <Globe className="h-3 w-3 mr-1" />
              {language === 'en' ? 'FR' : 'EN'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          
          {/* Logo Area (Left for mobile, balanced for desktop) */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center md:hidden cursor-pointer" onClick={() => onGoHome?.()}>
              <div className="flex flex-col items-start">
                <span className="font-serif font-black text-xl italic tracking-tighter">Annapolis Royal</span>
                <span className="text-[8px] text-secondary font-black uppercase tracking-widest">Nova Scotia</span>
              </div>
            </div>

            {/* Desktop Navigation Layout */}
            <div className="hidden md:flex flex-1 justify-center items-center gap-12 font-bold uppercase tracking-widest text-sm">
              <div className="flex gap-8">
                {navItems.slice(0, 2).map((item) => (
                  item.onClick ? (
                    <button key={item.title} onClick={item.onClick} className="hover:text-secondary transition-colors cursor-pointer bg-transparent border-none p-0 appearance-none font-inherit uppercase tracking-widest text-sm font-bold">{item.title}</button>
                  ) : (
                    <a key={item.title} href={item.href} className="hover:text-secondary transition-colors">{item.title}</a>
                  )
                ))}
              </div>
              
              {/* Center Logo Area */}
              <div 
                className="bg-white p-4 rounded-b-3xl shadow-lg relative -mb-10 transform transition-transform hover:scale-105 cursor-pointer z-50 flex flex-col items-center justify-center min-w-[220px]"
                onClick={() => onGoHome?.()}
              >
                  <img 
                    src="input_file_1.png" 
                    alt="Annapolis Royal Logo" 
                    className="h-16 w-auto object-contain" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLElement).parentElement;
                      if (parent) {
                        const fallback = parent.querySelector('.logo-fallback');
                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="logo-fallback hidden flex-col items-center border-2 border-primary/10 p-2">
                    <span className="font-serif text-primary text-xl leading-none font-black italic tracking-tighter">Annapolis Royal</span>
                    <span className="text-[9px] text-accent font-black uppercase tracking-[0.3em] mt-1">Nova Scotia</span>
                  </div>
              </div>

              <div className="flex gap-8">
                {navItems.slice(2, 4).map((item) => (
                  item.onClick ? (
                    <button key={item.title} onClick={item.onClick} className="hover:text-secondary transition-colors cursor-pointer bg-transparent border-none p-0 appearance-none font-inherit uppercase tracking-widest text-sm font-bold">{item.title}</button>
                  ) : (
                    <a key={item.title} href={item.href} className="hover:text-secondary transition-colors">{item.title}</a>
                  )
                ))}
              </div>
            </div>

            {/* Staff Access & Toggle */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onStaffLogin} 
                className="text-white border-white/20 hover:bg-white/10 hidden md:flex items-center gap-2 font-bold uppercase tracking-tighter text-[10px]"
              >
                <LogIn className="h-3 w-3" />
                {t('Staff', 'Staff')}
              </Button>

              <div className="flex md:hidden items-center gap-2">
                <Sheet>
                  <SheetTrigger
                    render={
                      <Button variant="ghost" size="icon" className="text-white">
                        <Menu className="h-6 w-6" />
                      </Button>
                    }
                  />
                  <SheetContent side="right">
                    <div className="flex flex-col gap-4 mt-8">
                      {navItems.map((item) => (
                        item.onClick ? (
                          <button key={item.title} onClick={item.onClick} className="text-left text-lg font-bold uppercase hover:text-primary bg-transparent border-none p-0 appearance-none font-inherit">
                            {item.title}
                          </button>
                        ) : (
                          <a key={item.title} href={item.href} className="text-left text-lg font-bold uppercase hover:text-primary">
                            {item.title}
                          </a>
                        )
                      ))}
                      <div className="h-px w-full bg-border" />
                      <Button variant="outline" onClick={onStaffLogin} className="w-full justify-start gap-2 font-bold px-4">
                        <LogIn className="h-4 w-4" />
                        <span>{t('Staff Portal', 'Portail Staff')}</span>
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer for the overlapping logo on desktop */}
      <div className="h-8 md:h-12 hidden md:block" />
    </header>
  );
};
