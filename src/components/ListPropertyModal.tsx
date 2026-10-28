import React, { useState } from 'react';
import { X, CheckCircle2, Building, MessageCircle, AlertCircle } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/companyData';

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ListPropertyModal: React.FC<ListPropertyModalProps> = ({ isOpen, onClose }) => {
  const [purpose, setPurpose] = useState<'sale' | 'rent'>('sale');
  const [propertyType, setPropertyType] = useState('House / Villa');
  const [sector, setSector] = useState('G-11');
  const [areaSize, setAreaSize] = useState('');
  const [askingPrice, setAskingPrice] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!areaSize.trim()) errs.areaSize = 'Please enter area size (e.g., 1 Kanal, 10 Marla)';
    if (!askingPrice.trim()) errs.askingPrice = 'Please enter your expected demand / rent';
    if (!ownerName.trim()) errs.ownerName = 'Please enter your name';
    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^(\+92|0)[0-9]{9,10}$/.test(phone.replace(/\s+/g, ''))) {
      errs.phone = 'Please enter a valid Pakistani phone number (e.g. 03325554423)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const ref = `MRE-${Math.floor(100000 + Math.random() * 900000)}`;
    const submission = {
      ref,
      purpose,
      propertyType,
      sector,
      areaSize,
      askingPrice,
      ownerName,
      phone,
      whatsapp: whatsapp || phone,
      details,
      submittedAt: new Date().toISOString()
    };

    // Store in localStorage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem('mre_listed_properties') || '[]');
      existing.push(submission);
      localStorage.setItem('mre_listed_properties', JSON.stringify(existing));
    } catch {
      // ignore storage error
    }

    setSubmittedRef(ref);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setAreaSize('');
    setAskingPrice('');
    setOwnerName('');
    setPhone('');
    setWhatsapp('');
    setDetails('');
    setErrors({});
    onClose();
  };

  const whatsappListingMessage = `Hello Majid Real Estate,\nI would like to list my property with your agency:\n- Reference: ${submittedRef}\n- Purpose: For ${purpose === 'sale' ? 'Sale' : 'Rent'}\n- Type: ${propertyType}\n- Sector/Location: ${sector}, Islamabad\n- Size: ${areaSize}\n- Expected Demand: PKR ${askingPrice}\n- Owner: ${ownerName} (${phone})\n- Remarks: ${details || 'Standard verification requested.'}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative my-6">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-base font-heading">List Your Property</h3>
              <p className="text-xs text-slate-300">Submit your property for sale or rent to Majid Real Estate</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submittedRef ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900 font-heading">Property Details Received</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your listing submission has been recorded with reference <span className="font-mono font-bold text-slate-900">{submittedRef}</span>. Our G-11 Markaz team will verify details and contact you shortly.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppUrl(whatsappListingMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Forward Details to WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Purpose Selector */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1.5">
                  Listing Purpose *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPurpose('sale')}
                    className={`py-2 px-4 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      purpose === 'sale'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Sell My Property
                  </button>
                  <button
                    type="button"
                    onClick={() => setPurpose('rent')}
                    className={`py-2 px-4 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      purpose === 'rent'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Rent Out My Property
                  </button>
                </div>
              </div>

              {/* Property Type & Sector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">
                    Property Type *
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden"
                  >
                    {[
                      'House / Villa',
                      'Apartment / Flat',
                      'Commercial Office / Shop',
                      'Farmhouse',
                      'Residential Plot',
                      'Commercial Plot',
                      'Penthouse',
                      'Warehouse'
                    ].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">
                    Sector / Area in Islamabad *
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden"
                  >
                    {[
                      'G-11 (Markaz / Subsectors)',
                      'G-10',
                      'F-10',
                      'F-11',
                      'F-7',
                      'F-6',
                      'Blue Area Commercial',
                      'Gulberg Greens',
                      'DHA Phase 2 Islamabad',
                      'DHA Other Phases',
                      'Sector E-11',
                      'Bahria Town',
                      'Other Islamabad Sector'
                    ].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Area Size & Asking Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">
                    Area / Dimensions *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Kanal, 10 Marla, 1200 Sq Ft"
                    value={areaSize}
                    onChange={(e) => {
                      setAreaSize(e.target.value);
                      if (errors.areaSize) setErrors({ ...errors, areaSize: '' });
                    }}
                    className={`w-full h-10 px-3 bg-slate-50 border rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden ${
                      errors.areaSize ? 'border-red-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.areaSize && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.areaSize}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">
                    Expected Demand / Rent (PKR) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PKR 4.5 Crore or PKR 1.5 Lac / month"
                    value={askingPrice}
                    onChange={(e) => {
                      setAskingPrice(e.target.value);
                      if (errors.askingPrice) setErrors({ ...errors, askingPrice: '' });
                    }}
                    className={`w-full h-10 px-3 bg-slate-50 border rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden ${
                      errors.askingPrice ? 'border-red-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.askingPrice && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.askingPrice}
                    </p>
                  )}
                </div>
              </div>

              {/* Owner Contact Information */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-900 block mb-2">Owner / Representative Contact</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-600 block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Asad Malik"
                      value={ownerName}
                      onChange={(e) => {
                        setOwnerName(e.target.value);
                        if (errors.ownerName) setErrors({ ...errors, ownerName: '' });
                      }}
                      className={`w-full h-10 px-3 bg-slate-50 border rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden ${
                        errors.ownerName ? 'border-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.ownerName && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.ownerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-600 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 03325554423"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full h-10 px-3 bg-slate-50 border rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden ${
                        errors.phone ? 'border-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Remarks / Features */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-slate-600 block mb-1">
                  Additional Details / Features (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Corner plot, brand new construction, solar installed, CDA transfer ready..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden resize-none"
                />
              </div>

              {/* Footer buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm border border-slate-800 hover:border-amber-400 transition-all cursor-pointer"
                >
                  Submit Property Listing
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
