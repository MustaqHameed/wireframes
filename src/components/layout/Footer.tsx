import React from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useData } from '@/src/context/DataContext';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  const { t } = useLanguage();
  const { settings } = useData();

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Background Graphic Overlays */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-5 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-8">
             <div className="bg-white p-6 rounded-xl w-fit shadow-lg flex flex-col items-center">
                <img 
                  src="input_file_1.png" 
                  alt="Annapolis Royal Logo" 
                  className="h-12 w-auto object-contain" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLElement).parentElement;
                    if (parent) {
                      const fallback = parent.querySelector('.footer-logo-fallback');
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="footer-logo-fallback hidden flex-col items-center">
                  <span className="font-serif text-primary text-lg leading-none font-black italic tracking-tighter">Annapolis Royal</span>
                  <span className="text-[7px] text-accent font-black uppercase tracking-[0.2em] mt-1">Nova Scotia</span>
                </div>
             </div>
            <p className="text-sm leading-relaxed text-white/70 font-light max-w-xs">
              {t(
                'Annapolis Royal, Nova Scotia, a beautiful sea-side community nestled in the Annapolis Valley steeped with a rich, historic past.',
                'Annapolis Royal, en Nouvelle-Écosse, une magnifique communauté balnéaire nichée dans la vallée de l\'Annapolis.'
              )}
            </p>
            <div className="flex items-center gap-4">
               <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-all"><Facebook className="h-4 w-4" /></a>
               <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-all"><Twitter className="h-4 w-4" /></a>
               <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent transition-all"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
             <div className="flex items-center gap-3 mb-8">
               <div className="h-px w-8 bg-accent" />
               <h4 className="font-bold uppercase tracking-widest text-xs">{t('Quick Links', 'Liens Rapides')}</h4>
             </div>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> {t('Visit Annapolis Royal', 'Visitez Annapolis Royal')}</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> {t('Community Calendar', 'Calendrier communautaire')}</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> {t('Council Minutes', 'Procès-verbaux du conseil')}</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> {t('Starting a Business', 'Lancer une affaire')}</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> {t('Submit Your Event', 'Suggérer un événement')}</a></li>
            </ul>
          </div>

          <div>
             <div className="flex items-center gap-3 mb-8">
               <div className="h-px w-8 bg-accent" />
               <h4 className="font-bold uppercase tracking-widest text-xs">{t('Newsletter Sign-Up', 'Newsletter')}</h4>
             </div>
             <p className="text-xs text-white/60 mb-4">{t('Sign-up to receive our monthly newsletter', 'Inscrivez-vous pour recevoir notre bulletin mensuel')}</p>
             <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder={t('Enter your email', 'Votre courriel')}
                  className="w-full h-10 px-4 rounded-sm bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <Button className="w-full h-10 bg-accent hover:bg-accent/90 text-white font-bold uppercase tracking-widest text-[10px]">
                  {t('Sign Up', 'S\'inscrire')}
                </Button>
             </div>
          </div>

          <div>
             <div className="flex items-center gap-3 mb-8">
               <div className="h-px w-8 bg-accent" />
               <h4 className="font-bold uppercase tracking-widest text-xs">{t('Contact', 'Contact')}</h4>
             </div>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                 <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                 <span className="text-xs leading-relaxed">Town of Annapolis Royal<br />285 St. George Street, Box 310<br />Annapolis Royal, Nova Scotia B0S 1A0</span>
              </li>
              <li className="flex items-center gap-3">
                 <Phone className="h-4 w-4 text-accent shrink-0" />
                 <span className="text-xs">Phone: {settings.contactPhone}</span>
              </li>
              <li className="flex items-center gap-3">
                 <Mail className="h-4 w-4 text-accent shrink-0" />
                 <span className="text-xs">{settings.contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold">
           <p>Copyright © {new Date().getFullYear()} Town of Annapolis Royal. All Rights Reserved.</p>
           <div className="flex items-center gap-6">
              <a href="#" className="hover:text-accent transition-colors">{t('Site Map', 'Plan du site')}</a>
              <a href="#" className="hover:text-accent transition-colors">{t('Disclaimer', 'Avis de non-responsabilité')}</a>
              <a href="#" className="hover:text-accent transition-colors">{t('Terms of Use', 'Conditions d\'utilisation')}</a>
           </div>
        </div>
      </div>
    </footer>
  );
};
