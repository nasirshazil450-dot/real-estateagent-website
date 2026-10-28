import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { ListPropertyModal } from './components/ListPropertyModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AreasPage } from './pages/AreasPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { Property } from './types/property';
import { PROPERTIES_DATA } from './data/propertiesData';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'properties' | 'buy' | 'rent' | 'projects' | 'areas' | 'about' | 'contact'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);
  const [filterSector, setFilterSector] = useState<string>('all');

  // Handle URL hash on initial load (e.g. #property-prop-01)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#property-')) {
      const propId = hash.replace('#property-', '');
      const found = PROPERTIES_DATA.find((p) => p.id === propId);
      if (found) {
        setSelectedProperty(found);
      }
    }
  }, []);

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    window.location.hash = `property-${property.id}`;
  };

  const handleClosePropertyModal = () => {
    setSelectedProperty(null);
    if (window.location.hash.startsWith('#property-')) {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleFilterBySector = (sector: string) => {
    setFilterSector(sector);
    setActivePage('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navbar with 3-Zone Top Bar Contract */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page as any);
          if (page !== 'properties') setFilterSector('all');
        }}
        onOpenListProperty={() => setIsListPropertyOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onSelectProperty={handleSelectProperty}
            setActivePage={(page) => {
              setActivePage(page as any);
              if (page !== 'properties') setFilterSector('all');
            }}
            onFilterBySector={handleFilterBySector}
            onOpenListProperty={() => setIsListPropertyOpen(true)}
          />
        )}

        {activePage === 'properties' && (
          <PropertiesPage
            onSelectProperty={handleSelectProperty}
            initialPurpose="all"
            initialSector={filterSector}
          />
        )}

        {activePage === 'buy' && (
          <PropertiesPage
            key="buy-page"
            onSelectProperty={handleSelectProperty}
            initialPurpose="sale"
            initialSector="all"
          />
        )}

        {activePage === 'rent' && (
          <PropertiesPage
            key="rent-page"
            onSelectProperty={handleSelectProperty}
            initialPurpose="rent"
            initialSector="all"
          />
        )}

        {activePage === 'projects' && (
          <ProjectsPage />
        )}

        {activePage === 'areas' && (
          <AreasPage onSelectSector={handleFilterBySector} />
        )}

        {activePage === 'about' && (
          <AboutPage
            onOpenListProperty={() => setIsListPropertyOpen(true)}
            setActivePage={(page) => setActivePage(page as any)}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={(page) => {
          setActivePage(page as any);
          if (page !== 'properties') setFilterSector('all');
        }}
      />

      {/* Property Details Modal */}
      <PropertyDetailsModal
        property={selectedProperty}
        onClose={handleClosePropertyModal}
        onSelectSimilarProperty={handleSelectProperty}
      />

      {/* List Your Property Modal */}
      <ListPropertyModal
        isOpen={isListPropertyOpen}
        onClose={() => setIsListPropertyOpen(false)}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}
