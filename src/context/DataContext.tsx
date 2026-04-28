import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event, NewsItem, Document } from '../types';
import { mockEvents, mockNews, mockDocuments } from '../data/mockData';

interface SiteSettings {
  townHallHours: string;
  contactPhone: string;
  contactEmail: string;
}

interface DataContextType {
  events: Event[];
  news: NewsItem[];
  documents: Document[];
  settings: SiteSettings;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addNews: (news: Omit<NewsItem, 'id'>) => void;
  updateNews: (id: string, news: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  addDocument: (doc: Omit<Document, 'id'>) => void;
  updateDocument: (id: string, doc: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  updateSettings: (settings: Partial<SiteSettings>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>(() => {
    if (typeof window === 'undefined') return mockEvents;
    const saved = localStorage.getItem('ar_events');
    try {
      return saved && saved !== 'undefined' ? JSON.parse(saved) : mockEvents;
    } catch {
      return mockEvents;
    }
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    if (typeof window === 'undefined') return mockNews;
    const saved = localStorage.getItem('ar_news');
    try {
      return saved && saved !== 'undefined' ? JSON.parse(saved) : mockNews;
    } catch {
      return mockNews;
    }
  });

  const [documents, setDocuments] = useState<Document[]>(() => {
    if (typeof window === 'undefined') return mockDocuments;
    const saved = localStorage.getItem('ar_documents');
    try {
      return saved && saved !== 'undefined' ? JSON.parse(saved) : mockDocuments;
    } catch {
      return mockDocuments;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (typeof window === 'undefined') return { townHallHours: '8:30 AM - 4:30 PM', contactPhone: '902.532.2043', contactEmail: 'admin@annapolisroyal.com' };
    const saved = localStorage.getItem('ar_settings');
    try {
      return saved ? JSON.parse(saved) : { townHallHours: '8:30 AM - 4:30 PM', contactPhone: '902.532.2043', contactEmail: 'admin@annapolisroyal.com' };
    } catch {
      return { townHallHours: '8:30 AM - 4:30 PM', contactPhone: '902.532.2043', contactEmail: 'admin@annapolisroyal.com' };
    }
  });

  useEffect(() => localStorage.setItem('ar_events', JSON.stringify(events)), [events]);
  useEffect(() => localStorage.setItem('ar_news', JSON.stringify(news)), [news]);
  useEffect(() => localStorage.setItem('ar_documents', JSON.stringify(documents)), [documents]);
  useEffect(() => localStorage.setItem('ar_settings', JSON.stringify(settings)), [settings]);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Math.random().toString(36).substr(2, 9) };
    setEvents(prev => [newEvent, ...prev]);
  };

  const updateEvent = (id: string, updated: Partial<Event>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const addNews = (item: Omit<NewsItem, 'id'>) => {
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
    setNews(prev => [newItem, ...prev]);
  };

  const updateNews = (id: string, updated: Partial<NewsItem>) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...updated } : n));
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  const addDocument = (doc: Omit<Document, 'id'>) => {
    const newDoc = { ...doc, id: Math.random().toString(36).substr(2, 9) };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const updateDocument = (id: string, updated: Partial<Document>) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, ...updated } : d));
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const updateSettings = (updated: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...updated }));
  };

  return (
    <DataContext.Provider value={{ 
      events, news, documents, settings,
      addEvent, updateEvent, deleteEvent,
      addNews, updateNews, deleteNews,
      addDocument, updateDocument, deleteDocument,
      updateSettings
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
