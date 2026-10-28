import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  FileCheck2, 
  Users, 
  PhoneCall, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  ChevronDown, 
  AlertCircle,
  Building,
  Key,
  Compass
} from 'lucide-react';
import { Property, Project } from '../types/property';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/companyData';
import { PROPERTIES_DATA, PROJECTS_DATA, AREAS_DATA, TESTIMONIALS_DATA, FAQS_DATA, ASSET_IMAGES } from '../data/propertiesData';
import { PropertyCard } from '../components/PropertyCard';
import { SearchFilterBar, FilterState } from '../components/SearchFilterBar';

interface HomePageProps {
  onSelectProperty: (property: Property) => void;
  setActivePage: (page: string) => void;
  onFilterBySector: (sector: string) => void;
  onOpenListProperty: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProperty,
  setActivePage,
  onFilterBySector,
  onOpenListProperty
}) => {
  // Search & Filter state
  const [filters, setFilters] = useState<FilterState>({
    purpose: 'all',
    sector: 'all',
    propertyType: 'all',
    priceRange: 'all',
    bedrooms: 'all',
    searchTerm: ''
  });

  // Featured properties tab
  const [featuredTab, setFeaturedTab] = useState<'all' | 'sale' | 'rent' | 'commercial'>('all');

  // FAQ open item
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactInterest, setContactInterest] = useState('Buying a House / Villa in G-11');
  const [contactBudget, setContactBudget] = useState('PKR 2 Crore – 5 Crore');
  const [contactMessage, setContactMessage] = useState('');
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Selected project for quick view
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter featured properties based on tab
  const featuredProperties = PROPERTIES_DATA.filter((p) => {
    if (featuredTab === 'sale') return p.purpose === 'sale';
    if (featuredTab === 'rent') return p.purpose === 'rent';
    if (featuredTab === 'commercial') return p.propertyType.includes('Commercial');
    return true;
  });

  const handleSearchExecute = () => {
    // Navigate to properties page with current filters
    setActivePage('properties');
  };

  const handleResetFilters = () => {
    setFilters({
      purpose: 'all',
      sector: 'all',
      propertyType: 'all',
      priceRange: 'all',
      bedrooms: 'all',
      searchTerm: ''
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!contactName.trim()) errs.name = 'Please provide your full name';
    if (!contactPhone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^(\+92|0)[0-9]{9,10}$/.test(contactPhone.replace(/\s+/g, ''))) {
      errs.phone = 'Please provide a valid Pakistani contact number (e.g. 03325554423)';
    }

    setContactErrors(errs);
    if (Object.keys(errs).length === 0) {
      setContactSubmitted(true);
      // In real scenario this would send via server or client email
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[700px] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSET_IMAGES.heroVilla}
            alt="Luxury Architecture in Islamabad"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs text-amber-300 font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>Serving G-11, F-10, DHA & Islamabad Capital Sectors</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white font-heading tracking-tight max-w-4xl mx-auto text-balance leading-tight">
            Find a Property That Fits Your Vision in Islamabad
          </h1>

          <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            Guiding families and corporate investors through transparent property buying, selling, leasing, and high-growth capital investments in Islamabad.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActivePage('properties')}
              className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-lg shadow-amber-600/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('contact-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-white bg-slate-900/80 hover:bg-slate-900 border border-white/20 rounded-lg transition-all cursor-pointer"
            >
              Contact an Advisor
            </button>

            <a
              href={getWhatsAppUrl("Hello Majid Real Estate, I want to discuss property options in Islamabad.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-950/90 border border-emerald-500/40 rounded-lg transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Integrated Search Filter Bar */}
          <div className="pt-8 max-w-4xl mx-auto text-left">
            <SearchFilterBar
              filters={filters}
              onFilterChange={setFilters}
              onSearch={handleSearchExecute}
              onReset={handleResetFilters}
            />
          </div>
        </div>
      </section>

      {/* 2. TRUST STATS & ACCREDITATION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-xl shadow-md border border-slate-200/90 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {COMPANY_INFO.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-700 font-heading mb-1">
              Curated Portfolio
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Featured Properties in Islamabad
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Hand-picked houses, commercial shops in G-11 Markaz, luxury penthouses, and farmhouses with verified documentation.
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
            {[
              { id: 'all', label: 'All Listings' },
              { id: 'sale', label: 'For Sale' },
              { id: 'rent', label: 'For Rent' },
              { id: 'commercial', label: 'Commercial' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFeaturedTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  featuredTab === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.slice(0, 8).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setActivePage('properties')}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <span>View All Available Properties</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS & DEVELOPMENTS */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-amber-400 font-heading mb-1">
                Commercial & Residential Landmarks
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                Featured Projects & Developments
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Exclusive investment and residential opportunities across G-11 Markaz, Margalla Foothills, and Gulberg Greens.
              </p>
            </div>

            <button
              onClick={() => setActivePage('projects')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PROJECTS_DATA.map((proj) => (
              <div
                key={proj.id}
                className="bg-slate-800/80 rounded-xl overflow-hidden border border-slate-700/80 flex flex-col justify-between hover:border-amber-500/50 transition-all group"
              >
                <div>
                  <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-950">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-slate-950/80 text-[11px] font-semibold text-amber-400">
                      {proj.status}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{proj.location}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-heading group-hover:text-amber-400 transition-colors">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {proj.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      {proj.highlights.slice(0, 2).map((hl, i) => (
                        <div key={i} className="text-xs text-slate-400 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-700/50 mt-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-medium">
                      Investment Demand
                    </span>
                    <span className="text-xs font-bold text-white tabular-nums">
                      {proj.priceRange}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPLORE POPULAR AREAS IN ISLAMABAD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-700 font-heading mb-1">
            Capital Geography
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Explore Key Locations & Sectors
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Our brokerage operations are anchored in G-11 Markaz with comprehensive market coverage across Islamabad&apos;s prime residential and commercial zones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AREAS_DATA.map((area) => (
            <div
              key={area.id}
              onClick={() => onFilterBySector(area.id)}
              className="group relative rounded-xl overflow-hidden border border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-16/9 w-full bg-slate-900 overflow-hidden">
                <img
                  src={area.image}
                  alt={area.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-medium text-amber-400 block mb-0.5">
                    {area.tag}
                  </span>
                  <h3 className="text-base font-bold text-white font-heading">
                    {area.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {area.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    Available: <strong className="text-slate-800">{area.propertyCount}+ listings</strong>
                  </span>
                  <span className="text-amber-700 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    <span>View Properties</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WHY CHOOSE MAJID REAL ESTATE */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-700 font-heading">
              Our Core Strengths
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Why Partner with Majid Real Estate
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear guidance, zero ambiguity, and steadfast support at every stage of your real estate transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Professional Property Guidance",
                desc: "Objective advice grounded in current market valuations, CDA building regulations, and historical price performance in Islamabad."
              },
              {
                icon: FileCheck2,
                title: "Transparent Communication",
                desc: "Every detail regarding ownership records, transfer fees, token structures, and possession timelines is communicated clearly upfront."
              },
              {
                icon: MapPin,
                title: "Local Market Knowledge",
                desc: "Headquartered in G-11 Markaz with over 15 years on-ground presence, giving us intimate awareness of upcoming development and true street-level value."
              },
              {
                icon: Compass,
                title: "Personalized Recommendations",
                desc: "We match your budget, lifestyle preferences, and return targets to carefully screened properties instead of pushing unvetted inventory."
              },
              {
                icon: Users,
                title: "Comprehensive Transaction Support",
                desc: "End-to-end facilitation from initial site visit to legal drafting, token payment, CDA/DHA verification, and the final transfer interview."
              },
              {
                icon: PhoneCall,
                title: "Direct Advisor Availability",
                desc: "Direct accessibility through phone and WhatsApp with prompt follow-ups. No bureaucratic red tape or delayed communication."
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS (4-STEP PROCESS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-700 font-heading">
            Simple & Transparent
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A structured four-step journey designed to protect your investment and save your valuable time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Share Your Requirements",
              desc: "Tell us your preferred sector (G-11, F-10, DHA, etc.), budget range, property category, and family or investment goals."
            },
            {
              step: "02",
              title: "Explore Suitable Properties",
              desc: "Receive a curated selection of genuine, verified listings that closely match your criteria with verified ownership titles."
            },
            {
              step: "03",
              title: "Arrange a Site Visit",
              desc: "Our advisor accompanies you for a comprehensive on-ground inspection of the location, build quality, and neighborhood."
            },
            {
              step: "04",
              title: "Guidance Through Transaction",
              desc: "We assist through documentation, negotiation, legal agreement drafting, and seamless CDA or DHA transfer execution."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200/90 relative space-y-3">
              <span className="text-2xl font-black text-slate-200 font-heading tabular-nums block">
                {item.step}
              </span>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ABOUT COMPANY OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 lg:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-400 font-heading">
              About Majid Real Estate
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Grounded in G-11 Markaz, Dedicated to Islamabad
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Majid Real Estate operates from our established headquarters at Shop no 26 Basement, Al Anyat Shopping Mall, G-11 Markaz. We represent property buyers, private sellers, commercial business owners, and expatriate Pakistanis seeking dependable real estate advisory in the federal capital.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Whether you are looking to purchase a luxury 1 Kanal villa in G-11 or F-10, lease a corporate office in Blue Area, or secure commercial retail spaces with steady yields, our team provides transparent analysis and reliable execution.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setActivePage('about')}
                className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                Learn More About Us
              </button>
              <button
                onClick={onOpenListProperty}
                className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                List Your Property With Us
              </button>
            </div>
          </div>

          <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-slate-700">
            <img
              src={ASSET_IMAGES.commercialTower}
              alt="Al Anyat Shopping Mall G-11 Markaz"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950/90 to-transparent">
              <span className="text-xs font-semibold text-white block">
                Office Location: Al Anyat Shopping Mall, G-11 Markaz
              </span>
              <span className="text-[11px] text-slate-300">
                Open Monday to Saturday for in-person consultations
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-700 font-heading">
            Client Experiences
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Feedback from Property Buyers & Owners
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real feedback from overseas Pakistanis, commercial investors, and local families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;{t.feedback}&rdquo;
              </p>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 font-heading">
                  {t.clientName}
                </h4>
                <p className="text-[11px] text-amber-700 font-medium">
                  {t.clientRole}
                </p>
                <div className="text-[11px] text-slate-400 mt-1">
                  {t.propertySector} · {t.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-700 font-heading">
            Clear Answers
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Key insights on purchasing, documentation, transfers, and investing in Islamabad.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/90 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900 font-heading">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. CONTACT & ENQUIRY SECTION */}
      <section id="contact-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Office Info & Map representation */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-8 lg:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold font-heading block mb-1">
                  Visit Our Office
                </span>
                <h3 className="text-2xl font-bold text-white font-heading">
                  Get in Touch with Majid Real Estate
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Have a specific sector requirement or property to sell? Our advisors are available in G-11 Markaz for meetings and site visits.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block font-medium">Office Address:</span>
                    <span className="text-slate-100 font-semibold">{COMPANY_INFO.officeAddress}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block font-medium">Direct Call:</span>
                    <a href={`tel:${COMPANY_INFO.contactNumber}`} className="text-slate-100 font-mono font-semibold hover:text-amber-400 transition-colors">
                      {COMPANY_INFO.contactNumber}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block font-medium">WhatsApp:</span>
                    <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-mono font-semibold hover:text-emerald-300 transition-colors">
                      {COMPANY_INFO.whatsappNumber}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block font-medium">Business Hours:</span>
                    <span className="text-slate-200">{COMPANY_INFO.businessHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Preview for G-11 Markaz */}
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-3 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span className="font-semibold text-amber-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> G-11 Markaz, Islamabad
                </span>
                <span className="text-slate-500">Shop #26 Al Anyat Mall</span>
              </div>
              <div className="aspect-16/9 rounded-lg bg-slate-800 flex items-center justify-center text-center p-3 relative overflow-hidden">
                <iframe
                  title="Majid Real Estate Office Location"
                  src="https://maps.google.com/maps?q=Al%20Anyat%20Shopping%20Mall%20G-11%20Markaz%20Islamabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 absolute inset-0 opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right: Validated Enquiry Form */}
          <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-center">
            {contactSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-bold text-slate-900 font-heading">
                    Thank You, {contactName}!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Your enquiry regarding <span className="font-semibold text-slate-800">{contactInterest}</span> has been received. One of our property consultants will call you at <span className="font-mono font-semibold">{contactPhone}</span> promptly.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppUrl(`Hello Majid Real Estate, I submitted an enquiry on your website regarding ${contactInterest} (Budget: ${contactBudget}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm via WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName('');
                      setContactPhone('');
                      setContactEmail('');
                      setContactMessage('');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Send an Enquiry to Our Advisory Desk
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out this form and we will connect you directly with our specialized Islamabad property agent.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Asim Raza"
                      value={contactName}
                      onChange={(e) => {
                        setContactName(e.target.value);
                        if (contactErrors.name) setContactErrors({ ...contactErrors, name: '' });
                      }}
                      className={`w-full h-10 px-3 bg-slate-50 border rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden ${
                        contactErrors.name ? 'border-red-500' : 'border-slate-200'
                      }`}
                    />
                    {contactErrors.name && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {contactErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 03325554423"
                      value={contactPhone}
                      onChange={(e) => {
                        setContactPhone(e.target.value);
                        if (contactErrors.phone) setContactErrors({ ...contactErrors, phone: '' });
                      }}
                      className={`w-full h-10 px-3 bg-slate-50 border rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden ${
                        contactErrors.phone ? 'border-red-500' : 'border-slate-200'
                      }`}
                    />
                    {contactErrors.phone && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {contactErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                      Property Interest
                    </label>
                    <select
                      value={contactInterest}
                      onChange={(e) => setContactInterest(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden"
                    >
                      <option value="Buying a House / Villa in G-11">Buying a House in G-11</option>
                      <option value="Commercial Shop / Space in G-11 Markaz">Commercial Shop in G-11 Markaz</option>
                      <option value="Luxury Villa in F-10 / Margalla Foothills">Luxury Villa in F-10</option>
                      <option value="Rental Residence or Apartment">Rental Residence or Apartment</option>
                      <option value="Residential Plot in DHA / Gulberg">Residential Plot in DHA / Gulberg</option>
                      <option value="Selling / Listing My Property">Selling / Listing My Property</option>
                      <option value="General Investment Consultancy">General Investment Consultancy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                    Target Budget (PKR)
                  </label>
                  <select
                    value={contactBudget}
                    onChange={(e) => setContactBudget(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden"
                  >
                    <option value="Under PKR 50 Lac">Under PKR 50 Lac</option>
                    <option value="PKR 50 Lac – 1.5 Crore">PKR 50 Lac – 1.5 Crore</option>
                    <option value="PKR 1.5 Crore – 3 Crore">PKR 1.5 Crore – 3 Crore</option>
                    <option value="PKR 3 Crore – 6 Crore">PKR 3 Crore – 6 Crore</option>
                    <option value="PKR 6 Crore – 15 Crore">PKR 6 Crore – 15 Crore</option>
                    <option value="Above PKR 15 Crore">Above PKR 15 Crore</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                    Your Requirements & Questions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us any specific preferences (e.g., corner plot, brand new construction, rental yield expectations)..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 text-xs uppercase tracking-wider font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm border border-slate-800 hover:border-amber-400 transition-all cursor-pointer"
                >
                  Submit Enquiry to Majid Real Estate
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Quick Project Modal when clicked */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            >
              ✕
            </button>
            <div className="aspect-16/9 rounded-xl overflow-hidden bg-slate-900">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xs uppercase text-amber-700 font-bold">{selectedProject.status}</span>
              <h3 className="text-xl font-bold text-slate-900 font-heading">{selectedProject.title}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3.5 h-3.5 text-amber-600" /> {selectedProject.location}</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedProject.description}</p>
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Price Range</span>
                <span className="text-sm font-bold text-slate-900 font-heading">{selectedProject.priceRange}</span>
              </div>
              <a
                href={getWhatsAppUrl(`Hello Majid Real Estate, I want to inquire about project details for ${selectedProject.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
