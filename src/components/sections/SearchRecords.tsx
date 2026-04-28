import React, { useState } from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useData } from '@/src/context/DataContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, Search, Filter } from 'lucide-react';

export const SearchRecords = () => {
  const { t } = useLanguage();
  const { documents } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || doc.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <section className="py-24 bg-white relative">
      {/* Decorative side accent */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-accent/10 md:block hidden" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-4">
          <span className="text-secondary text-[10px] font-mono font-black uppercase tracking-[0.4em] inline-block">{t('Archival Repositories', 'Archives')}</span>
          <h2 className="text-5xl font-serif font-black italic tracking-tighter text-primary leading-none">{t('Transparency & Records', 'Transparence et archives')}</h2>
          <p className="text-stone-500 leading-relaxed font-serif italic text-lg max-w-2xl mx-auto">
            {t(
              'Explore Canada\'s history through official Town records, council dispatches, and legislative minutes.',
              'Explorez l\'histoire du Canada à travers les archives officielles de la ville et les procès-verbaux.'
            )}
          </p>
        </div>

        <div className="bg-stone-50 p-10 border border-stone-100 mb-12 shadow-sm rounded-none">
           <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
              <div className="relative w-full lg:max-w-xl group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-accent transition-transform group-hover:scale-110" />
                <Input 
                  placeholder={t('Search registries, minutes, or bylaws...', 'Rechercher des archives...')} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-16 pl-14 rounded-none bg-white border-stone-200 shadow-none focus-visible:ring-accent font-serif placeholder:italic text-lg"
                />
              </div>
              
              <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full lg:w-auto">
                <TabsList className="bg-stone-200/50 p-1 rounded-none h-auto">
                  <TabsTrigger value="all" className="rounded-none h-12 data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase tracking-[0.2em] text-[10px] px-8 transition-all">{t('Entire Archive', 'Tout')}</TabsTrigger>
                  <TabsTrigger value="council-minutes" className="rounded-none h-12 data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase tracking-[0.2em] text-[10px] px-8 transition-all">{t('Official Minutes', 'P.-Verbeaux')}</TabsTrigger>
                  <TabsTrigger value="financials" className="rounded-none h-12 data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase tracking-[0.2em] text-[10px] px-8 transition-all">{t('Treasury Dispatches', 'Finances')}</TabsTrigger>
                </TabsList>
              </Tabs>
           </div>
        </div>

        <div className="border border-stone-100 overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
          <Table>
            <TableHeader className="bg-stone-50">
              <TableRow className="border-b-stone-100">
                <TableHead className="w-[500px] font-black uppercase tracking-[0.3em] text-[10px] py-8 px-12 text-stone-400">{t('Dispatch Title', 'Titre du document')}</TableHead>
                <TableHead className="font-black uppercase tracking-[0.3em] text-[10px] text-stone-400">{t('Disposition', 'Catégorie')}</TableHead>
                <TableHead className="font-black uppercase tracking-[0.3em] text-[10px] text-stone-400">{t('Dated', 'Date d\'émission')}</TableHead>
                <TableHead className="text-right font-black uppercase tracking-[0.3em] text-[10px] px-12 text-stone-400">{t('Registry Actions', 'Actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <TableRow key={doc.id} className="group hover:bg-stone-50/80 transition-all border-b border-stone-50">
                    <TableCell className="font-serif font-black italic py-8 px-12 flex items-center gap-5 text-primary text-xl tracking-tight">
                      <div className="p-3 bg-stone-100 rounded-none group-hover:bg-accent group-hover:bg-opacity-10 transition-colors">
                        <FileText className="h-5 w-5 text-accent" />
                      </div>
                      {doc.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-none px-4 py-1.5 uppercase font-mono font-black text-[9px] tracking-widest bg-primary text-white border-none shadow-sm">
                        {t(doc.category.replace('-', ' '), doc.category)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-stone-400 text-xs italic font-mono">
                      {new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-right px-12">
                       <Button variant="ghost" size="sm" className="rounded-none h-12 px-6 hover:bg-primary hover:text-white transition-all font-black uppercase tracking-[0.2em] text-[10px] group-hover:translate-x-[-10px] duration-500">
                          <Download className="h-4 w-4 mr-3 text-accent group-hover:text-white" />
                          {t('Archive Pull', 'Télécharger')}
                       </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-stone-400 italic font-serif text-xl">
                    {t('Our archives contain no matching dispatches.', 'Aucun document trouvé.')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-12 text-center">
           <Button variant="link" className="text-stone-400 text-sm uppercase tracking-widest font-semibold hover:text-primary transition-colors">
              <Filter className="h-3 w-3 mr-2" />
              {t('Advanced Record Search', 'Recherche avancée')}
           </Button>
        </div>
      </div>
    </section>
  );
};
