export const COMPANY_INFO = {
  name: "Majid Real Estate",
  logoUrl: "/assets/aistudio/logo_square.png",
  originalLogoUrl: "/assets/aistudio/unnamed_9a3331e6.webp",
  tagline: "Your Premier Property Consultant in Islamabad",
  subTagline: "Specializing in G-11 Markaz, Capital Sectors, Luxury Residences & High-Yield Commercial Assets",
  primaryLocation: "G-11, Islamabad",
  businessType: "Real Estate Agent & Investment Consultancy",
  contactNumber: "03325554423",
  contactNumberFormatted: "+92 332 5554423",
  whatsappNumber: "03325554423",
  whatsappLink: "https://wa.me/923325554423",
  email: "info@majidrealestate.pk",
  officeAddress: "Shop no 26 Basement, Al Anyat Shopping Mall, G-11 Markaz G 11 Markaz G-11, Islamabad, 44000, Pakistan",
  businessHours: "Monday – Saturday: 10:00 AM – 8:00 PM (Friday break: 1:00 PM – 2:30 PM, Closed Sunday)",
  
  services: [
    { title: "Property Buying", description: "Vetted residential and commercial properties with verified CDA documentation and clear titles." },
    { title: "Property Selling", description: "Strategic marketing to active buyers, verified investors, and overseas Pakistani diaspora." },
    { title: "Property Renting", description: "Seamless leasing for furnished residences, executive apartments, and commercial office spaces." },
    { title: "Investment Consultancy", description: "In-depth ROI forecasting, capital appreciation analyses, and market trends across Islamabad." },
    { title: "Property Management", description: "Tenant management, maintenance coordination, and rent collection for absentee owners." },
    { title: "Property Listings", description: "Complimentary listing evaluation and digital syndication across our investor network." }
  ],

  propertyTypes: [
    "Beach property rentals and sales",
    "Building lot sales",
    "Buying agent services",
    "Commercial property buying and sales",
    "Farm sales",
    "Furnished property rentals and sales",
    "International property buying and sales",
    "Land leasing and sales",
    "Luxury property buying and sales",
    "New construction services",
    "Project management",
    "Property auctions",
    "Property buying and sales",
    "Property exchanges",
    "Property management",
    "Property rentals",
    "Property development",
    "Property investing",
    "Property sales management",
    "Seller's agent services",
    "Short-term property rentals",
    "Warehouse property sales"
  ],

  stats: [
    { value: "15+", label: "Years Local Islamabad Experience" },
    { value: "PKR 4.2B+", label: "Property Value Transacted" },
    { value: "950+", label: "Satisfied Homeowners & Investors" },
    { value: "100%", label: "Documented & Verified Titles" }
  ]
};

export const getWhatsAppUrl = (customMessage?: string) => {
  const base = "https://wa.me/923325554423";
  if (!customMessage) {
    return `${base}?text=${encodeURIComponent("Hello Majid Real Estate, I am interested in consulting about properties in Islamabad.")}`;
  }
  return `${base}?text=${encodeURIComponent(customMessage)}`;
};
