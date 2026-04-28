import React, { useState } from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useData } from '@/src/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ChevronRight } from 'lucide-react';
import { Textarea } from '../ui/textarea';

export const ContactPage = ({ onBack }: { onBack: () => void }) => {
  const { t } = useLanguage();
  const { settings } = useData();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Hero Header */}
      <div className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=2000')] opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-black italic mb-6 tracking-tight">
            Contact & Support
          </h1>
          <p className="text-xl font-light text-stone-300 max-w-2xl mx-auto leading-relaxed">
            We are here to help. Whether you have a question about municipal services, zoning, or community events, our staff is ready to assist you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Quick Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="rounded-none border shadow-lg bg-white">
              <CardHeader className="bg-stone-50 border-b">
                 <CardTitle className="text-xl font-serif italic text-primary">Town Hall</CardTitle>
                 <CardDescription>285 St. George Street, Annapolis Royal</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full text-accent mt-1">
                       <Phone className="h-5 w-5" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Call Us</p>
                       <p className="text-lg font-serif font-bold text-primary">{settings.contactPhone}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full text-accent mt-1">
                       <Mail className="h-5 w-5" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Email Us</p>
                       <p className="text-sm font-medium text-stone-600">{settings.contactEmail}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full text-accent mt-1">
                       <Clock className="h-5 w-5" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Office Hours</p>
                       <p className="text-sm font-medium text-stone-600">{settings.townHallHours}</p>
                    </div>
                 </div>
              </CardContent>
            </Card>

            <Card className="rounded-none border shadow-sm bg-primary text-white">
               <CardContent className="p-8">
                  <h3 className="text-2xl font-serif italic font-bold mb-4">Emergency Contacts</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-stone-300">Police / Fire / EMS</span>
                        <span className="font-black text-xl">911</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-stone-300">Public Works Emergency</span>
                        <span className="font-bold">902.532.8105</span>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Button onClick={onBack} variant="outline" className="w-full h-14 rounded-none uppercase tracking-widest font-black text-xs">
               Back to Home
            </Button>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <Card className="rounded-none border shadow-lg bg-white h-full">
              <CardHeader className="p-12 pb-6">
                 <h2 className="text-4xl font-serif italic font-black text-primary mb-2">Send a Message</h2>
                 <p className="text-stone-500">Have a specific inquiry? Fill out the form below and the appropriate department will get back to you within 48 hours.</p>
              </CardHeader>
              <CardContent className="p-12 pt-6">
                {submitted ? (
                  <div className="bg-green-50 border border-green-100 p-8 text-center space-y-4">
                     <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                        <Send className="h-6 w-6" />
                     </div>
                     <h3 className="text-2xl font-serif italic text-green-900">Message Received</h3>
                     <p className="text-green-700">Thank you for reaching out. We have received your inquiry and will contact you shortly.</p>
                     <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-none">Send another message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Full Name</label>
                          <Input required placeholder="Jane Doe" className="h-12 rounded-none border-stone-200 focus:ring-accent" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Email Address</label>
                          <Input required type="email" placeholder="jane@example.com" className="h-12 rounded-none border-stone-200" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Topic of Interest</label>
                       <select className="flex h-12 w-full border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-none">
                          <option>General Inquiry</option>
                          <option>Zoning & Planning</option>
                          <option>Public Works</option>
                          <option>Taxes & Finance</option>
                          <option>Recreation & Events</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">How can we help?</label>
                       <Textarea required placeholder="Please provide details..." className="min-h-[150px] rounded-none border-stone-200 resize-none" />
                    </div>
                    <Button type="submit" className="h-14 px-12 rounded-none uppercase tracking-[0.2em] font-black text-xs shadow-xl">
                       Send Inquiry
                    </Button>
                  </form>
                )}

                <div className="mt-16 pt-12 border-t">
                   <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Frequently Contacted</h4>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['Town CAO', 'Public Works Dept', 'Finance Officer', 'Marketing & Events'].map((dept) => (
                        <div key={dept} className="group p-4 border bg-stone-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer flex justify-between items-center">
                           <span className="text-sm font-bold text-stone-600">{dept}</span>
                           <ChevronRight className="h-4 w-4 text-stone-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
