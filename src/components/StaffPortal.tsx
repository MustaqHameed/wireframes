import React, { useState } from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockNews, mockEvents, mockDocuments } from '@/src/data/mockData';
import { Plus, Edit2, Trash2, LayoutDashboard, Calendar, FileText, Bell, LogOut, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const StaffPortal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('news');

  return (
    <div className="fixed inset-0 z-[100] bg-stone-100 flex flex-col font-sans">
      {/* Sidebar / Sidebar imitation Header */}
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg text-white">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <span className="font-serif font-bold text-xl">{t('Staff Admin Portal', 'Portail Admin Staff')}</span>
           </div>
           <div className="h-8 w-px bg-stone-200" />
           <p className="text-sm text-stone-500 font-medium">Logged in as: <span className="text-stone-900">Admin</span></p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="ghost" size="sm" className="text-stone-500 hover:text-red-500" onClick={onClose}>
             <LogOut className="h-4 w-4 mr-2" />
             {t('Exit Portal', 'Quitter')}
           </Button>
        </div>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* Navigation Sidebar */}
        <div className="w-64 bg-white border-r p-6 hidden md:flex flex-col gap-2">
           <Button 
            variant={activeTab === 'news' ? 'secondary' : 'ghost'} 
            className="w-full justify-start gap-3"
            onClick={() => setActiveTab('news')}
           >
             <Bell className="h-4 w-4" />
             {t('Public Notices', 'Avis Publics')}
           </Button>
           <Button 
            variant={activeTab === 'events' ? 'secondary' : 'ghost'} 
            className="w-full justify-start gap-3"
            onClick={() => setActiveTab('events')}
           >
             <Calendar className="h-4 w-4" />
             {t('Event Calendar', 'Calendrier')}
           </Button>
           <Button 
            variant={activeTab === 'docs' ? 'secondary' : 'ghost'} 
            className="w-full justify-start gap-3"
            onClick={() => setActiveTab('docs')}
           >
             <FileText className="h-4 w-4" />
             {t('Official Records', 'Archives')}
           </Button>
           <div className="mt-auto p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{t('CMS Tutorial', 'Tutoriel')}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t('Changes are instantly published to the portal upon saving.', 'Les changements sont publiés instantanément.')}
              </p>
           </div>
        </div>

        {/* Content Area */}
        <main className="flex-grow overflow-y-auto p-8 bg-stone-50/50">
           <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-3xl font-serif font-bold">
                    {activeTab === 'news' && t('Manage News & Notices', 'Gérer les avis')}
                    {activeTab === 'events' && t('Manage Events', 'Gérer les événements')}
                    {activeTab === 'docs' && t('Manage Documents', 'Gérer les documents')}
                 </h2>
                 <Button className="rounded-full shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('Add New Entry', 'Ajouter une entrée')}
                 </Button>
              </div>

              <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
                <CardHeader className="bg-white border-b py-6 px-8">
                   <CardTitle className="text-lg font-medium">{t('Live Site Content', 'Contenu du site')}</CardTitle>
                   <CardDescription>{t('Update existing entries or remove outdated information below.', 'Mettez à jour les entrées ou supprimez les infos périmées.')}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                   <Table>
                      <TableHeader className="bg-stone-50/50">
                        <TableRow>
                          <TableHead className="px-8">{t('Title / Entry', 'Titre / Entrée')}</TableHead>
                          <TableHead>{t('Category', 'Catégorie')}</TableHead>
                          <TableHead>{t('Last Updated', 'Mise à jour')}</TableHead>
                          <TableHead className="text-right px-8">{t('Actions', 'Actions')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(activeTab === 'news' ? mockNews : activeTab === 'events' ? mockEvents : mockDocuments).map((item: any) => (
                          <TableRow key={item.id} className="hover:bg-stone-50/50 transition-colors">
                            <TableCell className="px-8 font-medium font-serif">{item.title}</TableCell>
                            <TableCell>
                               <span className="text-xs uppercase tracking-wider bg-stone-100 px-2 py-1 rounded text-stone-500">
                                 {item.category || item.type}
                               </span>
                            </TableCell>
                            <TableCell className="text-stone-500 text-xs italic">{item.date}</TableCell>
                            <TableCell className="text-right px-8">
                               <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" className="hover:text-primary"><Edit2 className="h-4 w-4" /></Button>
                                  <Button variant="ghost" size="icon" className="hover:text-red-500"><Trash2 className="h-4 w-4" /></Button>
                               </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                   </Table>
                </CardContent>
              </Card>

              {/* Basic Info Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                 <Card className="border-none shadow-sm rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">{t('Town Hall Hours', 'Heures d\'ouverture')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="space-y-2">
                         <label className="text-xs font-bold text-stone-400 uppercase">{t('Monday - Friday', 'Lundi - Vendredi')}</label>
                         <Input defaultValue="8:30 AM - 4:30 PM" />
                       </div>
                       <Button variant="outline" size="sm" className="w-full rounded-full">
                          <Save className="h-4 w-4 mr-2" />
                          {t('Save Changes', 'Enregistrer')}
                       </Button>
                    </CardContent>
                 </Card>
                 <Card className="border-none shadow-sm rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">{t('Translation Toggle', 'Traduction')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <p className="text-sm text-stone-600">
                         {t('Enable or disable French language support across the portal.', 'Activez ou désactivez le support du français.')}
                       </p>
                       <div className="flex items-center gap-4">
                          <div className="h-6 w-12 bg-primary rounded-full relative cursor-pointer">
                             <div className="absolute right-0.5 top-0.5 h-5 w-5 bg-white rounded-full shadow-sm" />
                          </div>
                          <span className="text-sm font-medium">{t('French Enabled', 'Français Activé')}</span>
                       </div>
                    </CardContent>
                 </Card>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
};
