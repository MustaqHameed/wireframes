
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: 'community' | 'council' | 'festival';
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: 'public-notice' | 'improvement' | 'news';
}

export interface Document {
  id: string;
  title: string;
  category: 'council-minutes' | 'financials' | 'bylaws' | 'rfp';
  date: string;
  url: string;
}

export interface Translation {
  en: string;
  fr: string;
}
