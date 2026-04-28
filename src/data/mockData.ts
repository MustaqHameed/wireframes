import { Event, NewsItem, Document } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Shoreline Restoration Public Information Session',
    description: 'Learn about the exciting news for Annapolis Royal\'s shoreline restoration project.',
    date: '2026-05-15',
    location: 'Town Hall',
    type: 'council',
    image: 'https://images.unsplash.com/photo-1551632432-c735e7a4652c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Farmers Market - Spring Opening',
    description: 'The historic Market Square building will host our first seasonal market.',
    date: '2026-06-01',
    location: 'Market Square',
    type: 'festival',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Town Council Meeting',
    description: 'Monthly public meeting of the Annapolis Royal Town Council.',
    date: '2026-05-20',
    location: 'Council Chambers',
    type: 'council',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'Heritage Day Parade',
    description: 'Our annual celebration of history with a grand parade through the streets.',
    date: '2026-04-15',
    location: 'St. George Street',
    type: 'festival',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    title: 'Art Show Opening',
    description: 'Local artists reveal their latest works at the community center.',
    date: '2026-04-02',
    location: 'Community Center',
    type: 'festival',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    title: 'Library Book Sale',
    description: 'Huge discounts on thousands of donated books.',
    date: '2026-04-14',
    location: 'Town Library',
    type: 'community',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800'
  }
];

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: '🌊 Exciting News for Annapolis Royal’s Shoreline!',
    summary: 'Funding has been secured for major shoreline restoration and protection.',
    content: 'The Town of Annapolis Royal is pleased to announce a significant funding milestone...',
    date: '2026-04-20',
    category: 'public-notice',
    image: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Market Square Building Rental Space Available',
    summary: 'The historic Market Square building now has prime rental spaces available for small businesses.',
    content: 'Looking for a unique location for your business? The Town is accepting applications...',
    date: '2026-04-18',
    category: 'news',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'RFP: Website Development and Hosting Services',
    summary: 'The Town is seeking proposals for a modern, accessible website.',
    content: 'Proposals are invited from experienced developers to redesign our digital presence...',
    date: '2026-04-10',
    category: 'public-notice',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800'
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
