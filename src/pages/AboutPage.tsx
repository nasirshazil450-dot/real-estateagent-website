import React from 'react';
import { Building2, MapPin, Phone, MessageCircle, Mail, ShieldCheck, CheckCircle2, Award, Clock } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/companyData';
import { ASSET_IMAGES } from '../data/propertiesData';

interface AboutPageProps {
  onOpenListProperty: () => void;
  setActivePage: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenListProperty, setActivePage }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-700 font-heading">
            Company Overview
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 font-heading tracking-tight leading-tight">
            About {COMPANY_INFO.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {COMPANY_INFO.name} is a premier property brokerage and investment consultancy firm headquartered at Shop no 26 Basement, Al Anyat Shopping Mall, G-11 Markaz, Islamabad.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Founded on the core principles of transparent title verification, on-ground market intelligence, and dedicated client advocacy, we have facilitated high-value transactions across Islamabad&apos;s most sought-after sectors. We specialize in residential houses, luxury villas, commercial shops, executive offices, and strategic land investments.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onOpenListProperty}
              className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              List Your Property
            </button>
            <a
              href={`tel:${COMPANY_INFO.contactNumber}`}
              className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>Call: {COMPANY_INFO.contactNumber}</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <img
            src={ASSET_IMAGES.commercialTower}
            alt="Majid Real Estate G-11 Markaz Office"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950/90 to-transparent text-white">
            <span className="text-xs font-semibold block">Primary Office: G-11 Markaz</span>
            <span className="text-[11px] text-slate-300">Al Anyat Shopping Mall, Islamabad</span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-700 font-heading mb-1">
            What We Do
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Our Core Real Estate Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Providing full-spectrum real estate services for homeowners, investors, and businesses across the federal capital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANY_INFO.services.map((srv, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {srv.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {srv.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Property Types Covered Section */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 lg:p-10 border border-slate-800 space-y-6">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-400 font-heading mb-1">
            Specialized Scope
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Comprehensive Property Types Handled
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            From single-unit residential homes to multi-story commercial buildings and agricultural farmland, our experience spans every facet of real estate:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
          {COMPANY_INFO.propertyTypes.map((type, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Office & Contact Box */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-xs space-y-6">
        <h3 className="text-xl font-bold text-slate-900 font-heading">
          Visit Our G-11 Markaz Office
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="space-y-1">
            <span className="font-semibold text-slate-900 block text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-600" /> Office Location
            </span>
            <p className="leading-relaxed">{COMPANY_INFO.officeAddress}</p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-slate-900 block text-sm flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" /> Working Hours
            </span>
            <p className="leading-relaxed">{COMPANY_INFO.businessHours}</p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-slate-900 block text-sm flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-amber-600" /> Direct Advisory
            </span>
            <p className="leading-relaxed font-mono">
              Phone: {COMPANY_INFO.contactNumber}<br />
              WhatsApp: {COMPANY_INFO.whatsappNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
