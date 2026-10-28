import React, { useState } from 'react';
import { MapPin, CheckCircle2, MessageCircle, Phone, ArrowRight, Building } from 'lucide-react';
import { PROJECTS_DATA } from '../data/propertiesData';
import { Project } from '../types/property';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/companyData';

export const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wider font-semibold text-amber-700 font-heading">
          Capital Developments
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-heading">
          Featured Real Estate Projects in Islamabad
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Explore premier mixed-use commercial hubs, luxury suburban villa communities, and agro-farmhouse enclaves vetted by Majid Real Estate for legal compliance and long-term capital appreciation.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-8">
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:border-slate-300 transition-all group"
          >
            {/* Visual */}
            <div className="lg:col-span-5 relative aspect-16/9 lg:aspect-auto bg-slate-900 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-sm bg-slate-900/90 text-white text-[11px] font-semibold tracking-wider uppercase border border-slate-700">
                {project.status}
              </div>
            </div>

            {/* Information */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-amber-700 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{project.location}</span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  {project.title}
                </h2>
                <p className="text-xs text-slate-500 font-medium italic">
                  {project.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {project.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Strip */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block">
                    Starting Demand
                  </span>
                  <span className="text-base font-bold text-slate-900 font-heading">
                    {project.priceRange}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <a
                    href={getWhatsAppUrl(`Hello Majid Real Estate, please provide brochure and payment plan for ${project.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Quick Brief
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Brief Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-slate-900 font-heading">{selectedProject.title}</h3>
            <p className="text-xs text-slate-500 font-medium">{selectedProject.location}</p>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedProject.description}</p>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
              <span className="font-semibold text-slate-800 block">Available Categories:</span>
              <div className="flex flex-wrap gap-2 text-slate-600">
                {selectedProject.types.map((t, i) => (
                  <span key={i} className="bg-white border px-2 py-0.5 rounded text-[11px]">{t}</span>
                ))}
              </div>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600"
              >
                Close
              </button>
              <a
                href={getWhatsAppUrl(`Hello Majid Real Estate, I want to book a presentation for ${selectedProject.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Book Presentation
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
