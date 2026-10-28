import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Clock, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/companyData';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Buying Property in G-11');
  const [budget, setBudget] = useState('PKR 2 Crore – 5 Crore');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name';
    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^(\+92|0)[0-9]{9,10}$/.test(phone.replace(/\s+/g, ''))) {
      errs.phone = 'Please enter a valid Pakistani contact number (e.g. 03325554423)';
    }

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  const whatsappMessage = `Hello Majid Real Estate,\nMy name is ${name}.\nPhone: ${phone}\nInterest: ${interest}\nBudget: ${budget}\nMessage: ${message || 'I would like to discuss property options.'}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wider font-semibold text-amber-700 font-heading">
          Get in Touch
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-heading">
          Contact Majid Real Estate
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Whether you have questions about purchasing in G-11, listing your commercial property, or need a valuation for your house, our team in G-11 Markaz is ready to assist.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Information Card */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-heading">{COMPANY_INFO.name}</h3>
                <p className="text-xs text-amber-400">G-11 Markaz Headquarters</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              We welcome prospective homeowners, commercial investors, and overseas clients to visit our office or connect directly via phone or WhatsApp.
            </p>

            <div className="space-y-4 text-xs pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block font-medium">Head Office:</span>
                  <span className="text-slate-200 leading-snug">{COMPANY_INFO.officeAddress}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block font-medium">Phone Support:</span>
                  <a href={`tel:${COMPANY_INFO.contactNumber}`} className="text-slate-200 font-mono font-bold hover:text-amber-400 transition-colors">
                    {COMPANY_INFO.contactNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block font-medium">WhatsApp Direct:</span>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-mono font-bold hover:text-emerald-300 transition-colors"
                  >
                    {COMPANY_INFO.whatsappNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block font-medium">Email Address:</span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-200 hover:text-amber-400 transition-colors">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block font-medium">Working Hours:</span>
                  <span className="text-slate-200">{COMPANY_INFO.businessHours}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Primary Location: G-11, Islamabad</span>
            <span>Postal Code: 44000</span>
          </div>
        </div>

        {/* Right: Validated Enquiry Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading">
                Thank You, {name}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your message has been sent to Majid Real Estate. A property advisor will reach out to you at <span className="font-mono font-bold text-slate-900">{phone}</span>.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp as well</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
                >
                  New Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Send an Online Property Enquiry
              </h2>
              <p className="text-xs text-slate-500">
                Please leave your details below and we will contact you directly with verified options.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tariq Khan"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full h-10 px-3 bg-slate-50 border rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden ${
                      errors.name ? 'border-red-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                    Phone / Mobile Number *
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                    Primary Area of Interest
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden"
                  >
                    <option value="Buying Property in G-11">Buying Property in G-11</option>
                    <option value="Commercial Shop in Al Anyat Mall / G-11 Markaz">Commercial Shop in G-11 Markaz</option>
                    <option value="Luxury House / Villa in Islamabad">Luxury House / Villa in Islamabad</option>
                    <option value="Renting a Residence or Office">Renting a Residence or Office</option>
                    <option value="Residential Plot in DHA / Gulberg">Residential Plot in DHA / Gulberg</option>
                    <option value="Sell / List My Property">Sell / List My Property</option>
                    <option value="Investment Consultancy">Investment Consultancy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                  Budget Range (PKR)
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden"
                >
                  <option value="Under PKR 50 Lac">Under PKR 50 Lac</option>
                  <option value="PKR 50 Lac – 1.5 Crore">PKR 50 Lac – 1.5 Crore</option>
                  <option value="PKR 1.5 Crore – 3 Crore">PKR 1.5 Crore – 3 Crore</option>
                  <option value="PKR 3 Crore – 6 Crore">PKR 3 Crore – 6 Crore</option>
                  <option value="PKR 6 Crore – 15 Crore">PKR 6 Crore – 15 Crore</option>
                  <option value="Above PKR 15 Crore">Above PKR 15 Crore</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                  Message / Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you are looking for..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-slate-900 outline-hidden resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 text-xs uppercase tracking-wider font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm border border-slate-800 hover:border-amber-400 transition-all cursor-pointer"
              >
                Send Enquiry
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Embedded Map Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Office Location: Al Anyat Shopping Mall, G-11 Markaz
            </h3>
            <p className="text-xs text-slate-500">
              Shop no 26 Basement, G-11 Markaz, Islamabad, 44000, Pakistan
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Al+Anyat+Shopping+Mall+G-11+Markaz+Islamabad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1"
          >
            <span>Open in Google Maps</span>
          </a>
        </div>

        <div className="aspect-21/9 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
          <iframe
            title="Majid Real Estate Google Map"
            src="https://maps.google.com/maps?q=Al%20Anyat%20Shopping%20Mall%20G-11%20Markaz%20Islamabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
