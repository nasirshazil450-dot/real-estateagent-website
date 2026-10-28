import React from 'react';
import { Building2, Phone, MessageCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/companyData';

interface FooterProps {
  setActivePage: (page: string) => void;
  onFilterCategory?: (type: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Introduction */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-black flex items-center justify-center border border-slate-800 overflow-hidden shrink-0">
                <img
                  src={COMPANY_INFO.logoUrl}
                  alt={COMPANY_INFO.name}
                  className="w-full h-full object-contain p-0.5"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = COMPANY_INFO.originalLogoUrl;
                  }}
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-heading">
                  {COMPANY_INFO.name}
                </span>
                <p className="text-xs text-amber-400/90 font-medium">
                  G-11 Markaz · Islamabad, Pakistan
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              A trusted real estate advisory providing specialized property buying, selling, leasing, and high-yield investment services across Islamabad and Rawalpindi. Located centrally in G-11 Markaz.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 rounded-lg text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Direct: {COMPANY_INFO.contactNumber}
              </a>
              <a
                href={`tel:${COMPANY_INFO.contactNumber}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                Call: {COMPANY_INFO.contactNumber}
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200 font-heading">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'home', label: 'Home' },
                { id: 'properties', label: 'All Properties' },
                { id: 'buy', label: 'Properties for Sale' },
                { id: 'rent', label: 'Properties for Rent' },
                { id: 'projects', label: 'New Developments' },
                { id: 'areas', label: 'Islamabad Sectors' },
                { id: 'about', label: 'About Company' },
                { id: 'contact', label: 'Contact Us' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActivePage(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Sectors & Locations */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200 font-heading">
              Prime Locations
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {[
                'G-11 Markaz (Our Base)',
                'G-11/1, G-11/2, G-11/3, G-11/4',
                'Sector F-10 & F-11',
                'Blue Area Corporate Hub',
                'DHA Islamabad Phases',
                'Gulberg Greens Agro Farms',
                'Sector E-11 Residencia',
                'Bahria Town Rawalpindi'
              ].map((loc, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-400/60" />
                  <span>{loc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200 font-heading">
              Head Office
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug">
                  {COMPANY_INFO.officeAddress}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.contactNumber}`}
                  className="text-slate-300 hover:text-white transition-colors font-mono tabular-nums"
                >
                  {COMPANY_INFO.contactNumber}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="pt-2 text-xs text-slate-500">
                {COMPANY_INFO.businessHours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. Islamabad, Pakistan.
          </p>
          <div className="flex items-center gap-6">
            <span>Verified Property Advisory</span>
            <span>·</span>
            <span>CDA Regulatory Compliance Guidance</span>
            <span>·</span>
            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              Consult an Advisor <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
