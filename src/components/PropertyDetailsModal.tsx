import React, { useState } from 'react';
import { X, MapPin, Bed, Bath, Maximize2, MessageCircle, Phone, Share2, Check, CheckCircle2, Building2 } from 'lucide-react';
import { Property } from '../types/property';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/companyData';
import { PROPERTIES_DATA } from '../data/propertiesData';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  onSelectSimilarProperty: (prop: Property) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
  onSelectSimilarProperty
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!property) return null;

  const similarProperties = PROPERTIES_DATA.filter(
    (p) => p.id !== property.id && (p.sector === property.sector || p.purpose === property.purpose)
  ).slice(0, 3);

  const whatsappMessage = `Hello Majid Real Estate,\nI am inquiring about the listing: *${property.title}*\nPrice: ${property.priceFormatted}\nLocation: ${property.location}\nProperty ID: ${property.id}\nKindly provide verification details and schedule a site visit.`;

  const handleShare = () => {
    const url = `${window.location.origin}/#property-${property.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative my-6 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm text-white ${
              property.purpose === 'sale' ? 'bg-slate-900' : 'bg-emerald-700'
            }`}>
              {property.purpose === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {property.propertyType}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          {/* Main Visual Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-slate-900">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-slate-950/70 backdrop-blur-xs text-white text-xs font-mono">
                {activeImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-amber-500 scale-102 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title, Location & Price Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 font-heading">
                {property.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{property.location}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">{property.city}</span>
              </div>
            </div>

            <div className="lg:text-right shrink-0 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1 font-semibold">
                Demand / Price
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading tabular-nums block">
                {property.priceFormatted}
              </span>
            </div>
          </div>

          {/* Quick Specifications Strip (Zero-Pill Discipline) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium block">
                Plot / Covered Area
              </span>
              <div className="flex items-center gap-1.5 mt-1 text-slate-900 font-semibold text-sm">
                <Maximize2 className="w-4 h-4 text-amber-600" />
                <span>{property.areaSize}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium block">
                Property Purpose
              </span>
              <span className="mt-1 font-semibold text-slate-900 text-sm block">
                {property.purpose === 'sale' ? 'Purchase / For Sale' : 'Rental Lease'}
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium block">
                Bedrooms
              </span>
              <div className="flex items-center gap-1.5 mt-1 text-slate-900 font-semibold text-sm">
                <Bed className="w-4 h-4 text-amber-600" />
                <span>{property.bedrooms ? `${property.bedrooms} Bed` : 'N/A'}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium block">
                Bathrooms
              </span>
              <div className="flex items-center gap-1.5 mt-1 text-slate-900 font-semibold text-sm">
                <Bath className="w-4 h-4 text-amber-600" />
                <span>{property.bathrooms ? `${property.bathrooms} Bath` : 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Description & Features Split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading mb-3">
                  Property Overview & Description
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading mb-3">
                  Key Amenities & Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Context & Sector Map Notice */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Sector Location & Accessibility</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Situated in {property.location}. Direct road access to Kashmir Highway, Islamabad Srinagar Highway, local commercial hubs, public transit, and top educational institutions.
                </p>
                <div className="text-[11px] text-slate-500 font-mono">
                  GPS Coordinates: {property.coordinates.lat}° N, {property.coordinates.lng}° E · Sector: {property.sector}
                </div>
              </div>
            </div>

            {/* Direct Advisor Card */}
            <div className="space-y-4">
              <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white font-heading">
                      {COMPANY_INFO.name}
                    </h4>
                    <p className="text-xs text-amber-400">
                      G-11 Markaz Advisory Desk
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct inquiries regarding this property are handled by our dedicated Islamabad sector specialists. Title verification and site visits available today.
                </p>

                <div className="space-y-2.5 pt-2">
                  <a
                    href={getWhatsAppUrl(whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${COMPANY_INFO.contactNumber}`}
                    className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Call: {COMPANY_INFO.contactNumber}</span>
                  </a>
                </div>

                <div className="text-[11px] text-slate-400 pt-1 text-center">
                  Office: {COMPANY_INFO.officeAddress}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-heading mb-4">
                Similar Properties You May Like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarProperties.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => {
                      onSelectSimilarProperty(sim);
                      setActiveImageIndex(0);
                    }}
                    className="group border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all cursor-pointer bg-white"
                  >
                    <div className="aspect-16/9 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={sim.images[0]}
                        alt={sim.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-bold text-slate-900 font-heading tabular-nums mb-1">
                        {sim.priceFormatted}
                      </div>
                      <div className="text-xs text-slate-700 font-medium line-clamp-1 mb-1">
                        {sim.title}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{sim.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
