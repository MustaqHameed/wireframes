import React from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockNews } from '@/src/data/mockData';
import { ArrowRight, Bell } from 'lucide-react';

export const NewsNotices = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 font-serif">
          <div>
            <h2 className="text-4xl font-bold mb-4">{t('News & Public Notices', 'Nouvelles et avis publics')}</h2>
            <p className="text-stone-600 max-w-2xl">
              {t(
                'Stay informed about local governance, upcoming developments, and utility notices affecting our town.',
                'Restez informé sur la gouvernance locale, les développements à venir et les avis d\'utilité publique.'
              )}
            </p>
          </div>
          <Button variant="ghost" className="group">
            {t('View All News', 'Toutes les nouvelles')}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockNews.map((item) => (
            <Card key={item.id} className="border-none shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full bg-white">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={item.category === 'public-notice' ? 'destructive' : 'secondary'} className="rounded-sm uppercase text-[10px] tracking-widest px-2 py-0.5">
                    {t(item.category.replace('-', ' '), item.category)}
                  </Badge>
                  <span className="text-xs text-stone-400 font-mono italic">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
                <CardTitle className="text-xl font-serif leading-tight group-hover:text-primary transition-colors cursor-pointer">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </CardContent>
              <CardFooter className="pt-0 border-t border-stone-100 mt-4 h-16 flex items-center">
                 <Button variant="link" className="px-0 text-primary font-semibold text-sm">
                    {t('Read More', 'Lire la suite')}
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
