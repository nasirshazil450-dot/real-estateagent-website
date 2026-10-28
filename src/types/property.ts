export interface Property {
  id: string;
  title: string;
  slug: string;
  purpose: 'sale' | 'rent';
  propertyType: 
    | 'House / Villa'
    | 'Apartment / Flat'
    | 'Commercial Office / Shop'
    | 'Farmhouse'
    | 'Residential Plot'
    | 'Commercial Plot'
    | 'Penthouse'
    | 'Warehouse';
  price: number; // in PKR
  priceFormatted: string; // e.g. "PKR 4.85 Crore"
  location: string;
  city: string;
  sector: string;
  areaSize: string; // e.g. "1 Kanal", "10 Marla", "5 Marla"
  bedrooms?: number;
  bathrooms?: number;
  featured: boolean;
  badge?: string;
  images: string[];
  description: string;
  features: string[];
  addedDate: string;
  contactPerson: {
    name: string;
    phone: string;
    whatsapp: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  location: string;
  sector: string;
  types: string[];
  priceRange: string;
  status: 'Ready for Possession' | 'Under Construction' | 'Booking Open';
  image: string;
  description: string;
  highlights: string[];
}

export interface AreaInfo {
  id: string;
  name: string;
  tag: string;
  description: string;
  propertyCount: number;
  image: string;
  avgPriceKanal: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  propertySector: string;
  feedback: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Buying' | 'Selling' | 'Renting' | 'General' | 'Investment';
}
