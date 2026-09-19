import React from 'react';
import { X, MapPin, Calendar, Clock, Navigation, Phone, Sparkles } from 'lucide-react';
import { WeddingDetails, Language } from '../types';

interface VenueInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: WeddingDetails;
  lang: Language;
}

export const VenueInfoModal: React.FC<VenueInfoModalProps> = ({
  isOpen,
  onClose,
  details,
  lang,
}) => {
  if (!isOpen) return null;

  const text = {
    so: {
      title: 'Goobta & Faahfaahinta Xafladda',
      venue: details.venue,
      city: details.city,
      address: details.address || 'Duulane Hotel, Jigjiga, Somali Region',
      date: 'Arbaco, 30 September 2026',
      time: '4:00 Galabnimo (4:00 PM)',
      parking: 'Baabuur dhigasho bilaash ah ayaa diyaar u ah martida huteelka.',
      directions: 'Ka fur Khariidada (Google Maps)',
      reception: 'Meherka & Qado/Casho Sharaf',
      dressCode: 'Labiska: Dhaqanka Soomaalida / Xarrago Toosan',
    },
    en: {
      title: 'Venue & Ceremony Details',
      venue: details.venue,
      city: details.city,
      address: details.address || 'Duulane Hotel, Jigjiga, Somali Region',
      date: 'Wednesday, September 30, 2026',
      time: '4:00 PM Afternoon',
      parking: 'Complimentary guest parking available at the venue grounds.',
      directions: 'Open in Google Maps',
      reception: 'Meher Ceremony followed by Feast Reception',
      dressCode: 'Attire: Traditional Somali / Formal Elegant',
    },
  }[lang];

  const mapsQuery = encodeURIComponent(`${details.venue}, ${details.city}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#261E1A]/60 backdrop-blur-xs">
      <div
        id="venue-info-modal-card"
        className="relative w-full max-w-lg bg-[#FAF6F0] rounded-2xl border-2 border-[#D4AF37]/40 shadow-2xl p-6 sm:p-8 overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7D6B58] hover:text-[#3B2C24] rounded-full hover:bg-[#EFE5D8] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#F3E8D5] text-[#8C621C] flex items-center justify-center mx-auto mb-2 border border-[#D4AF37]/30">
            <MapPin className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#9C783E] font-semibold">
            {details.city}
          </span>
          <h3 className="font-serif-display text-2xl text-[#3B2C24] font-bold mt-1">
            {details.venue}
          </h3>
          <p className="text-xs font-sans text-[#7D6B58] mt-1">{text.address}</p>
        </div>

        <div className="space-y-3 bg-[#FFFDF9] p-4 rounded-xl border border-[#E8DFC9] mb-5">
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-[#4A3521] block font-sans">
                {lang === 'so' ? 'Taariikhda' : 'Date'}
              </span>
              <span className="text-sm font-serif text-[#3B2C24]">{text.date}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-[#4A3521] block font-sans">
                {lang === 'so' ? 'Waqtiga' : 'Time'}
              </span>
              <span className="text-sm font-serif text-[#3B2C24]">{text.time}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-[#4A3521] block font-sans">
                {lang === 'so' ? 'Labiska' : 'Dress Code'}
              </span>
              <span className="text-xs font-sans text-[#6B5742]">{text.dressCode}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#FAF3E9] p-3 rounded-xl border border-[#EADBCC] mb-5 text-center text-xs text-[#7A644D] font-sans">
          {text.parking}
        </div>

        <a
          id="open-google-maps-btn"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 bg-gradient-to-r from-[#C5A059] via-[#D8B467] to-[#B08933] text-[#342413] rounded-xl font-semibold text-sm shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Navigation className="w-4 h-4" />
          <span>{text.directions}</span>
        </a>
      </div>
    </div>
  );
};
