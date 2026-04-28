import React from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Info } from 'lucide-react';

export const Hero = ({ onViewCalendar, onViewContact }: { onViewCalendar?: () => void, onViewContact?: () => void }) => {
  const { t } = useLanguage();

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background with slight zoom animation */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-[#002b3d] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&q=80&w=2000')" }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

      {/* Content */}
      <div className="container relative h-full flex flex-col justify-center px-4 mx-auto text-white">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 0.8 }}
           className="max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-accent opacity-50" />
            <span className="text-accent text-[11px] font-black uppercase tracking-[0.4em]">
              {t('Cradle of our Nation', 'Berceau de notre nation')}
            </span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl font-black mb-8 leading-[0.9] italic tracking-tighter">
            {t('Legacy Lives', 'L\'héritage vit')} 
            <span className="block text-accent drop-shadow-sm">{t('At the Horizon', 'à l\'horizon')}</span>
          </h1>

          <p className="text-lg md:text-xl text-stone-200 mb-12 max-w-2xl font-light italic leading-relaxed border-l-2 border-accent/30 pl-8">
            {t(
              'Explore Canada\'s historic heart. Defined by centuries of resilience, vibrant culture, and enduring scenic beauty.',
              'Explorez le cœur historique du Canada. Défini par des siècles de résilience, une culture vibrante et une beauté scénique durable.'
            )}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="h-16 px-10 text-xs font-black uppercase tracking-[0.2em] rounded-none shadow-2xl hover:translate-y-[-2px] transition-all bg-accent hover:bg-accent/90" onClick={onViewContact}>
              {t('Contact Town Hall', 'Contacter l\'hôtel de ville')}
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onViewCalendar}
              className="h-16 px-10 text-xs font-black uppercase tracking-[0.2em] rounded-none bg-white/5 backdrop-blur border-white/20 hover:bg-white/10 transition-all text-white"
            >
              <Calendar className="mr-3 h-4 w-4" />
              {t('Community Events', 'Événements')}
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-12 hidden lg:flex items-center gap-8">
        <div className="h-24 w-[1px] bg-white/20" />
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">{t('Visit Annapolis Royal', 'Visitez Annapolis Royal')}</p>
          <p className="text-white/50 text-xs italic font-serif leading-tight max-w-[150px]">"Prettiest little town in Nova Scotia"</p>
        </div>
      </div>
    </div>
  );
};
