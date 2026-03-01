interface Section {
  id: string;
  title: string;
  content: string;
  order: number;
  lastUpdated: string;
}

export interface PageContent {
  id: string;
  slug: string;
  title: string;
  description: string;
  sections: Section[];
  lastUpdated: string;
}

export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  order: number;
  isActive: boolean;
}