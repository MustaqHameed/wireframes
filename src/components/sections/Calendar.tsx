import React, { useState } from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useData } from '@/src/context/DataContext';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock } from 'lucide-react';

export const CalendarSection = ({ onViewFullCalendar }: { onViewFullCalendar?: () => void }) => {
  const { t } = useLanguage();
  const { events } = useData();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDateStr = date?.toISOString().split('T')[0];
  const eventsOnDate = events.filter(e => e.date === selectedDateStr);

  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
               <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="space-y-4">
                  <span className="text-secondary text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-4 block">{t('Calendar', 'Calendrier')}</span>
                  <h2 className="text-5xl font-serif font-black italic tracking-tighter text-primary">{t('Upcoming Events', 'Événements à venir')}</h2>
                  <p className="text-stone-500 leading-relaxed font-light italic text-lg max-w-lg">
                    {t(
                      'Join us for town council meetings, seasonal festivals, and public information sessions.',
                      'Rejoignez-nous pour les réunions du conseil municipal, les festivals et plus encore.'
                    )}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={onViewFullCalendar}
                  className="rounded-none border-stone-200 font-black uppercase tracking-[0.2em] text-[10px] h-14 px-10 hover:bg-stone-50 hidden md:flex"
                >
                  {t('View Full Registry', 'Voir le rgistre complet')}
                </Button>
              </div>

              <div className="space-y-6">
                 <h3 className="font-serif italic font-black text-2xl border-l-4 border-accent pl-6 py-2 flex items-center justify-between bg-stone-100/50">
                    <span className="text-primary">{t('Events on', 'Événements le')} <span className="font-mono text-lg">{date?.toLocaleDateString()}</span></span>
                    <Badge variant="secondary" className="rounded-none bg-primary text-white font-mono text-[10px] px-3">{eventsOnDate.length}</Badge>
                 </h3>
                 
                 {eventsOnDate.length > 0 ? (
                   eventsOnDate.map(event => (
                      <Card key={event.id} className="border-none shadow-xl hover:shadow-2xl transition-all bg-white rounded-none overflow-hidden relative group">
                        <div className="absolute top-0 left-0 w-1 bg-accent h-full transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                        <CardHeader className="py-6 px-8 flex flex-row items-center justify-between space-y-0">
                           <Badge variant="outline" className="rounded-none font-mono text-[9px] uppercase font-black tracking-widest text-primary border-primary/20">{t(event.type, event.type)}</Badge>
                           <div className="flex items-center text-[10px] font-mono font-black text-accent gap-2 uppercase tracking-widest"><Clock className="h-3 w-3" /> 7:00 PM</div>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                           <CardTitle className="text-2xl font-serif font-black italic mb-3 text-primary group-hover:text-accent transition-colors">{event.title}</CardTitle>
                           <p className="text-sm text-stone-500 mb-6 font-light italic leading-relaxed">{event.description}</p>
                           <div className="flex items-center text-[10px] font-mono font-black text-stone-400 gap-3 uppercase tracking-widest">
                             <MapPin className="h-4 w-4 text-accent" />
                             {event.location}
                           </div>
                        </CardContent>
                      </Card>
                   ))
                 ) : (
                   <div className="p-12 bg-white rounded-none border-2 border-dashed border-stone-200 text-center text-stone-400 italic font-serif">
                      {t('No dispatches found for this selection.', 'Aucun événement prévu pour cette date.')}
                   </div>
                 )}
              </div>
           </div>

           <div className="flex justify-center lg:justify-end">
              <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-stone-100 scale-110 origin-center lg:origin-right">
                 <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border-none"
                    classNames={{
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-stone-100 text-stone-900 font-bold",
                    }}
                 />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
