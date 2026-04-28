import React, { useState } from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useData } from '@/src/context/DataContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List, Plus, MapPin, Clock } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { cn } from '@/lib/utils';

export const FullCalendarPage = ({ onBack }: { onBack: () => void }) => {
  const { t } = useLanguage();
  const { events } = useData();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToToday = () => setCurrentMonth(new Date());

  const categories = ['All', 'Council', 'Arts', 'Recreation', 'Culture'];

  const getEventsForDay = (day: Date) => {
    return (events || []).filter(event => event.date && isSameDay(new Date(event.date), day));
  };

  const featuredEvent = (events || []).find(e => e.id === '4') || events?.[0];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="container mx-auto px-4 pt-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-serif font-black italic text-primary mb-4 tracking-tight">
              Community Event Calendar
            </h1>
            <p className="text-foreground/70 font-light leading-relaxed">
              Stay engaged with the heartbeat of Annapolis Royal. From council meetings to artisan workshops, find your place in our historic community.
            </p>
          </div>
          <Button className="bg-[#A6354D] hover:bg-[#8e2d41] rounded-none h-12 px-8 font-bold uppercase tracking-widest text-xs gap-2">
            <Plus className="h-4 w-4 border-2 border-white rounded-full p-0.5" />
            Submit an Event
          </Button>
        </div>

        {/* Toolbar Section */}
        <div className="bg-white border p-4 mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mr-2">Filter By:</span>
             <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-[11px] font-bold transition-all border",
                      filter === cat 
                        ? "bg-primary text-white border-primary shadow-md" 
                        : "bg-stone-100 text-stone-500 hover:bg-stone-200 border-transparent"
                    )}
                  >
                    {cat === 'All' ? 'All Events' : cat}
                  </button>
                ))}
             </div>
          </div>

          <div className="flex bg-stone-100 p-1">
             <button 
               onClick={() => setView('calendar')}
               className={cn("px-4 py-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-all", view === 'calendar' ? "bg-white shadow-sm text-primary" : "text-stone-400")}
             >
               <CalendarIcon className="h-3 w-3" /> Calendar
             </button>
             <button 
               onClick={() => setView('list')}
               className={cn("px-4 py-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-all", view === 'list' ? "bg-white shadow-sm text-primary" : "text-stone-400")}
             >
               <List className="h-3 w-3" /> List
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-12">
             <div>
                <h2 className="text-2xl font-serif font-black italic text-primary mb-6">This Month</h2>
                {featuredEvent && (
                  <div className="group border shadow-sm bg-white overflow-hidden mb-8">
                     <div className="relative h-40">
                        <img src={featuredEvent.image} alt={featuredEvent.title} className="w-full h-full object-cover" />
                        <Badge className="absolute top-3 left-3 bg-[#A6354D] rounded-none uppercase text-[9px] font-black tracking-widest px-2">Featured</Badge>
                     </div>
                     <div className="p-4 border-t">
                        <h4 className="font-serif font-bold text-primary mb-1">{featuredEvent.title}</h4>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">{format(new Date(featuredEvent.date), 'MMM d')} • 10:00 AM</p>
                        <Button variant="link" className="p-0 h-auto text-accent text-[10px] font-black uppercase mt-2 group-hover:gap-2 transition-all">
                          Details <ChevronRight className="h-3 w-3" />
                        </Button>
                     </div>
                  </div>
                )}
             </div>

             <div className="space-y-6">
                {(events || []).filter(e => e.date && isSameDay(new Date(e.date), new Date())).length > 0 ? (
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-accent mb-1 block">Today</span>
                    {(events || []).filter(e => e.date && isSameDay(new Date(e.date), new Date())).map(e => (
                      <div key={e.id} className="border-l-2 border-accent pl-4 mb-4">
                        <h4 className="font-serif font-bold text-primary text-sm">{e.title}</h4>
                        <p className="text-[10px] text-muted-foreground">7:00 PM • {e.location}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-l-2 border-stone-200 pl-4">
                     <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1 block">Today</span>
                     <p className="text-[10px] text-stone-400 italic">No events today</p>
                  </div>
                )}

                {(events || []).filter(e => e.date && isSameDay(new Date(e.date), new Date(Date.now() + 86400000))).length > 0 ? (
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1 block">Tomorrow</span>
                    {(events || []).filter(e => e.date && isSameDay(new Date(e.date), new Date(Date.now() + 86400000))).map(e => (
                      <div key={e.id} className="border-l-2 border-stone-200 pl-4 mb-4">
                        <h4 className="font-serif font-bold text-primary text-sm">{e.title}</h4>
                        <p className="text-[10px] text-muted-foreground">9:00 AM • {e.location}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                   <div className="border-l-2 border-stone-200 pl-4">
                      <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1 block">Tomorrow</span>
                      <p className="text-[10px] text-stone-400 italic">No events tomorrow</p>
                   </div>
                )}
             </div>

             <Button onClick={onBack} variant="outline" className="w-full rounded-none font-bold uppercase tracking-widest text-[10px]">
                Back to Home
             </Button>
          </div>

          {/* Calendar Grid */}
          <div className="lg:col-span-9">
             <div className="bg-white border shadow-sm">
                {/* Grid Header */}
                <div className="p-6 flex items-center justify-between border-b">
                   <h3 className="text-3xl font-serif font-black italic text-primary">{format(currentMonth, 'MMMM yyyy')}</h3>
                   <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={prevMonth} className="text-primary hover:bg-stone-50"><ChevronLeft className="h-5 w-5" /></Button>
                      <Button variant="outline" onClick={goToToday} className="rounded-none h-8 px-4 font-bold uppercase text-[10px] tracking-widest">Today</Button>
                      <Button variant="ghost" size="icon" onClick={nextMonth} className="text-primary hover:bg-stone-50"><ChevronRight className="h-5 w-5" /></Button>
                   </div>
                </div>

                <div className="grid grid-cols-7 border-b bg-stone-50/50">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground border-r last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7">
                   {calendarDays.map((day, idx) => {
                     const dayEvents = getEventsForDay(day);
                     const isCurrentMonth = isSameMonth(day, monthStart);
                     const isToday = isSameDay(day, new Date());

                     return (
                       <div 
                        key={day.toString()} 
                        className={cn(
                          "min-h-[140px] border-r border-b p-2 transition-colors hover:bg-stone-50/50 relative",
                          !isCurrentMonth && "bg-stone-50/30 text-stone-300",
                          idx % 7 === 6 && "border-r-0"
                        )}
                       >
                         <span className={cn(
                           "text-sm font-serif font-black italic",
                           isToday && "bg-primary text-white px-2 py-1"
                         )}>
                           {format(day, 'd')}
                         </span>

                         <div className="mt-2 space-y-1">
                            {dayEvents.map(event => (
                              <div 
                                key={event.id}
                                className={cn(
                                  "text-[9px] p-1 truncate font-bold uppercase",
                                  event.type === 'council' ? "bg-primary text-white" : 
                                  event.type === 'festival' ? "bg-accent text-white" : "bg-stone-200 text-stone-600"
                                )}
                              >
                                {event.title}
                              </div>
                            ))}
                         </div>
                       </div>
                     )
                   })}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
