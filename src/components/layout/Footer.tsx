import React from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-stone-900 text-stone-300 py-20 border-t border-stone-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white tracking-tighter italic">Annapolis Royal</h3>
            <p className="text-sm leading-relaxed text-stone-400 font-light">
              {t(
                'Nova Scotia\'s historic gem. Nestled in the Annapolis Valley, our seaside community is steeped in rich, historic past and a vibrant community spirit.',
                'Le joyau historique de la Nouvelle-Écosse. Nichée dans la vallée de l\'Annapolis.'
              )}
            </p>
            <div className="flex items-center gap-4">
               <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-primary hover:text-white transition-all"><Facebook className="h-4 w-4" /></a>
               <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-primary hover:text-white transition-all"><Twitter className="h-4 w-4" /></a>
               <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-primary hover:text-white transition-all"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">{t('Quick Links', 'Liens Rapides')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">{t('Visit Annapolis Royal', 'Visitez Annapolis Royal')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('Community Calendar', 'Calendrier communautaire')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('Council Minutes', 'Procès-verbaux du conseil')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('Employment Services', 'Services d\'emploi')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('Tenders & RFPs', 'Appels d\'offres')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">{t('Town Hall', 'Hôtel de Ville')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">{t('Mayor & Council', 'Maire et Conseil')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('Public Notices', 'Avis Publics')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('Finance & Taxes', 'Finance et taxes')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('Bylaws & Policies', 'Objets et politiques')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('Planning & Development', 'Urbanisme et développement')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6 text-primary">{t('Contact Us', 'Contactez-nous')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                 <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                 <span>285 St. George Street<br />Annapolis Royal, NS B0S 1A0</span>
              </li>
              <li className="flex items-center gap-3">
                 <Phone className="h-4 w-4 text-primary shrink-0" />
                 <span>(902) 532-2043</span>
              </li>
              <li className="flex items-center gap-3">
                 <Mail className="h-4 w-4 text-primary shrink-0" />
                 <span>admin@annapolisroyal.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-stone-500 uppercase tracking-widest font-bold">
           <p>© {new Date().getFullYear()} {t('Town of Annapolis Royal', 'Ville d\'Annapolis Royal')}. {t('All Rights Reserved', 'Tous droits réservés')}.</p>
           <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">{t('Privacy Policy', 'Confidentialité')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('Accessibility Statement', 'Accessibilité')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('Site Map', 'Plan du site')}</a>
           </div>
        </div>
      </div>
    </footer>
  );
};
