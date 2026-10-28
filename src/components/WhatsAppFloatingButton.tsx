import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/companyData';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-slate-900 text-white text-xs py-2 px-3.5 rounded-xl shadow-xl border border-slate-800 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <p className="font-semibold text-amber-400">Chat with Majid Real Estate</p>
            <p className="text-slate-300 text-[11px] font-mono">{COMPANY_INFO.whatsappNumber}</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Dismiss chat hint"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppUrl("Hello Majid Real Estate, I am looking to consult regarding property in Islamabad.")}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-emerald-500/20"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};
