import React, { useState } from 'react';
import { X, CheckCircle, Heart, Users, Phone, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RSVPData, Language } from '../types';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRSVP: (data: RSVPData) => void;
  lang: Language;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({
  isOpen,
  onClose,
  onSaveRSVP,
  lang,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | 'maybe'>('yes');
  const [guestsCount, setGuestsCount] = useState(1);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const rsvp: RSVPData = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      attending,
      guestsCount,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    onSaveRSVP(rsvp);
    setSubmitted(true);

    if (attending === 'yes') {
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ['#D4AF37', '#F5D6CE', '#C5A059'],
      });
    }

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  const text = {
    so: {
      title: 'Xaqiijinta Imaanshahaaga (RSVP)',
      sub: 'Fadlan nala wadaag imaanshahaaga Xafladda Meherka',
      nameLabel: 'Magacaaga oo Buuxa *',
      phoneLabel: 'Telefoonka / WhatsApp (ikhtiyaari)',
      attendLabel: 'Ma ka soo qeybgali doontaa?',
      yes: 'Haa, waan imaanayaa inshaAllah',
      maybe: 'Waan isku dayayaa',
      no: 'Waan ka cudur daaranayaa',
      guestsLabel: 'Tirada Martida (adiga oo ku jira)',
      messageLabel: 'Hambalyo ama Duco aad u reebeyso Arooska & Aroosadda',
      submitBtn: 'Xaqiiji RSVP',
      thankYou: 'Waad ku mahadsan tahay xaqiijintaada!',
      blessing: 'Farxad bay noo tahay inaan kugu aragno xafladda.',
    },
    en: {
      title: 'RSVP Confirmation',
      sub: 'Please let us know if you will celebrate with us',
      nameLabel: 'Full Name *',
      phoneLabel: 'Phone / WhatsApp (Optional)',
      attendLabel: 'Will you attend the ceremony?',
      yes: 'Joyfully Accept (InshaAllah)',
      maybe: 'Tentative / Unsure',
      no: 'Regretfully Decline',
      guestsLabel: 'Number of Guests (including yourself)',
      messageLabel: 'Warm Message or Duco for the Bride & Groom',
      submitBtn: 'Confirm RSVP',
      thankYou: 'Thank you for your RSVP!',
      blessing: 'We look forward to celebrating this special day together.',
    },
  }[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#261E1A]/60 backdrop-blur-xs animate-fade-in">
      <div
        id="rsvp-modal-card"
        className="relative w-full max-w-lg bg-[#FAF6F0] rounded-2xl border-2 border-[#D4AF37]/40 shadow-2xl p-6 sm:p-8 overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7D6B58] hover:text-[#3B2C24] rounded-full hover:bg-[#EFE5D8] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#F3E8D5] text-[#8C621C] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#A07525]" />
            </div>
            <h3 className="font-serif-display text-2xl text-[#3B2C24] font-bold mb-2">
              {text.thankYou}
            </h3>
            <p className="text-sm font-sans text-[#7D6B58] max-w-xs mx-auto">
              {text.blessing}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-5">
              <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#9C783E] font-semibold">
                RSVP
              </span>
              <h3 className="font-serif-display text-2xl text-[#3B2C24] font-bold mt-1">
                {text.title}
              </h3>
              <p className="text-xs font-sans text-[#7D6B58] mt-1">{text.sub}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A4535] mb-1 font-sans">
                {text.nameLabel}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Axmed Maxamed"
                  className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#D9CBB7] rounded-xl text-sm text-[#2C2420] placeholder-[#A89886] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#5A4535] mb-1 font-sans">
                  {text.phoneLabel}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 9... ama +252..."
                    className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#D9CBB7] rounded-xl text-sm text-[#2C2420] placeholder-[#A89886] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A4535] mb-1 font-sans">
                  {text.guestsLabel}
                </label>
                <div className="flex items-center gap-2 bg-[#FFFDF9] border border-[#D9CBB7] rounded-xl px-3 py-1.5">
                  <Users className="w-4 h-4 text-[#8C765E]" />
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-transparent text-sm text-[#2C2420] focus:outline-hidden"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A4535] mb-1.5 font-sans">
                {text.attendLabel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'yes', label: text.yes },
                  { key: 'maybe', label: text.maybe },
                  { key: 'no', label: text.no },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setAttending(item.key as 'yes' | 'no' | 'maybe')}
                    className={`py-2 px-2 text-xs font-sans rounded-xl border text-center transition-all cursor-pointer ${
                      attending === item.key
                        ? 'bg-[#EAD8C3] border-[#B8860B] font-semibold text-[#4A3521] shadow-xs'
                        : 'bg-[#FFFDF9] border-[#E2D5C2] text-[#6B5742] hover:bg-[#F6EFE5]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A4535] mb-1 font-sans">
                {text.messageLabel}
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Reeb hambalyadaada iyo ducadaada..."
                className="w-full px-3.5 py-2 bg-[#FFFDF9] border border-[#D9CBB7] rounded-xl text-sm text-[#2C2420] placeholder-[#A89886] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            <button
              id="confirm-rsvp-submit-btn"
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#C5A059] via-[#D8B467] to-[#B08933] text-[#342413] rounded-xl font-semibold text-sm shadow-md hover:brightness-105 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>{text.submitBtn}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
