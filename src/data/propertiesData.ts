import { Property, Project, AreaInfo, Testimonial, FAQItem } from '../types/property';

export const ASSET_IMAGES = {
  heroVilla: '/src/assets/images/hero_luxury_villa_1793168317139.jpg',
  modernHouse: '/src/assets/images/property_modern_house_1793168317685.jpg',
  commercialTower: '/src/assets/images/property_commercial_tower_1793168318665.jpg',
  luxuryApartment: '/src/assets/images/property_luxury_apartment_1793168319803.jpg',
  farmhouseOasis: '/src/assets/images/property_farmhouse_oasis_1793168320035.jpg'
};

export const PROPERTIES_DATA: Property[] = [
  {
    id: "prop-01",
    title: "Ultra-Modern 1 Kanal Luxury Designer House in G-11/3",
    slug: "modern-1-kanal-house-g11-islamabad",
    purpose: "sale",
    propertyType: "House / Villa",
    price: 135000000,
    priceFormatted: "PKR 13.50 Crore",
    location: "Street 48, G-11/3, Islamabad",
    city: "Islamabad",
    sector: "G-11",
    areaSize: "1 Kanal (500 Sq Yds)",
    bedrooms: 6,
    bathrooms: 7,
    featured: true,
    badge: "Prime Location",
    images: [
      ASSET_IMAGES.modernHouse,
      ASSET_IMAGES.heroVilla,
      ASSET_IMAGES.luxuryApartment
    ],
    description: "Architecturally bespoke 1 Kanal brand-new luxury residence in G-11/3, Islamabad. Featuring high ceilings, imported Spanish porcelain tiles, dual European designer kitchens with built-in appliances, 6 master suites with walk-in wardrobes, a rooftop terrace with Margalla view, basement home entertainment hall, and 15kW on-grid solar system. Solid teak woodwork and CDA approved drawing.",
    features: [
      "1 Kanal (500 Sq Yards)",
      "6 Master Bedrooms with Ensuite Baths",
      "2 Designer Italian Fitted Kitchens",
      "15 kW Hybrid Solar Power Plant",
      "Basement Home Cinema / Activity Hall",
      "Imported Double Glazed Glass Windows",
      "Servant Quarters with Dedicated Bath",
      "Spacious 4 Car Parking Porch",
      "Underground Water Reservoir & Bore"
    ],
    addedDate: "2026-10-15",
    contactPerson: {
      name: "Majid Real Estate G-11 Markaz",
      phone: "03325554423",
      whatsapp: "03325554423"
    },
    coordinates: {
      lat: 33.6698,
      lng: 73.0035
    }
  },
  {
    id: "prop-02",
    title: "Prime Commercial Double Shop in Al Anyat Mall, G-11 Markaz",
    slug: "commercial-shop-al-anyat-mall-g11-markaz",
    purpose: "sale",
    propertyType: "Commercial Office / Shop",
    price: 38500000,
    priceFormatted: "PKR 3.85 Crore",
    location: "Al Anyat Shopping Mall, G-11 Markaz, Islamabad",
    city: "Islamabad",
    sector: "G-11",
    areaSize: "680 Sq Ft",
    featured: true,
    badge: "High Rental Yield",
    images: [
      ASSET_IMAGES.commercialTower,
      ASSET_IMAGES.heroVilla
    ],
    description: "Exceptional commercial double shop situated in the bustling heart of G-11 Markaz inside Al Anyat Shopping Mall. Currently yielding guaranteed monthly rental income with established business tenant. Ideal for investors seeking immediate cash flow or corporations seeking a strategic retail presence in one of Islamabad's most established sectors.",
    features: [
      "Covered Area: 680 Sq Ft",
      "Corner Visibility & Dual Frontage",
      "Direct Escalator & Elevator Access",
      "24/7 Mall Security & Backup Generators",
      "Active Rental Lease Generating PKR 2.2 Lac/month",
      "Clean Title & Immediate CDA Transfer"
    ],
    addedDate: "2026-10-18",
    contactPerson: {
      name: "Majid Real Estate Advisors",
      phone: "03325554423",
      whatsapp: "03325554423"
    },
    coordinates: {
      lat: 33.6702,
      lng: 73.0048
    }
  },
  {
    id: "prop-03",
    title: "Executive 3-Bed Penthouse Overlooking Margalla Hills & City",
    slug: "executive-penthouse-faisal-mosque-view",
    purpose: "sale",
    propertyType: "Penthouse",
    price: 64000000,
    priceFormatted: "PKR 6.40 Crore",
    location: "Sector F-10 / Centaurus Corridor, Islamabad",
    city: "Islamabad",
    sector: "F-10",
    areaSize: "3,150 Sq Ft",
    bedrooms: 3,
    bathrooms: 4,
    featured: true,
    badge: "Exclusive Penthouse",
    images: [
      ASSET_IMAGES.luxuryApartment,
      ASSET_IMAGES.heroVilla,
      ASSET_IMAGES.modernHouse
    ],
    description: "Ultra-luxurious high-floor corner penthouse boasting uninhibited panoramic views of Faisal Mosque and the lush Margalla range. Complete with high-grade oak flooring, acoustic insulation, smart automation for climate and lighting, custom marble kitchen island, and expansive terrace for evening receptions.",
    features: [
      "3 Large Bedrooms + Maid's Room",
      "Unobstructed Margalla & City View",
      "Smart Home Automation System",
      "2 Reserved Underground Parking Slots",
      "High Speed Elevators with Keycard Access",
      "Residents Fitness Gym & Swimming Pool"
    ],
    addedDate: "2026-10-20",
    contactPerson: {
      name: "Majid Real Estate Sales Desk",
      phone: "03325554423",
      whatsapp: "03325554423"
    },
    coordinates: {
      lat: 33.6934,
      lng: 73.0118
    }
  },
  {
    id: "prop-04",
    title: "Sprawling 4 Kanal Country Estate Farmhouse in Gulberg Greens",
    slug: "luxury-4-kanal-farmhouse-gulberg-greens",
    purpose: "sale",
    propertyType: "Farmhouse",
    price: 185000000,
    priceFormatted: "PKR 18.50 Crore",
    location: "Executive Block, Gulberg Greens, Islamabad Expressway",
    city: "Islamabad",
    sector: "Gulberg Greens",
    areaSize: "4 Kanal (2,000 Sq Yds)",
    bedrooms: 5,
    bathrooms: 6,
    featured: true,
    badge: "Resort Lifestyle",
    images: [
      ASSET_IMAGES.farmhouseOasis,
      ASSET_IMAGES.heroVilla,
      ASSET_IMAGES.modernHouse
    ],
    description: "Turnkey luxury countryside retreat built on 4 Kanals in Gulberg Greens. Architect-crafted single-story contemporary villa with heated infinity pool, private citrus & olive orchard, manicured lawn with automated sprinklers, BBQ gazebo, and independent security outpost.",
    features: [
      "4 Kanal Freehold Land Area",
      "Outdoor Heated Pool & Pergola",
      "5 King Suites with Dressing Ensuites",
      "Automated Drip Irrigation System",
      "Solar Microgrid with Battery Storage",
      "Independent Guard Room & Staff Quarters"
    ],
    addedDate: "2026-10-22",
    contactPerson: {
      name: "Majid Real Estate Luxury Division",
      phone: "03325554423",
      whatsapp: "03325554423"
    },
    coordinates: {
      lat: 33.6015,
      lng: 73.1362
    }
  },
  {
    id: "prop-05",
    title: "Brand New 10 Marla Modern House for Rent in G-11/2",
    slug: "10-marla-modern-house-rent-g11",
    purpose: "rent",
    propertyType: "House / Villa",
    price: 240000,
    priceFormatted: "PKR 2.40 Lac / Month",
    location: "Sector G-11/2, Near Park & Markaz, Islamabad",
    city: "Islamabad",
    sector: "G-11",
    areaSize: "10 Marla (250 Sq Yds)",
    bedrooms: 5,
    bathrooms: 5,
    featured: false,
    badge: "For Rent",
    images: [
      ASSET_IMAGES.modernHouse,
      ASSET_IMAGES.heroVilla
    ],
    description: "Immaculately maintained 10 Marla modern house available for rent in prime sector G-11/2. Walking distance to community park, international schools, and G-11 Markaz. Separate electric and gas meters, solid woodwork, clean water supply, and ideal setup for executive families or embassy personnel.",
    features: [
      "5 Bed with Attached Baths",
      "Separate Units Setup (Upper & Lower)",
      "2 Contemporary Kitchens",
      "Parking for 2 SUVs",
      "Gas & Electric Independent Meters",
      "Walking Distance to G-11 Markaz"
    ],
    addedDate: "2026-10-24",
    contactPerson: {
      name: "Majid Real Estate Rental Team",
      phone: "03325554423",
      whatsapp: "03325554423"
    },
    coordinates: {
      lat: 33.6734,
      lng: 73.0019
    }
  },
  {
    id: "prop-06",
    title: "Corporate Floor Office in Blue Area Business Tower",
    slug: "corporate-office-blue-area-islamabad",
    purpose: "rent",
    propertyType: "Commercial Office / Shop",
    price: 650000,
    priceFormatted: "PKR 6.50 Lac / Month",
    location: "Jinnah Avenue, Blue Area, Islamabad",
    city: "Islamabad",
    sector: "Blue Area",
    areaSize: "4,200 Sq Ft",
    featured: false,
    badge: "Corporate Grade",
    images: [
      ASSET_IMAGES.commercialTower,
      ASSET_IMAGES.luxuryApartment
    ],
    description: "Fully furnished Grade-A corporate office floor in premier Blue Area high-rise. Ready to occupy with 40 workstation cubicles, 4 executive director cabins, 16-seat multimedia board room, server room with precision cooling, and executive pantry.",
    features: [
      "4,200 Sq Ft Dedicated Floor",
      "Central HVAC & 100% Power Generator Backup",
      "Executive Boardroom with Video Conferencing",
      "Fiber Optic Dual Internet Redundancy",
      "Basement Parking for 8 Corporate Vehicles",
      "Close to Metro Bus Station"
    ],
    addedDate: "2026-10-21",
    contactPerson: {
      name: "Majid Real Estate Commercial Dept",
      phone: "03325554423",
      whatsapp: "03325554423"
    },
    coordinates: {
      lat: 33.7121,
      lng: 73.0543
    }
  },
  {
    id: "prop-07",
    title: "Corner 1 Kanal Residential Plot in DHA Phase 2, Islamabad",
    slug: "corner-1-kanal-plot-dha-phase-2",
    purpose: "sale",
    propertyType: "Residential Plot",
    price: 49500000,
    priceFormatted: "PKR 4.95 Crore",
    location: "Sector B, DHA Phase 2, Islamabad",
    city: "Islamabad",
    sector: "DHA Phase 2",
    areaSize: "1 Kanal (500 Sq Yds)",
    featured: false,
    badge: "Investment Ready",
    images: [
      ASSET_IMAGES.heroVilla,
      ASSET_IMAGES.modernHouse
    ],
    description: "Hot listing corner 1 Kanal residential plot in DHA Phase 2 Sector B. Level ground, solid soil, front facing 60 ft boulevard with park nearby. Completely cleared dues, possession granted, utility connections ready for immediate luxury construction.",
    features: [
      "1 Kanal (500 Sq Yards) Corner Plot",
      "Frontage on 60 ft Wide Main Avenue",
      "Immediate Possession & All Dues Paid",
      "Gated Community with 24/7 DHA Security",
      "Close to Commercial Broadway & Jacaranda Club"
    ],
    addedDate: "2026-10-25",
    contactPerson: {
      name: "Majid Real Estate Plots Specialist",
      phone: "03325554423",
      whatsapp: "03325554423"
    },
    coordinates: {
      lat: 33.5283,
      lng: 73.1611
    }
  },
  {
    id: "prop-08",
    title: "Furnished Luxury 2-Bed Residence in E-11 MPCHS",
    slug: "furnished-2-bed-apartment-e11",
    purpose: "rent",
    propertyType: "Apartment / Flat",
    price: 130000,
    priceFormatted: "PKR 1.30 Lac / Month",
    location: "Multi Gardens, Sector E-11/3, Islamabad",
    city: "Islamabad",
    sector: "E-11",
    areaSize: "1,450 Sq Ft",
    bedrooms: 2,
    bathrooms: 2,
    featured: false,
    badge: "Fully Furnished",
    images: [
      ASSET_IMAGES.luxuryApartment,
      ASSET_IMAGES.modernHouse
    ],
    description: "Modern interior-designed 2 bedroom fully furnished apartment in high-demand residential tower in E-11. Includes high-efficiency inverter ACs, imported kitchen appliances, LED smart TVs, comfortable orthopedic mattresses, and secure building lobby.",
    features: [
      "2 Bedrooms with Attached Baths",
      "Fully Furnished with Modern Furniture",
      "Inverter ACs in All Rooms",
      "High Speed Elevators with Backup",
      "Secured Basement Parking",
      "CCTV Monitored Building"
    ],
    addedDate: "2026-10-23",
    contactPerson: {
      name: "Majid Real Estate Leasing",
      phone: "03325554423",
      whatsapp: "03325554423"
    },
    coordinates: {
      lat: 33.6989,
      lng: 72.9867
    }
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-01",
    title: "Al Anyat Executive Heights",
    tagline: "Premier Mixed-Use Commercial & Business Arcade in G-11 Markaz",
    location: "G-11 Markaz, Islamabad",
    sector: "G-11",
    types: ["Retail Outlets", "Corporate Offices", "Executive Studios"],
    priceRange: "Starting from PKR 1.85 Crore",
    status: "Ready for Possession",
    image: ASSET_IMAGES.commercialTower,
    description: "Located right in the premier commercial node of G-11 Markaz, Al Anyat Executive Heights provides modern retail spaces, bank-ready branch locations, and corporate chambers designed to service the rapidly expanding high-income population of Sector G-10, G-11, and F-11.",
    highlights: [
      "High footfall prime G-11 Markaz position",
      "Generous parking & wide pedestrian walkways",
      "High-speed escalators and passenger lifts",
      "Uninterrupted generator power supply"
    ]
  },
  {
    id: "proj-02",
    title: "Margalla View Signature Villas",
    tagline: "Ultra-Contemporary Custom Designed 1 & 2 Kanal Residences",
    location: "Sector F-10 & Margalla Foothills, Islamabad",
    sector: "F-10",
    types: ["1 Kanal Villas", "2 Kanal Estates", "Designer Mansions"],
    priceRange: "PKR 12.50 Crore – PKR 28 Crore",
    status: "Under Construction",
    image: ASSET_IMAGES.heroVilla,
    description: "A boutique development of private residences combining state-of-the-art seismic engineering, expansive floor plans, private swimming pools, and sustainable photovoltaic microgrids nestled beneath the Margalla hills.",
    highlights: [
      "Custom architectural personalization options",
      "Bespoke Italian kitchen fittings and marble",
      "Private swimming pool & landscaped gardens",
      "3-tier perimeter smart surveillance"
    ]
  },
  {
    id: "proj-03",
    title: "Gulberg Greens Agro Residencia",
    tagline: "4 to 8 Kanal Green Farmhouse Enclave on Islamabad Expressway",
    location: "Gulberg Greens Agro Farms, Islamabad",
    sector: "Gulberg Greens",
    types: ["4 Kanal Farmhouses", "8 Kanal Agro Estates"],
    priceRange: "PKR 16 Crore – PKR 35 Crore",
    status: "Booking Open",
    image: ASSET_IMAGES.farmhouseOasis,
    description: "Designed for families seeking tranquility, fresh mountain air, and privacy. Lush paved wide avenues, underground electricity, sports club, and lakeside walking trails just 15 minutes drive from Islamabad downtown.",
    highlights: [
      "Broad 120 ft and 80 ft landscaped avenues",
      "Underground utility lines & fiber internet",
      "Exclusive equestrian club and golf greens nearby",
      "Guaranteed clear CDA approved master plan"
    ]
  }
];

