import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, MailOpen } from 'lucide-react';
import { Language } from '../types';

interface EnvelopeViewProps {
  isOpen: boolean;
  onOpen: () => void;
  lang: Language;
  monogram?: string;
  groomName?: string;
  brideName?: string;
}

export const EnvelopeView: React.FC<EnvelopeViewProps> = ({
  isOpen,
  onOpen,
  lang,
  monogram = 'M',
  groomName = 'Suheyr',
  brideName = 'Suheyr',
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    // Launch celebratory confetti with gold, blush pink, and cream petals
    confetti({
      particleCount: 60,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#D4AF37', '#F5D6CE', '#FBF5B7', '#E6C875', '#F7EBE8'],
    });

    setTimeout(() => {
      onOpen();
      setIsOpening(false);
    }, 650);
  };

  const text = {
    so: {
      invitationTo: 'Ku Socota: Ehelada & Asxaabta Sharafta leh',
      meherCeremony: 'Xafladda Meherka (Nikax)',
      clickToOpen: 'Guji Shaabadda si aad u furto Kaarka',
      touchToReveal: 'Taabo shaabadda dahabiga ah',
      names: `${groomName} & ${brideName}`,
    },
    en: {
      invitationTo: 'Cordially Invited: Family & Honored Guests',
      meherCeremony: 'Meher (Nikax) Ceremony',
      clickToOpen: 'Click the Wax Seal to Open Invitation',
      touchToReveal: 'Tap the gold wax seal',
      names: `${groomName} & ${brideName}`,
    },
  }[lang];

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 w-full max-w-xl mx-auto">
      {/* Top note */}
      <div className="text-center mb-6">
        <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#8C6F4A] font-semibold block mb-1">
          {text.meherCeremony}
        </span>
        <h2 className="font-serif-display text-2xl sm:text-3xl text-[#3B2C24]">
          {text.names}
        </h2>
        <p className="text-xs font-sans text-[#7D6B58] mt-1 italic">
          {text.invitationTo}
        </p>
      </div>

      {/* Realistic 3D Envelope Container matching user's photo */}
      <div
        id="wedding-envelope-card"
        onClick={handleOpenClick}
        role="button"
        tabIndex={0}
        aria-label={text.clickToOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpenClick();
          }
        }}
        className="relative w-full aspect-[1.38/1] max-w-[500px] cursor-pointer group select-none transition-transform duration-300 hover:scale-[1.015]"
      >
        {/* Envelope Base Shadow & Texture */}
        <div className="absolute inset-0 rounded-2xl bg-[#E8DDD0] shadow-2xl transform translate-y-3 blur-md opacity-50" />

        {/* Envelope Body Container */}
        <div className="relative w-full h-full rounded-xl sm:rounded-2xl bg-[#FAF6F0] border border-[#E8DFC9] shadow-lg overflow-hidden flex items-center justify-center">
          {/* Subtle paper linen texture lines */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, #D5C7B4, #D5C7B4 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, #D5C7B4, #D5C7B4 1px, transparent 1px, transparent 4px)`,
            }}
          />

          {/* Envelope Bottom & Side Crease Folds */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 500 360"
            preserveAspectRatio="none"
          >
            {/* Lower pocket shadows */}
            <path
              d="M 0 360 L 250 215 L 500 360 Z"
              fill="#F4ECE0"
              stroke="#E2D4C0"
              strokeWidth="1.2"
            />
            {/* Left flap shadow fold */}
            <path
              d="M 0 0 L 250 215 L 0 360 Z"
              fill="#F7EFE4"
              stroke="#E6DAC8"
              strokeWidth="0.8"
              opacity="0.8"
            />
            {/* Right flap shadow fold */}
            <path
              d="M 500 0 L 250 215 L 500 360 Z"
              fill="#F7EFE4"
              stroke="#E6DAC8"
              strokeWidth="0.8"
              opacity="0.8"
            />
          </svg>

          {/* Scalloped Embossed Flap (From the user's uploaded image) */}
          <motion.div
            className="absolute top-0 left-0 right-0 w-full origin-top z-20"
            animate={
              isOpening
                ? { rotateX: 160, transition: { duration: 0.65, ease: 'easeInOut' } }
                : { rotateX: 0 }
            }
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative w-full">
              {/* Scalloped Lace Edge SVG matching user's photo */}
              <svg
                viewBox="0 0 500 240"
                className="w-full drop-shadow-md overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Flap base with embossed scalloped trim */}
                <path
                  d="M 0 0 L 500 0 L 500 45 
                     C 480 50, 465 65, 445 65 
                     C 425 65, 410 80, 390 85 
                     C 370 90, 355 110, 335 120 
                     C 315 130, 290 155, 270 170 
                     C 260 178, 240 178, 230 170 
                     C 210 155, 185 130, 165 120 
                     C 145 110, 130 90, 110 85 
                     C 90 80, 75 65, 55 65 
                     C 35 65, 20 50, 0 45 Z"
                  fill="#FCF9F3"
                  stroke="#E8DCcb"
                  strokeWidth="1.5"
                />

                {/* Embossed delicate lace flower border relief */}
                <path
                  d="M 25 35 C 55 52, 90 68, 130 92 C 170 115, 205 142, 235 158 C 245 163, 255 163, 265 158 C 295 142, 330 115, 370 92 C 410 68, 445 52, 475 35"
                  stroke="#E5DAC8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="4 8"
                />

                {/* Embossed floral vines & delicate roses relief */}
                <g stroke="#E3D7C5" strokeWidth="1.6" fill="none" opacity="0.95">
                  {/* Left rose sprigs */}
                  <circle cx="160" cy="110" r="8" fill="#FBF7F0" />
                  <circle cx="160" cy="110" r="4.5" />
                  <circle cx="120" cy="78" r="7" fill="#FBF7F0" />
                  <circle cx="120" cy="78" r="4" />
                  <circle cx="78" cy="52" r="6" fill="#FBF7F0" />

                  {/* Right rose sprigs */}
                  <circle cx="340" cy="110" r="8" fill="#FBF7F0" />
                  <circle cx="340" cy="110" r="4.5" />
                  <circle cx="380" cy="78" r="7" fill="#FBF7F0" />
                  <circle cx="380" cy="78" r="4" />
                  <circle cx="422" cy="52" r="6" fill="#FBF7F0" />

                  {/* Center floral crown */}
                  <path d="M 235 125 C 242 110, 258 110, 265 125" />
                  <circle cx="250" cy="118" r="7" fill="#FBF7F0" />
                  <circle cx="250" cy="118" r="3.5" />
                </g>
              </svg>
            </div>
          </motion.div>

          {/* Central 3D Metallic Gold Wax Seal (matching photo with Monogram) */}
          <div className="absolute top-[48%] sm:top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer group-hover:drop-shadow-xl transition-all duration-300"
            >
              {/* Outer wax drip contour */}
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full wax-seal flex items-center justify-center border-2 border-[#AA771C]/50 relative">
                {/* Wavy melted edge effect */}
                <div className="absolute inset-0 rounded-full border border-[#FFE7A3]/30 pointer-events-none" />
                
                {/* Inner embossed rim */}
                <div className="w-14 h-14 sm:w-17 sm:h-17 rounded-full border-2 border-[#8A6314] flex items-center justify-center bg-gradient-to-br from-[#C69837] via-[#A8791F] to-[#694807] shadow-inner">
                  {/* Monogram character */}
                  <span
                    className="font-serif-display font-bold text-2xl sm:text-3xl text-[#FFF4D0] select-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
                    style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                  >
                    {monogram}
                  </span>
                </div>
              </div>

              {/* Pulsing gentle hint indicator */}
              <div className="absolute -inset-2 rounded-full border border-[#D4AF37]/50 animate-ping opacity-35 pointer-events-none" />
            </motion.div>

            {/* Click to open label badge */}
            <div className="mt-3 px-3 py-1 rounded-full bg-[#3B2C24]/85 text-[#F8F1E7] text-[11px] font-sans font-medium flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-opacity group-hover:bg-[#3B2C24]">
              <Sparkles className="w-3 h-3 text-[#E8C87A]" />
              <span>{text.clickToOpen}</span>
            </div>
          </div>

          {/* Peek of inner gold rim card */}
          <div className="absolute inset-x-6 sm:inset-x-10 bottom-4 h-14 bg-gradient-to-b from-[#FFFDF9] to-[#FBF4EB] border-t-2 border-[#D4AF37]/60 rounded-t-lg shadow-inner flex items-center justify-center opacity-85">
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#9E7A3D]">
              Nikax • 30 / 09 / 2026
            </span>
          </div>
        </div>
      </div>

      {/* Action Helper Button */}
      <div className="mt-8 flex items-center gap-3">
        <button
          id="direct-open-invitation-btn"
          onClick={handleOpenClick}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D8B467] to-[#B08933] text-[#362615] font-sans font-semibold text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
        >
          <MailOpen className="w-4 h-4" />
          <span>{text.clickToOpen}</span>
        </button>
      </div>
    </div>
  );
};
