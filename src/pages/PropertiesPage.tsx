import React, { useState, useMemo } from 'react';
import { LayoutGrid, List, SlidersHorizontal, RotateCcw, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '../types/property';
import { PROPERTIES_DATA } from '../data/propertiesData';
import { PropertyCard } from '../components/PropertyCard';
import { SearchFilterBar, FilterState } from '../components/SearchFilterBar';

interface PropertiesPageProps {
  onSelectProperty: (property: Property) => void;
  initialPurpose?: 'all' | 'sale' | 'rent';
  initialSector?: string;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  onSelectProperty,
  initialPurpose = 'all',
  initialSector = 'all'
}) => {
  const [filters, setFilters] = useState<FilterState>({
    purpose: initialPurpose,
    sector: initialSector,
    propertyType: 'all',
    priceRange: 'all',
    bedrooms: 'all',
    searchTerm: ''
  });

  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((item) => {
      // Purpose filter
      if (filters.purpose !== 'all' && item.purpose !== filters.purpose) {
        return false;
      }

      // Sector filter
      if (filters.sector !== 'all') {
        const sectorMatch = item.sector.toLowerCase().includes(filters.sector.toLowerCase()) ||
          item.location.toLowerCase().includes(filters.sector.toLowerCase());
        if (!sectorMatch) return false;
      }

      // Property type filter
      if (filters.propertyType !== 'all' && item.propertyType !== filters.propertyType) {
        return false;
      }

      // Price filter
      if (filters.priceRange !== 'all') {
        if (filters.priceRange === 'under-50l' && item.price >= 5000000) return false;
        if (filters.priceRange === '50l-2cr' && (item.price < 5000000 || item.price > 20000000)) return false;
        if (filters.priceRange === '2cr-5cr' && (item.price < 20000000 || item.price > 50000000)) return false;
        if (filters.priceRange === '5cr-10cr' && (item.price < 50000000 || item.price > 100000000)) return false;
        if (filters.priceRange === 'above-10cr' && item.price <= 100000000) return false;
      }

      // Bedrooms filter
      if (filters.bedrooms !== 'all') {
        const minBeds = parseInt(filters.bedrooms, 10);
        if (!item.bedrooms || item.bedrooms < minBeds) return false;
      }

      // Search term
      if (filters.searchTerm.trim()) {
        const query = filters.searchTerm.toLowerCase();
        const matchesText =
          item.title.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.areaSize.toLowerCase().includes(query);
        if (!matchesText) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    });
  }, [filters, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage) || 1;
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReset = () => {
    setFilters({
      purpose: 'all',
      sector: 'all',
      propertyType: 'all',
      priceRange: 'all',
      bedrooms: 'all',
      searchTerm: ''
    });
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Breadcrumb */}
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wider font-semibold text-amber-700 font-heading">
          Property Catalogue
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-heading">
          {filters.purpose === 'sale'
            ? 'Properties for Sale in Islamabad'
            : filters.purpose === 'rent'
            ? 'Properties for Rent in Islamabad'
            : 'All Real Estate Listings in Islamabad'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Browse verified residential homes, commercial shops in G-11 Markaz, corporate offices, farmhouses, and investment plots with authentic CDA/DHA title verification.
        </p>
      </div>

      {/* Main Filter Bar */}
      <SearchFilterBar
        filters={filters}
        onFilterChange={(newF) => {
          setFilters(newF);
          setCurrentPage(1);
        }}
        onSearch={() => setCurrentPage(1)}
        onReset={handleReset}
      />

      {/* Controls Bar: Count, Sort, Grid/List toggle */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-slate-600 font-medium">
          Showing <strong className="text-slate-900 font-mono tabular-nums">{filteredProperties.length}</strong> available {filteredProperties.length === 1 ? 'property' : 'properties'}
          {filters.sector !== 'all' && <span> in <strong className="text-slate-900">{filters.sector}</strong></span>}
        </div>

        <div className="flex items-center gap-4">
          {/* Sorting */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 outline-hidden cursor-pointer"
            >
              <option value="newest">Newest Listed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Listings Grid / List */}
      {paginatedProperties.length > 0 ? (
        <div className={`space-y-6 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 space-y-0' : 'flex flex-col gap-4 space-y-0'}`}>
          {paginatedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              No Properties Match Your Current Filters
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find any listings matching your selected location, budget, or property type. Try broadening your criteria or reset the filters.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-9 h-9 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                currentPage === num
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
