import React, { useState } from 'react';
import { MapPin, Bed, Bath, Maximize2, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { Property } from '../types/property';
import { getWhatsAppUrl } from '../data/companyData';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  viewMode?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  viewMode = 'grid'
}) => {
  const [imageError, setImageError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const mainImage = property.images[0] || '';

  const whatsappMessage = `Hello Majid Real Estate, I am interested in this listing:\n*${property.title}*\nPrice: ${property.priceFormatted}\nLocation: ${property.location}\nPlease share more details and arrange a viewing.`;

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-xl border border-slate-200/90 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-72 h-56 md:h-auto shrink-0 bg-slate-100 overflow-hidden">
          {!imageError && mainImage ? (
            <img
              src={mainImage}
              alt={property.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
              <span className="text-xs uppercase tracking-wider font-medium">{property.propertyType}</span>
            </div>
          )}

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm text-white shadow-xs ${
              property.purpose === 'sale' ? 'bg-slate-900' : 'bg-emerald-700'
            }`}>
              {property.purpose === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
            {property.badge && (
              <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm bg-amber-500 text-slate-950 shadow-xs">
                {property.badge}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-slate-700 hover:text-red-500 transition-colors shadow-xs"
            aria-label="Save listing"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 mb-1.5">
              <span className="text-xs font-medium text-amber-700 uppercase tracking-wide">
                {property.propertyType}
              </span>
              <span className="text-xl font-bold text-slate-900 font-heading tabular-nums">
                {property.priceFormatted}
              </span>
            </div>

            <h3
              onClick={() => onSelect(property)}
              className="text-base font-semibold text-slate-900 hover:text-amber-700 transition-colors cursor-pointer line-clamp-1 mb-2 font-heading"
            >
              {property.title}
            </h3>

            <p className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{property.location}</span>
            </p>

            <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
              {property.description}
            </p>

            {/* Unboxed Metadata Discipline */}
            <div className="flex items-center gap-3 text-xs text-slate-600 font-medium py-2 border-y border-slate-100">
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.areaSize}</span>
              </span>
              {property.bedrooms !== undefined && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5 text-slate-400" />
                    <span>{property.bedrooms} Beds</span>
                  </span>
                </>
              )}
              {property.bathrooms !== undefined && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3.5 h-3.5 text-slate-400" />
                    <span>{property.bathrooms} Baths</span>
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between gap-3">
            <button
              onClick={() => onSelect(property)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-amber-700 transition-colors cursor-pointer"
            >
              <span>View Full Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid View
  return (
    <div className="group bg-white rounded-xl border border-slate-200/90 overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all flex flex-col justify-between">
      <div>
        {/* Image Container with 4:3 Aspect Ratio */}
        <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
          {!imageError && mainImage ? (
            <img
              src={mainImage}
              alt={property.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
              <span className="text-xs uppercase tracking-wider font-medium">{property.propertyType}</span>
            </div>
          )}

          {/* Availability Status Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
            <span className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm text-white shadow-xs ${
              property.purpose === 'sale' ? 'bg-slate-900' : 'bg-emerald-700'
            }`}>
              {property.purpose === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
            {property.badge && (
              <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm bg-amber-500 text-slate-950 font-medium shadow-xs">
                {property.badge}
              </span>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-slate-700 hover:text-red-500 transition-colors shadow-xs"
            aria-label="Save listing"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          {/* Bottom gradient overlay with price */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent flex items-end justify-between text-white">
            <span className="text-lg font-bold font-heading tabular-nums text-white">
              {property.priceFormatted}
            </span>
            <span className="text-[11px] text-slate-200 font-medium">
              {property.propertyType}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-2.5">
          <h3
            onClick={() => onSelect(property)}
            className="text-sm font-semibold text-slate-900 hover:text-amber-700 transition-colors cursor-pointer line-clamp-1 font-heading"
          >
            {property.title}
          </h3>

          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{property.location}</span>
          </p>

          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{property.areaSize}</span>
            </span>
            {property.bedrooms !== undefined && (
              <>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{property.bedrooms} Beds</span>
                </span>
              </>
            )}
            {property.bathrooms !== undefined && (
              <>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{property.bathrooms}</span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-4 pb-4 pt-2 flex items-center justify-between gap-2 border-t border-slate-50">
        <button
          onClick={() => onSelect(property)}
          className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
        >
          View Details
        </button>

        <a
          href={getWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-medium transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
