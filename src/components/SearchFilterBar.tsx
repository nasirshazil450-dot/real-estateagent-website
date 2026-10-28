import React from 'react';
import { Search, RotateCcw, MapPin, Home, DollarSign, Bed } from 'lucide-react';

export interface FilterState {
  purpose: 'all' | 'sale' | 'rent';
  sector: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
  searchTerm: string;
}

interface SearchFilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onSearch: () => void;
  onReset: () => void;
  compact?: boolean;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  onFilterChange,
  onSearch,
  onReset,
  compact = false
}) => {
  const sectors = [
    { value: 'all', label: 'All Locations' },
    { value: 'G-11', label: 'Sector G-11 (Markaz & Subsectors)' },
    { value: 'F-10', label: 'Sector F-10' },
    { value: 'F-7', label: 'Sector F-7' },
    { value: 'Blue Area', label: 'Blue Area Commercial' },
    { value: 'Gulberg Greens', label: 'Gulberg Greens Agro' },
    { value: 'DHA Phase 2', label: 'DHA Phase 2 Islamabad' },
    { value: 'E-11', label: 'Sector E-11' }
  ];

  const propertyTypes = [
    { value: 'all', label: 'All Property Types' },
    { value: 'House / Villa', label: 'Houses & Luxury Villas' },
    { value: 'Commercial Office / Shop', label: 'Commercial Offices & Shops' },
    { value: 'Apartment / Flat', label: 'Apartments & Flats' },
    { value: 'Farmhouse', label: 'Farmhouses' },
    { value: 'Residential Plot', label: 'Residential Plots' },
    { value: 'Penthouse', label: 'Penthouses' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Any Budget' },
    { value: 'under-50l', label: 'Under PKR 50 Lac' },
    { value: '50l-2cr', label: 'PKR 50 Lac – 2 Crore' },
    { value: '2cr-5cr', label: 'PKR 2 Crore – 5 Crore' },
    { value: '5cr-10cr', label: 'PKR 5 Crore – 10 Crore' },
    { value: 'above-10cr', label: 'Above PKR 10 Crore' }
  ];

  const bedroomOptions = [
    { value: 'all', label: 'Any Beds' },
    { value: '2', label: '2+ Bedrooms' },
    { value: '3', label: '3+ Bedrooms' },
    { value: '4', label: '4+ Bedrooms' },
    { value: '5', label: '5+ Bedrooms' }
  ];

  const handlePurposeChange = (purpose: 'all' | 'sale' | 'rent') => {
    onFilterChange({ ...filters, purpose });
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-slate-200/90 ${compact ? 'p-4' : 'p-6'}`}>
      {/* Purpose Tabs (Interactive Filter Controls as per guidelines) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-lg w-fit mb-5">
        <button
          type="button"
          onClick={() => handlePurposeChange('all')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            filters.purpose === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Listings
        </button>
        <button
          type="button"
          onClick={() => handlePurposeChange('sale')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            filters.purpose === 'sale'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Buy (For Sale)
        </button>
        <button
          type="button"
          onClick={() => handlePurposeChange('rent')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            filters.purpose === 'rent'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Rent (For Lease)
        </button>
      </div>

      {/* Filter Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Dropdown */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>Location / Sector</span>
          </label>
          <select
            value={filters.sector}
            onChange={(e) => onFilterChange({ ...filters, sector: e.target.value })}
            className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden transition-all"
          >
            {sectors.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Dropdown */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-amber-500" />
            <span>Property Type</span>
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => onFilterChange({ ...filters, propertyType: e.target.value })}
            className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden transition-all"
          >
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Budget / Price Range */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-amber-500" />
            <span>Budget (PKR)</span>
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
            className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden transition-all"
          >
            {priceRanges.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-amber-500" />
            <span>Bedrooms</span>
          </label>
          <select
            value={filters.bedrooms}
            onChange={(e) => onFilterChange({ ...filters, bedrooms: e.target.value })}
            className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden transition-all"
          >
            {bedroomOptions.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Row */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-auto flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by keywords (e.g. 1 Kanal, Corner, Basement, G-11)..."
            value={filters.searchTerm}
            onChange={(e) => onFilterChange({ ...filters, searchTerm: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden transition-all"
          >
          </input>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={onReset}
            className="px-4 h-10 inline-flex items-center justify-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={onSearch}
            className="px-6 h-10 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm border border-slate-800 hover:border-amber-400 transition-all cursor-pointer flex-1 sm:flex-none"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Find Properties</span>
          </button>
        </div>
      </div>
    </div>
  );
};
