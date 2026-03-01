export interface CurriculumItem {
  week: number;
  topic: string;
  hours: number;
}

export interface Session {
  id: string;
  date: string;
  time: string;
  seatsTotal: number;
  seatsBooked: number;
  location: {
    country: string;
    city: string;
    address: string;
    postalCode: string;
  };
}

export interface SubsidizedPrice {
  min: number;
  max: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  discountedPrice: number;
  duration: string;
  enrollments: number;
  rating: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  instructor: string;
  status: 'active' | 'inactive' | 'draft';
  featured: boolean;
  outcomes: string[];
  curriculum: CurriculumItem[];
  nextSessions: Session[];
  createdAt: string;
  updatedAt: string;
}