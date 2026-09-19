import React, { useState } from 'react';
import { X, Sliders, RotateCcw, Check } from 'lucide-react';
import { WeddingDetails, Language } from '../types';

interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  details: WeddingDetails;
  onUpdateDetails: (details: WeddingDetails) => void;
  onReset: () => void;
  lang: Language;
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({
  isOpen,
  onClose,
  details,
  onUpdateDetails,
  onReset,
  lang,
}) => {
  const [formData, setFormData] = useState<WeddingDetails>(details);

  if (!isOpen) return null;

  const handleChange = (field: keyof WeddingDetails, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdateDetails(updated);
  };

  const text = {
    so: {
      title: 'Habee Faahfaahinta Kaarka',
      subtitle: 'Waxaad halkan ka beddeli kartaa magacyada, goobta, ama taariikhda',
      groom: 'Magaca Arooska (Groom)',
      bride: 'Magaca Aroosadda (Bride)',
      event: 'Magaca Munaasabadda (Event)',
      date: 'Taariikhda (Date)',
      city: 'Magaalada (City)',
      venue: 'Hoolka / Huteelka (Venue)',
      reset: 'Ku celi sidii hore (Reset Defaults)',
      done: 'Dhammee',
    },
    en: {
      title: 'Customize Invitation Details',
      subtitle: 'Personalize the names, venue, ceremony, or date in real-time',
      groom: "Groom's Name",
      bride: "Bride's Name",
      event: 'Event Title',
      date: 'Date',
      city: 'City',
      venue: 'Venue',
      reset: 'Reset to Defaults',
      done: 'Done',
    },
  }[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#261E1A]/40 backdrop-blur-xs">
      <div className="w-full max-w-md h-full bg-[#FAF6F0] p-6 shadow-2xl overflow-y-auto border-l border-[#E5DAC6] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#E8DFC9] mb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#8C621C]" />
              <h3 className="font-serif-display font-bold text-lg text-[#3B2C24]">
                {text.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7D6B58] hover:text-[#3B2C24] rounded-full hover:bg-[#EFE5D8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-[#7D6B58] mb-5 font-sans">{text.subtitle}</p>

          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#5A4535] mb-1 font-sans">
                {text.groom}
              </label>
              <input
                type="text"
                value={formData.groomName}
                onChange={(e) => handleChange('groomName', e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFDF9] border border-[#D9CBB7] rounded-xl text-sm text-[#2C2420]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A4535] mb-1 font-sans">
                {text.bride}
              </label>
              <input
                type="text"
                value={formData.brideName}
                onChange={(e) => handleChange('brideName', e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFDF9] border border-[#D9CBB7] rounded-xl text-sm text-[#2C2420]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A4535] mb-1 font-sans">
                {text.event}
              </label>
              <input
                type="text"
                value={formData.eventName}
                onChange={(e) => handleChange('eventName', e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFDF9] border border-[#D9CBB7] rounded-xl text-sm text-[#2C2420]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-[#5A4535] mb-1 font-sans">
                  {text.city}
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFDF9] border border-[#D9CBB7] rounded-xl text-sm text-[#2C2420]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A4535] mb-1 font-sans">
                  {text.date}
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFDF9] border border-[#D9CBB7] rounded-xl text-sm text-[#2C2420]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A4535] mb-1 font-sans">
                {text.venue}
              </label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => handleChange('venue', e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFDF9] border border-[#D9CBB7] rounded-xl text-sm text-[#2C2420]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8DFC9] flex items-center justify-between gap-3 mt-6">
          <button
            onClick={() => {
              onReset();
              setFormData(details);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-sans text-[#7D6B58] hover:text-[#3B2C24] hover:bg-[#EFE5D8] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{text.reset}</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2 bg-[#4A3521] text-[#FAF4EC] rounded-xl text-xs font-semibold hover:bg-[#3B2A18] transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{text.done}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
