import React from 'react';
import { MapPin, ArrowRight, TrendingUp } from 'lucide-react';
import { AREAS_DATA } from '../data/propertiesData';

interface AreasPageProps {
  onSelectSector: (sector: string) => void;
}

export const AreasPage: React.FC<AreasPageProps> = ({ onSelectSector }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wider font-semibold text-amber-700 font-heading">
          Capital Locations
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-heading">
          Explore Key Sectors in Islamabad
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Detailed guidance across Islamabad&apos;s prime residential, commercial, and suburban sectors. From our home base in G-11 Markaz to established diplomatic and commercial hubs.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {AREAS_DATA.map((area) => (
          <div
            key={area.id}
            onClick={() => onSelectSector(area.id)}
            className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-slate-300 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-16/10 w-full bg-slate-900 overflow-hidden">
                <img
                  src={area.image}
                  alt={area.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 text-slate-900 text-xs font-bold rounded-md shadow-xs">
                  {area.propertyCount}+ Listings
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-semibold text-amber-400 block mb-0.5">
                    {area.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {area.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {area.description}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                    <span>Average Rate Range:</span>
                  </span>
                  <span className="font-bold text-slate-900 font-heading">
                    {area.avgPriceKanal}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                type="button"
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors group-hover:bg-amber-600"
              >
                <span>Browse {area.name} Properties</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
