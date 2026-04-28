import React, { useState } from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useData } from '@/src/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const NewsPage = ({ onBack }: { onBack: () => void }) => {
  const { t } = useLanguage();
  const { news } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Public Notice', 'News', 'Improvement'];

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || item.category.replace('-', ' ') === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24">
      {/* Header */}
      <div className="pt-20 pb-12 bg-white border-b">
         <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
               <div className="max-w-2xl">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4 block">Archive & Updates</span>
                  <h1 className="text-5xl font-serif font-black italic text-primary tracking-tight">Town News & Public Notices</h1>
               </div>
               <Button onClick={onBack} variant="ghost" className="rounded-none uppercase tracking-widest font-black text-xs gap-2">
                  <ArrowRight className="h-4 w-4 rotate-180" /> Back Home
               </Button>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 py-12">
         {/* Filter Bar */}
         <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
            <div className="flex flex-wrap gap-3">
               {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setActiveFilter(cat)}
                   className={cn(
                     "px-6 py-2 border rounded-none text-[11px] font-black uppercase tracking-widest transition-all",
                     activeFilter === cat 
                        ? "bg-primary text-white border-primary shadow-lg -translate-y-0.5" 
                        : "bg-white text-stone-500 hover:bg-stone-50"
                   )}
                 >
                   {cat}
                 </button>
               ))}
            </div>
            
            <div className="relative w-full md:w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
               <Input 
                 placeholder="Search notices..." 
                 className="pl-12 h-12 rounded-none border-stone-200"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>

         {/* Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map(item => (
              <Card key={item.id} className="group border shadow-sm hover:shadow-xl transition-all duration-300 rounded-none overflow-hidden bg-white flex flex-col h-full">
                 <div className="h-64 overflow-hidden relative">
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&q=80&w=800"} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                       <Badge className="bg-accent text-white rounded-none uppercase text-[9px] font-black tracking-[0.2em] px-3 py-1 border-none shadow-lg">
                          {item.category.replace('-', ' ')}
                       </Badge>
                    </div>
                 </div>
                 <CardHeader className="p-8 pb-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">
                       <Calendar className="h-3 w-3" />
                       {new Date(item.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <CardTitle className="text-2xl font-serif font-black italic text-primary leading-tight hover:text-accent transition-colors cursor-pointer line-clamp-2">
                       {item.title}
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="px-8 pb-8 flex-grow">
                    <p className="text-stone-600 font-light leading-relaxed line-clamp-3 italic">
                       {item.summary}
                    </p>
                 </CardContent>
                 <div className="px-8 pb-8 mt-auto">
                    <Button variant="link" className="p-0 h-auto text-accent text-[11px] font-black uppercase tracking-widest group-hover:gap-2 transition-all">
                       Read Full Disclosure <ArrowRight className="h-3 w-3 ml-2" />
                    </Button>
                 </div>
              </Card>
            ))}

            {filteredNews.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed rounded-none">
                 <h3 className="text-2xl font-serif italic text-stone-400">No records match your criteria.</h3>
                 <Button onClick={() => { setSearchTerm(''); setActiveFilter('All'); }} variant="outline" className="mt-4 rounded-none">Clear all filters</Button>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};
