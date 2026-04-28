import React, { useState } from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockDocuments } from '@/src/data/mockData';
import { Download, FileText, Search, Filter } from 'lucide-react';

export const SearchRecords = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredDocs = mockDocuments.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || doc.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-serif font-bold mb-6">{t('Transparency & Records', 'Transparence et archives')}</h2>
          <p className="text-stone-600 leading-relaxed italic">
            {t(
              'Easily access official Town documents, council minutes, and financial statements through our searchable records portal.',
              'Accédez facilement aux documents officiels de la ville, aux procès-verbaux du conseil et aux états financiers.'
            )}
          </p>
        </div>

        <div className="bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-100 mb-12">
           <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input 
                  placeholder={t('Search records or minutes...', 'Rechercher des archives...')} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 pl-12 rounded-xl bg-white border-stone-200 shadow-sm"
                />
              </div>
              
              <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="bg-stone-200/50 p-1 rounded-xl">
                  <TabsTrigger value="all" className="rounded-lg">{t('All', 'Tout')}</TabsTrigger>
                  <TabsTrigger value="council-minutes" className="rounded-lg">{t('Minutes', 'P.-Verbeaux')}</TabsTrigger>
                  <TabsTrigger value="financials" className="rounded-lg">{t('Financials', 'Finances')}</TabsTrigger>
                  <TabsTrigger value="bylaws" className="rounded-lg">{t('Bylaws', 'Règlements')}</TabsTrigger>
                </TabsList>
              </Tabs>
           </div>
        </div>

        <div className="border border-stone-100 rounded-3xl overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-stone-50/50">
              <TableRow>
                <TableHead className="w-[400px] font-serif py-6 px-8">{t('Document Title', 'Titre du document')}</TableHead>
                <TableHead className="font-serif">{t('Category', 'Catégorie')}</TableHead>
                <TableHead className="font-serif">{t('Date Issued', 'Date d\'émission')}</TableHead>
                <TableHead className="text-right font-serif px-8">{t('Actions', 'Actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <TableRow key={doc.id} className="group hover:bg-stone-50/50 transition-colors">
                    <TableCell className="font-medium py-6 px-8 flex items-center gap-3">
                      <div className="p-2 bg-stone-100 rounded-lg group-hover:bg-white transition-colors">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      {doc.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full px-3 capitalize font-normal border-stone-200">
                        {t(doc.category.replace('-', ' '), doc.category)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-stone-500 text-sm italic font-mono">
                      {new Date(doc.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right px-8">
                       <Button variant="ghost" size="sm" className="rounded-full hover:bg-primary hover:text-white group-hover:shadow-md transition-all">
                          <Download className="h-4 w-4 mr-2" />
                          {t('Download', 'Télécharger')}
                       </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-stone-400 italic font-serif">
                    {t('No documents found matching your search.', 'Aucun document trouvé pour votre recherche.')}
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
