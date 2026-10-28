import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Menu, X, Building2 } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/companyData';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenListProperty: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  onOpenListProperty
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'buy', label: 'Buy' },
    { id: 'rent', label: 'Rent' },
    { id: 'projects', label: 'Projects' },
    { id: 'areas', label: 'Areas' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>G-11 Markaz, Islamabad, Pakistan</span>
            </span>
            <span className="hidden sm:inline text-slate-500">·</span>
            <span className="hidden sm:inline text-slate-400">
              Mon – Sat: 10:00 AM – 8:00 PM
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.contactNumber}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-mono tabular-nums">{COMPANY_INFO.contactNumber}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={getWhatsAppUrl("Hello Majid Real Estate, I would like to inquire about properties in Islamabad.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation - Strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-hidden"
          >
            <div className="w-11 h-11 rounded-lg bg-black flex items-center justify-center shadow-xs border border-slate-800 overflow-hidden group-hover:border-amber-400/60 transition-colors shrink-0">
              <img
                src={COMPANY_INFO.logoUrl}
                alt="Majid Real Estate (MRE)"
                className="w-full h-full object-contain p-0.5"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = COMPANY_INFO.originalLogoUrl;
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-heading leading-tight group-hover:text-amber-700 transition-colors">
                Majid Real Estate
              </span>
              <span className="text-[11px] tracking-wider uppercase text-slate-500 font-medium">
                G-11 Markaz · Islamabad
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 whitespace-nowrap transition-colors cursor-pointer text-sm ${
                    isActive
                      ? 'text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenListProperty}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer whitespace-nowrap"
            >
              List Your Property
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-150">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 text-left text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenListProperty();
              }}
              className="w-full py-2.5 px-4 text-center text-xs uppercase tracking-wider font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors cursor-pointer"
            >
              List Your Property
            </button>
            <a
              href={`tel:${COMPANY_INFO.contactNumber}`}
              className="w-full py-2 px-4 text-center text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Call Us: {COMPANY_INFO.contactNumber}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
