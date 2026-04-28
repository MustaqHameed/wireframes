import React, { useState } from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useData } from '@/src/context/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LayoutDashboard, Calendar, FileText, Bell, LogOut, Save, Plus, Edit2, Trash2 } from 'lucide-react';

export const StaffPortal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useLanguage();
  const { 
    news, events, documents, settings,
    deleteNews, deleteEvent, deleteDocument, 
    addNews, addEvent, addDocument,
    updateNews, updateEvent, updateDocument,
    updateSettings 
  } = useData();
  
  const [activeTab, setActiveTab] = useState('news');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [localSettings, setLocalSettings] = useState(settings);

  const handleDelete = (id: string) => {
    if (window.confirm(t('Are you sure you want to delete this item?', 'Êtes-vous sûr de vouloir supprimer cet élément ?'))) {
      if (activeTab === 'news') deleteNews(id);
      else if (activeTab === 'events') deleteEvent(id);
      else if (activeTab === 'docs') deleteDocument(id);
    }
  };

  const handleSaveSettings = () => {
    updateSettings(localSettings);
    alert(t('Settings saved successfully!', 'Paramètres enregistrés avec succès !'));
  };

  const renderForm = (item: any = null, isNew = false) => {
    const isNews = activeTab === 'news';
    const isEvents = activeTab === 'events';
    const isDocs = activeTab === 'docs';

    return (
      <div className="fixed inset-0 bg-primary/90 flex items-center justify-center z-[200] p-4 backdrop-blur-sm">
        <Card className="w-full max-w-2xl bg-white rounded-none border-none shadow-2xl overflow-hidden">
          <div className="h-2 bg-accent w-full" />
          <CardHeader className="p-10 pb-4">
            <CardTitle className="text-3xl font-serif font-black italic text-primary">
              {isNew ? t('Add New Entry', 'Nouvelle entrée') : t('Edit Entry', 'Modifier')}
            </CardTitle>
            <CardDescription className="font-serif italic text-stone-400">
              {t('Official Town Record Update', 'Mise à jour du registre officiel de la ville')}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-4 space-y-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Entry Title</label>
                <Input defaultValue={item?.title} id="form-title" className="rounded-none border-stone-200 h-12 focus:border-accent font-serif placeholder:text-stone-300" />
             </div>
             
             {isNews && (
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Summary Disclosure</label>
                   <Input defaultValue={item?.summary} id="form-summary" className="rounded-none border-stone-200 h-12 focus:border-accent" />
                </div>
             )}

             {isEvents && (
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Location</label>
                      <Input defaultValue={item?.location} id="form-location" className="rounded-none border-stone-200 h-12 focus:border-accent" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Event Type</label>
                      <Input defaultValue={item?.type} id="form-type" className="rounded-none border-stone-200 h-12 focus:border-accent" placeholder="council, festival, community" />
                   </div>
                </div>
             )}

             {isDocs && (
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Archive Category</label>
                   <Input defaultValue={item?.category} id="form-category" className="rounded-none border-stone-200 h-12 focus:border-accent" placeholder="bylaws, financials, etc." />
                </div>
             )}

             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Record Date</label>
                <Input type="date" defaultValue={item?.date} id="form-date" className="rounded-none border-stone-200 h-12 focus:border-accent" />
             </div>

             <div className="flex justify-end gap-4 pt-6">
                <Button variant="ghost" onClick={() => { setEditingItem(null); setShowAddForm(false); }} className="rounded-none uppercase tracking-widest text-[10px] font-black hover:bg-stone-50">
                  {t('Discard', 'Annuler')}
                </Button>
                <Button className="rounded-none px-10 h-14 bg-primary hover:bg-primary/90 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl" onClick={() => {
                  const title = (document.getElementById('form-title') as HTMLInputElement).value;
                  const date = (document.getElementById('form-date') as HTMLInputElement).value;
                  
                  if (activeTab === 'news') {
                    const summary = (document.getElementById('form-summary') as HTMLInputElement).value;
                    const data = { 
                      title, 
                      summary, 
                      date, 
                      content: '...', 
                      category: 'news' as const, 
                      image: 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&q=80&w=800' 
                    };
                    isNew ? addNews(data) : updateNews(item.id, data);
                  } else if (activeTab === 'events') {
                    const location = (document.getElementById('form-location') as HTMLInputElement).value;
                    const typeInput = (document.getElementById('form-type') as HTMLInputElement).value;
                    const type = (['council', 'festival', 'community'].includes(typeInput) ? typeInput : 'community') as 'council' | 'festival' | 'community';
                    const data = { title, location, type, date, description: '...', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800' };
                    isNew ? addEvent(data) : updateEvent(item.id, data);
                  } else if (activeTab === 'docs') {
                    const categoryInput = (document.getElementById('form-category') as HTMLInputElement).value;
                    const category = (['council-minutes', 'financials', 'bylaws', 'rfp'].includes(categoryInput) ? categoryInput : 'council-minutes') as 'council-minutes' | 'financials' | 'bylaws' | 'rfp';
                    const data = { title, category, date, url: '#' };
                    isNew ? addDocument(data) : updateDocument(item.id, data);
                  }

                  setEditingItem(null);
                  setShowAddForm(false);
                }}>
                  {t('Commit Record', 'Enregistrer')}
                </Button>
             </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-stone-100 flex flex-col font-sans selection:bg-accent/20">
      {(editingItem || showAddForm) && renderForm(editingItem, showAddForm)}
      
      {/* Sidebar / Sidebar imitation Header */}
      <div className="bg-primary text-white border-b border-white/5 px-8 py-5 flex items-center justify-between shadow-xl relative z-20">
        <div className="flex items-center gap-10">
           <div className="flex items-center gap-4">
              <div className="bg-accent p-2.5 rounded-none shadow-lg">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-2xl italic tracking-tighter leading-none">{t('Staff Admin', 'Portail Admin Staff')}</span>
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-accent mt-1">{t('Annapolis Royal', 'Annapolis Royal')}</span>
              </div>
           </div>
           <div className="h-10 w-px bg-white/10 hidden lg:block" />
           <p className="text-[10px] text-stone-400 font-mono font-black uppercase tracking-widest hidden lg:block">Authorized Clearance: <span className="text-white">Town Administrator</span></p>
        </div>
        <div className="flex items-center gap-6">
           <Button variant="ghost" className="text-white/70 hover:text-accent hover:bg-transparent uppercase tracking-[0.2em] text-[10px] font-black" onClick={onClose}>
             <LogOut className="h-4 w-4 mr-3" />
             {t('Exit Portal', 'Quitter')}
           </Button>
        </div>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* Navigation Sidebar */}
        <div className="w-72 bg-white border-r border-stone-200 p-8 hidden md:flex flex-col gap-3 shadow-sm relative z-10">
           <div className="mb-8 pl-4 border-l-2 border-accent">
              <h3 className="text-sm font-serif font-black italic text-primary">{t('Operations Bureau', 'Bureau des opérations')}</h3>
              <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 mt-1">{t('Registry Management', 'Gestion du registre')}</p>
           </div>
           
           <Button 
            variant="ghost"
            className={`w-full justify-start gap-4 rounded-none h-14 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-stone-50 ${activeTab === 'news' ? 'bg-primary text-white hover:bg-primary shadow-lg translate-x-2' : 'text-stone-500'}`}
            onClick={() => setActiveTab('news')}
           >
             <Bell className={`h-4 w-4 ${activeTab === 'news' ? 'text-accent' : ''}`} />
             {t('Public Notices', 'Avis Publics')}
           </Button>
           <Button 
            variant="ghost"
            className={`w-full justify-start gap-4 rounded-none h-14 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-stone-50 ${activeTab === 'events' ? 'bg-primary text-white hover:bg-primary shadow-lg translate-x-2' : 'text-stone-500'}`}
            onClick={() => setActiveTab('events')}
           >
             <Calendar className={`h-4 w-4 ${activeTab === 'events' ? 'text-accent' : ''}`} />
             {t('Event Calendar', 'Calendrier')}
           </Button>
           <Button 
            variant="ghost"
            className={`w-full justify-start gap-4 rounded-none h-14 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-stone-50 ${activeTab === 'docs' ? 'bg-primary text-white hover:bg-primary shadow-lg translate-x-2' : 'text-stone-500'}`}
            onClick={() => setActiveTab('docs')}
           >
             <FileText className={`h-4 w-4 ${activeTab === 'docs' ? 'text-accent' : ''}`} />
             {t('Official Records', 'Archives')}
           </Button>
           
           <div className="my-6 h-px bg-stone-100" />
           
           <Button 
            variant="ghost"
            className={`w-full justify-start gap-4 rounded-none h-14 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-stone-50 ${activeTab === 'settings' ? 'bg-primary text-white hover:bg-primary shadow-lg translate-x-2' : 'text-stone-500'}`}
            onClick={() => setActiveTab('settings')}
           >
             <Edit2 className={`h-4 w-4 ${activeTab === 'settings' ? 'text-accent' : ''}`} />
             {t('Base Identity', 'Identité')}
           </Button>

           <div className="mt-auto p-6 bg-primary text-white rounded-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 skew-x-[20deg] translate-x-8" />
              <h4 className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-accent mb-3">{t('Registry Status', 'Statut')}</h4>
              <p className="text-[11px] leading-relaxed font-serif italic text-white/70">
                {t('Secure Session Active. All changes recorded for transparency.', 'Audit en cours. Toutes les modifications sont enregistrées.')}
              </p>
           </div>
        </div>

        {/* Content Area */}
        <main className="flex-grow overflow-y-auto p-12 bg-white">
           <div className="max-w-6xl mx-auto">
              {activeTab === 'settings' ? (
                <div className="space-y-12">
                  <div className="space-y-2 border-l-4 border-accent pl-8">
                    <h2 className="text-4xl font-serif font-black italic text-primary">{t('Town Identity & Contact', 'Gestion de l\'identité')}</h2>
                    <p className="text-stone-400 italic font-serif leading-relaxed">{t('Configure the public parameters for the Annapolis Royal portal.', 'Configurez les paramètres publics du portail.')}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Card className="border border-stone-200 shadow-none rounded-none p-10 space-y-8 bg-stone-50/30">
                       <div className="space-y-1">
                         <h3 className="text-xl font-serif font-black italic text-primary">{t('Contact Specifications', 'Spécifications de contact')}</h3>
                         <div className="h-0.5 w-12 bg-accent opacity-30" />
                       </div>
                       
                       <CardContent className="p-0 space-y-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t('Administrative Phone', 'Téléphone')}</label>
                            <Input 
                              value={localSettings.contactPhone} 
                              onChange={(e) => setLocalSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
                              className="rounded-none border-stone-200 h-14 bg-white font-serif italic" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t('Official Correspondance Email', 'Courriel')}</label>
                            <Input 
                              value={localSettings.contactEmail} 
                              onChange={(e) => setLocalSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                              className="rounded-none border-stone-200 h-14 bg-white font-serif italic" 
                            />
                          </div>
                       </CardContent>
                    </Card>

                    <Card className="border border-stone-200 shadow-none rounded-none p-10 space-y-8 bg-stone-50/30">
                       <div className="space-y-1">
                         <h3 className="text-xl font-serif font-black italic text-primary">{t('Operational Hours', 'Heures d\'opération')}</h3>
                         <div className="h-0.5 w-12 bg-accent opacity-30" />
                       </div>

                       <CardContent className="p-0 space-y-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t('Current Public Hours', 'Heures actuelles')}</label>
                            <Input 
                              value={localSettings.townHallHours} 
                              onChange={(e) => setLocalSettings(prev => ({ ...prev, townHallHours: e.target.value }))}
                              className="rounded-none border-stone-200 h-14 bg-white font-serif italic" 
                            />
                          </div>
                          <div className="pt-4">
                            <Button className="w-full h-16 rounded-none bg-primary text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:translate-y-[-2px] transition-all" onClick={handleSaveSettings}>
                                <Save className="h-4 w-4 mr-3 text-accent" />
                                {t('Apply Official Changes', 'Tout enregistrer')}
                            </Button>
                          </div>
                       </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-end mb-12 pb-8 border-b border-stone-100">
                     <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">{t('Management Suite', 'Suite de gestion')}</span>
                        <h2 className="text-5xl font-serif font-black italic text-primary tracking-tighter">
                            {activeTab === 'news' && t('News & Notices', 'Gérer les avis')}
                            {activeTab === 'events' && t('Event Calendar', 'Gérer les événements')}
                            {activeTab === 'docs' && t('Public Archive', 'Gérer les documents')}
                        </h2>
                     </div>
                     <Button className="rounded-none h-14 px-10 bg-accent hover:bg-accent/90 shadow-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:translate-y-[-2px] transition-all" onClick={() => setShowAddForm(true)}>
                        <Plus className="h-4 w-4 mr-3" />
                        {t('New Dispatch', 'Ajouter une entrée')}
                     </Button>
                  </div>

                  <Card className="border-none shadow-2xl rounded-none overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
                    <CardHeader className="bg-stone-50 border-b border-stone-100 py-10 px-12">
                       <CardTitle className="text-2xl font-serif font-black italic text-primary">{t('Public Record Interface', 'Registre public')}</CardTitle>
                       <CardDescription className="font-serif italic text-stone-400 mt-2">{t('The following entries are currently live on the Annapolis Royal portal.', 'Les entrées suivantes sont actuellement en ligne.')}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                       <Table>
                          <TableHeader className="bg-stone-50/80">
                            <TableRow className="border-none">
                              <TableHead className="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">{t('Entity Title', 'Titre / Entrée')}</TableHead>
                              <TableHead className="text-[10px] font-black uppercase tracking-widest text-stone-400">{t('Disposition', 'Catégorie')}</TableHead>
                              <TableHead className="text-[10px] font-black uppercase tracking-widest text-stone-400">{t('Archive Date', 'Mise à jour')}</TableHead>
                              <TableHead className="text-right px-12 text-[10px] font-black uppercase tracking-widest text-stone-400">{t('Authority', 'Actions')}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {(activeTab === 'news' ? news : activeTab === 'events' ? events : documents).map((item: any) => (
                              <TableRow key={item.id} className="hover:bg-accent/5 transition-colors group">
                                <TableCell className="px-12 py-6 font-black font-serif italic text-primary text-lg tracking-tight">{item.title}</TableCell>
                                <TableCell>
                                   <span className="text-[9px] font-mono uppercase font-black tracking-[0.2em] bg-primary text-white px-3 py-1.5 shadow-sm">
                                     {item.category || item.type}
                                   </span>
                                </TableCell>
                                <TableCell className="text-stone-400 text-[11px] font-mono italic font-serif">{item.date}</TableCell>
                                <TableCell className="text-right px-12">
                                   <div className="flex justify-end gap-3 opacity-30 group-hover:opacity-100 transition-opacity">
                                      <Button variant="ghost" size="icon" className="hover:text-primary rounded-none hover:bg-white shadow-sm" onClick={() => setEditingItem(item)}><Edit2 className="h-4 w-4" /></Button>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="hover:text-accent rounded-none hover:bg-white shadow-sm"
                                        onClick={() => handleDelete(item.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                   </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                       </Table>
                    </CardContent>
                  </Card>
                </>
              )}
           </div>
        </main>
      </div>
    </div>
  );
};
