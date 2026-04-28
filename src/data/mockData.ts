import { Event, NewsItem, Document } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Shoreline Restoration Public Information Session',
    description: 'Learn about the exciting news for Annapolis Royal\'s shoreline restoration project.',
    date: '2026-05-15',
    location: 'Town Hall',
    type: 'council'
  },
  {
    id: '2',
    title: 'Farmers Market - Spring Opening',
    description: 'The historic Market Square building will host our first seasonal market.',
    date: '2026-06-01',
    location: 'Market Square',
    type: 'festival'
  },
  {
    id: '3',
    title: 'Town Council Meeting',
    description: 'Monthly public meeting of the Annapolis Royal Town Council.',
    date: '2026-05-20',
    location: 'Council Chambers',
    type: 'council'
  }
];

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: '🌊 Exciting News for Annapolis Royal’s Shoreline!',
    summary: 'Funding has been secured for major shoreline restoration and protection.',
    content: 'The Town of Annapolis Royal is pleased to announce a significant funding milestone...',
    date: '2026-04-20',
    category: 'public-notice'
  },
  {
    id: '2',
    title: 'Market Square Building Rental Space Available',
    summary: 'The historic Market Square building now has prime rental spaces available for small businesses.',
    content: 'Looking for a unique location for your business? The Town is accepting applications...',
    date: '2026-04-18',
    category: 'news'
  },
  {
    id: '3',
    title: 'RFP: Website Development and Hosting Services',
    summary: 'The Town is seeking proposals for a modern, accessible website.',
    content: 'Proposals are invited from experienced developers to redesign our digital presence...',
    date: '2026-04-10',
    category: 'public-notice'
  }
];

export const mockDocuments: Document[] = [
  {
    id: 'd1',
    title: 'Council Minutes - March 2026',
    category: 'council-minutes',
    date: '2026-03-25',
    url: '#'
  },
  {
    id: 'd2',
    title: '2026 Strategic Plan',
    category: 'financials',
    date: '2026-01-10',
    url: '#'
  },
  {
    id: 'd3',
    title: 'Shoreline Protection Bylaw 2025',
    category: 'bylaws',
    date: '2025-11-15',
    url: '#'
  }
];
