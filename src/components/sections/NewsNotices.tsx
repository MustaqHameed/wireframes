import React from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useData } from '@/src/context/DataContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bell } from 'lucide-react';

export const NewsNotices = ({ onViewAll }: { onViewAll?: () => void }) => {
  const { t } = useLanguage();
  const { news } = useData();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 font-primary">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-4 border-l-4 border-accent pl-6">{t('News & Public Notices', 'Nouvelles et avis publics')}</h2>
            <p className="text-foreground/70 max-w-2xl font-light">
              {t(
                'Stay informed about local governance, upcoming developments, and utility notices affecting our town.',
                'Restez informé sur la gouvernance locale, les développements à venir et les avis d\'utilité publique.'
              )}
            </p>
          </div>
          <Button variant="outline" className="group border-primary/20 hover:bg-primary hover:text-white rounded-none uppercase tracking-widest text-[10px] font-bold" onClick={onViewAll}>
            {t('View All News', 'Toutes les nouvelles')}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.slice(0, 3).map((item, idx) => (
            <Card key={item.id} className="border-none shadow-xl hover:shadow-2xl transition-all group flex flex-col h-full bg-white rounded-none overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="h-56 w-full overflow-hidden relative">
                <img 
                  src={idx === 0 ? "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=800" : (idx === 1 ? "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800" : "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800")} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                   <Badge className="bg-primary text-white rounded-none uppercase text-[9px] font-black tracking-widest px-3 py-1 border-none shadow-lg">
                    {t(item.category.replace('-', ' '), item.category)}
                  </Badge>
                </div>
              </div>
              <CardHeader className="p-8 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-stone-400 border-b border-accent/20 pb-1">
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <CardTitle className="text-2xl font-serif font-black italic tracking-tight leading-tight group-hover:text-accent transition-colors cursor-pointer line-clamp-2 text-primary">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-4 flex-grow">
                <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 font-light italic">
                  {item.summary}
                </p>
              </CardContent>
              <CardFooter className="px-8 pb-8 pt-4">
                 <Button variant="link" className="p-0 h-auto text-primary font-black text-[10px] uppercase tracking-[0.2em] hover:text-accent transition-colors group-hover:gap-2">
                    {t('Read Full Disclosure', 'Lire le rapport')} <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 p-8 md:p-12 bg-primary rounded-3xl text-primary-foreground relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <div className="p-3 bg-white/10 rounded-2xl w-fit mb-6">
                <Bell className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">{t('Never miss an update', 'Ne manquez rien')}</h3>
              <p className="text-primary-foreground/80 leading-relaxed font-light">
                {t(
                  'Join our digital newsletter to receive the latest council decisions and community events directly in your inbox.',
                  'Joignez-vous à notre infolettre numérique pour recevoir les dernières décisions du conseil.'
                )}
              </p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
               <input 
                type="email" 
                placeholder={t('Enter your email', 'Entrez votre courriel')}
                className="h-14 px-6 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 min-w-[300px] text-white placeholder:text-white/50"
               />
               <Button className="h-14 px-8 rounded-full bg-white text-primary hover:bg-stone-100 font-bold">
                 {t('Subscribe Now', 'S\'abonner')}
               </Button>
            </div>
          </div>
          {/* Subtle backgrounds graphics */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};
