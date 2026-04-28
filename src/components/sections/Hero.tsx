import React from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Info } from 'lucide-react';

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Background with slight zoom animation */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="container relative h-full flex flex-col justify-center px-4 mx-auto text-white">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 0.8 }}
           className="max-w-3xl"
        >
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase bg-primary text-primary-foreground rounded-full">
            {t('Welcome to the Cradle of Our Nation', 'Bienvenue au berceau de notre nation')}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t('Heritage & Community in Annapolis Royal', 'Héritage et communauté à Annapolis Royal')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl font-light leading-relaxed">
            {t(
              'Experience the beauty of our seaside community, steeped in rich history and a vibrant future. Explore our resources, join our events, and connect with Town Hall.',
              'Découvrez la beauté de notre communauté balnéaire, imprégnée d\'une riche histoire et d\'un avenir dynamique.'
            )}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/20 transition-all">
              {t('Explore Town Hall', 'Explorer l\'hôtel de ville')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-white/10 backdrop-blur border-white/20 hover:bg-white/20">
              <Calendar className="mr-2 h-5 w-5" />
              {t('View Calendar', 'Voir le calendrier')}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Quick Access Info Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-background/20 backdrop-blur-md border-t border-white/10 hidden md:block">
        <div className="container mx-auto px-4 py-4 grid grid-cols-3 gap-8">
           <div className="flex items-center gap-4 text-white">
              <div className="p-2 bg-white/20 rounded-lg"><Info className="h-5 w-5" /></div>
              <div>
                <p className="text-xs font-medium opacity-70 uppercase tracking-wider">{t('Latest Notice', 'Dernier avis')}</p>
                <p className="text-sm font-semibold truncate">{t('Shoreline Restoration Update', 'Mise à jour restauration rivage')}</p>
              </div>
           </div>
           <div className="flex items-center gap-4 text-white">
              <div className="p-2 bg-white/20 rounded-lg"><Calendar className="h-5 w-5" /></div>
              <div>
                <p className="text-xs font-medium opacity-70 uppercase tracking-wider">{t('Next Meeting', 'Prochaine réunion')}</p>
                <p className="text-sm font-semibold">{t('Town Council - May 20', 'Conseil municipal - 20 mai')}</p>
              </div>
           </div>
           <div className="flex items-center gap-4 text-white justify-end">
              <p className="text-sm border border-white/30 rounded-full px-4 py-1 hover:bg-white/10 cursor-pointer transition-colors">
                {t('Report an Issue', 'Signaler un problème')}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
