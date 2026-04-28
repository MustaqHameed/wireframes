import React, { useState } from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useData } from '@/src/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { Calendar, Mail, Phone, Clock, Send, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export const ContactSection = () => {
  const { t } = useLanguage();
  const { settings } = useData();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact-section" className="relative py-24 bg-primary text-white overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.03] skew-x-[-15deg] translate-x-24" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Side: Contact Info */}
          <div className="space-y-12">
            <div>
              <span className="text-secondary text-xs font-black uppercase tracking-[0.4em] mb-4 block">Get In Touch</span>
              <h2 className="text-5xl font-serif font-black italic tracking-tight mb-6">How can we assist you today?</h2>
              <p className="text-stone-400 text-lg leading-relaxed max-w-lg italic">
                Our town staff is dedicated to providing efficient services and clear communication. Reach out via the form or visit us at Town Hall.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/5 border border-white/10 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <Phone className="h-5 w-5 text-accent group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Call Us</p>
                    <p className="text-sm font-bold">{settings.contactPhone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/5 border border-white/10 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <Mail className="h-5 w-5 text-accent group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Email Updates</p>
                    <p className="text-sm font-bold">{settings.contactEmail}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/5 border border-white/10 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <Clock className="h-5 w-5 text-accent group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Office Hours</p>
                    <p className="text-sm font-bold">{settings.townHallHours}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/5 border border-white/10 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <MapPin className="h-5 w-5 text-accent group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Visit Us</p>
                    <p className="text-sm font-bold">285 St. George St, NS</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex gap-6">
              <Facebook className="h-5 w-5 text-stone-500 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-stone-500 hover:text-accent cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-stone-500 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Right Side: Professional Form */}
          <div className="bg-white p-10 lg:p-14 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" />
            
            {submitted ? (
              <div className="py-20 text-center space-y-6">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-serif italic font-black text-primary">Message Sent</h3>
                <p className="text-stone-500">Thank you for contacting the Town of Annapolis Royal. We will get back to you shortly.</p>
                <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-none uppercase tracking-widest text-[10px] font-bold">
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif italic font-black text-primary">Online Inquiry</h3>
                  <p className="text-stone-400 text-sm">Please allow up to 48 hours for a formal response.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Your Full Name</label>
                    <Input required placeholder="First & Last Name" className="rounded-none border-stone-200 h-12 focus:border-accent text-primary placeholder:text-stone-300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Email Address</label>
                    <Input required type="email" placeholder="email@address.com" className="rounded-none border-stone-200 h-12 focus:border-accent text-primary placeholder:text-stone-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Subject / Department</label>
                  <select className="flex h-12 w-full border border-stone-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-none text-primary">
                    <option>General Support</option>
                    <option>Public Works</option>
                    <option>Finance & Taxes</option>
                    <option>Zoning & Permits</option>
                    <option>Mayor & Council</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Detailed Message</label>
                  <Textarea required placeholder="How can we help?" className="rounded-none border-stone-200 min-h-[120px] focus:border-accent text-primary placeholder:text-stone-300 resize-none" />
                </div>

                <Button type="submit" className="w-full h-14 rounded-none uppercase tracking-[0.3em] font-black text-xs shadow-xl transition-all hover:translate-y-[-2px] hover:shadow-accent/20">
                  Submit Formal Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
