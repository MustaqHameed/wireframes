import React, { useState } from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockEvents } from '@/src/data/mockData';
import { MapPin, Clock } from 'lucide-react';

export const CalendarSection = () => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDateStr = date?.toISOString().split('T')[0];
  const eventsOnDate = mockEvents.filter(e => e.date === selectedDateStr);

  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
           <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-serif font-bold mb-6">{t('Community Calendar', 'Calendrier communautaire')}</h2>
                <p className="text-stone-600 leading-relaxed font-light text-lg">
                  {t(
                    'Join us for town council meetings, seasonal festivals, and public information sessions. We celebrate our community through dialogue and shared events.',
                    'Rejoignez-nous pour les réunions du conseil municipal, les festivals et plus encore.'
                  )}
                </p>
              </div>

              <div className="space-y-4">
                 <h3 className="font-serif text-xl font-semibold border-b border-stone-200 pb-2 flex items-center justify-between">
                    <span>{t('Events on', 'Événements le')} {date?.toLocaleDateString()}</span>
                    <Badge variant="secondary" className="rounded-full">{eventsOnDate.length}</Badge>
                 </h3>
                 
                 {eventsOnDate.length > 0 ? (
                   eventsOnDate.map(event => (
                      <Card key={event.id} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white rounded-2xl overflow-hidden">
                        <CardHeader className="py-4 px-6 flex flex-row items-center justify-between space-y-0">
                           <Badge variant="outline" className="uppercase text-[10px] tracking-widest">{t(event.type, event.type)}</Badge>
                           <div className="flex items-center text-xs text-stone-400 gap-1"><Clock className="h-3 w-3" /> 7:00 PM</div>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                           <CardTitle className="text-lg font-serif mb-2">{event.title}</CardTitle>
                           <p className="text-sm text-stone-600 mb-4 font-light leading-relaxed">{event.description}</p>
                           <div className="flex items-center text-xs font-semibold text-stone-500 gap-2">
                             <MapPin className="h-4 w-4 text-primary" />
                             {event.location}
                           </div>
                        </CardContent>
                      </Card>
                   ))
                 ) : (
                   <div className="p-8 bg-white rounded-2xl border border-dashed border-stone-200 text-center text-stone-400 italic">
                      {t('No events scheduled for this date.', 'Aucun événement prévu pour cette date.')}
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