export const AREAS_DATA: AreaInfo[] = [
  {
    id: "g-11",
    name: "G-11 Markaz & Sectors",
    tag: "Our Primary Headquarters",
    description: "Islamabad's premier central residential and commercial sector with thriving shopping centers, banks, schools, and direct connectivity to Kashmir Highway.",
    propertyCount: 38,
    image: ASSET_IMAGES.commercialTower,
    avgPriceKanal: "PKR 9.5 – 14.5 Crore"
  },
  {
    id: "f-10",
    name: "F-10 & F-11 Sectors",
    tag: "Elite Capital Living",
    description: "High-value established residential sector adjacent to Fatima Jinnah Park (F-9), offering top luxury villas, penthouses, and premier cafes.",
    propertyCount: 29,
    image: ASSET_IMAGES.heroVilla,
    avgPriceKanal: "PKR 14 – 22 Crore"
  },
  {
    id: "blue-area",
    name: "Blue Area Commercial",
    tag: "Corporate Heart of Islamabad",
    description: "The primary financial and business avenue running along Jinnah Avenue, housing multinational headquarters, banks, and major retailers.",
    propertyCount: 16,
    image: ASSET_IMAGES.luxuryApartment,
    avgPriceKanal: "High Demand Commercial"
  },
  {
    id: "gulberg-greens",
    name: "Gulberg Greens",
    tag: "Luxury Agro Farmhouses",
    description: "Expansive green farmhouses and modern residential housing societies with clean air, scenic waterways, and serene country living.",
    propertyCount: 22,
    image: ASSET_IMAGES.farmhouseOasis,
    avgPriceKanal: "PKR 3.8 – 5.5 Crore / Kanal"
  },
  {
    id: "dha-islamabad",
    name: "DHA Islamabad (Phases 1-5)",
    tag: "Secure Planned Community",
    description: "Top-tier gated suburban society with international standard amenities, wide boulevards, Jacaranda Family Club, and strong resale liquidity.",
    propertyCount: 44,
    image: ASSET_IMAGES.modernHouse,
    avgPriceKanal: "PKR 4.2 – 6.8 Crore"
  },
  {
    id: "e-11",
    name: "Sector E-11 & MPCHS",
    tag: "High-Yield Apartments",
    description: "Scenic sector at the foot of Margalla Hills featuring modern high-rise apartment towers and thriving rental demand.",
    propertyCount: 25,
    image: ASSET_IMAGES.luxuryApartment,
    avgPriceKanal: "PKR 8.5 – 12.0 Crore"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    clientName: "Tariq Mahmood",
    clientRole: "Overseas Pakistani (UK Resident)",
    propertySector: "Purchased 1 Kanal House in G-11/3",
    feedback: "Being based in London, buying property in Islamabad used to be daunting. The team at Majid Real Estate handled every step with absolute transparency, from verifying the CDA title deed to managing the transfer at the CDA office. Could not recommend them more highly.",
    date: "September 2026"
  },
  {
    id: "test-2",
    clientName: "Malik Usman Arshad",
    clientRole: "Commercial Investor",
    propertySector: "Acquired Commercial Shop in G-11 Markaz",
    feedback: "Majid Real Estate has been my trusted advisor in G-11 Markaz for over five years. They guided me into an income-generating retail property with strong tenant covenants and solid rental yield. Their localized market knowledge is second to none.",
    date: "August 2026"
  },
  {
    id: "test-3",
    clientName: "Dr. Ayesha Siddiqui",
    clientRole: "Consultant Physician",
    propertySector: "Leased Executive Residence in F-10",
    feedback: "Professional, punctual, and straightforward. They listened to our specific requirements for our clinic and family residence, arranged site visits without pressure, and helped finalize the lease agreement smoothly.",
    date: "July 2026"
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    category: "Buying",
    question: "How does Majid Real Estate verify property documents before purchase?",
    answer: "Every property we list undergoes strict verification. We verify the allotment letter, transfer letter, non-encumbrance status (NEC), CDA layout approval, and ensure zero outstanding property taxes or litigation before presenting it to a buyer."
  },
  {
    category: "Buying",
    question: "What are the standard steps for purchasing a property in Islamabad?",
    answer: "The process begins with agreeing upon terms and signing a formal Token / Bayana agreement. We then verify all records with CDA or DHA authorities, prepare transfer documents, obtain NOCs, and accompany you to the official transfer interview."
  },
  {
    category: "Selling",
    question: "How can I list my house or commercial shop with Majid Real Estate?",
    answer: "You can submit your property details directly through our 'Sell / List Property' form on this website or visit our office at Shop 26 Basement, Al Anyat Shopping Mall, G-11 Markaz. We conduct a valuation and market your property to verified active buyers."
  },
  {
    category: "Investment",
    question: "Why is G-11 Markaz considered a prime commercial investment in Islamabad?",
    answer: "G-11 is centrally located along Kashmir Highway with direct access to New Islamabad International Airport, Blue Area, and motorway networks. G-11 Markaz has dense footfall, active banking branches, and consistent commercial appreciation."
  },
  {
    category: "Renting",
    question: "Do you handle tenant agreements and property management for overseas owners?",
    answer: "Yes, we provide end-to-end management for expatriates and overseas Pakistanis. We screen tenants, draft legal lease deeds in accordance with Islamabad tenancy laws, collect security deposits, and oversee property upkeep."
  },
  {
    category: "General",
    question: "Where is your office located and what are your business hours?",
    answer: "Our office is at Shop no 26 Basement, Al Anyat Shopping Mall, G-11 Markaz, Islamabad. We are open Monday to Saturday from 10:00 AM to 8:00 PM (Friday break 1:00 PM to 2:30 PM)."
  }
];
