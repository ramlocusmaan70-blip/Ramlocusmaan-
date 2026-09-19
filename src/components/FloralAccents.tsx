import React from 'react';

export const FloralCorner: React.FC<{
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}> = ({ className = '', position = 'top-left' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scaleX(-1)';
      case 'bottom-left':
        return 'scaleY(-1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'none';
    }
  };

  return (
    <div
      className={`pointer-events-none absolute w-28 h-28 sm:w-36 sm:h-36 ${className}`}
      style={{ transform: getTransform() }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Soft blush floral petal shadows */}
        <circle cx="28" cy="28" r="9" fill="#FCE7E2" opacity="0.65" />
        <circle cx="48" cy="18" r="7" fill="#FAD4CC" opacity="0.6" />
        <circle cx="18" cy="48" r="7" fill="#FAD4CC" opacity="0.6" />
        <circle cx="42" cy="40" r="11" fill="#F8C6BC" opacity="0.75" />

        {/* Gold filigree & branch outlines */}
        <path
          d="M 6 114 C 6 50, 50 6, 114 6"
          stroke="url(#goldGradCorner)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M 16 114 C 16 60, 60 16, 114 16"
          stroke="url(#goldGradCorner)"
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />
        
        {/* Rose blossom petals in gold outline */}
        <path
          d="M42 32 C45 30 50 34 48 38 C46 42 38 43 36 38 C35 34 39 31 42 32 Z"
          fill="none"
          stroke="url(#goldGradCorner)"
          strokeWidth="1.2"
        />
        <path
          d="M38 35 C40 33 44 35 43 38 C42 40 38 40 37 38 Z"
          fill="#FFFBF7"
          stroke="url(#goldGradCorner)"
          strokeWidth="0.9"
        />

        {/* Leaves and sprigs */}
        <path
          d="M30 18 C33 13 40 14 42 19 C37 21 32 21 30 18 Z"
          fill="#F5EFEB"
          stroke="url(#goldGradCorner)"
          strokeWidth="0.9"
        />
        <path
          d="M18 30 C13 33 14 40 19 42 C21 37 21 32 18 30 Z"
          fill="#F5EFEB"
          stroke="url(#goldGradCorner)"
          strokeWidth="0.9"
        />
        
        {/* Tiny golden buds */}
        <circle cx="62" cy="12" r="2.2" fill="#D4AF37" />
        <circle cx="12" cy="62" r="2.2" fill="#D4AF37" />
        <circle cx="78" cy="8" r="1.8" fill="#C5A059" />
        <circle cx="8" cy="78" r="1.8" fill="#C5A059" />

        <defs>
          <linearGradient id="goldGradCorner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C5A059" />
            <stop offset="50%" stopColor="#E6CA85" />
            <stop offset="100%" stopColor="#9E7422" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const GoldFlourishDivider: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]/40" />
      <svg
        width="42"
        height="18"
        viewBox="0 0 42 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#B8860B] drop-shadow-sm"
      >
        <path
          d="M21 2 C17 6 12 7 6 7 C1 7 1 9 6 9 C14 9 18 13 21 16 C24 13 28 9 36 9 C41 9 41 7 36 7 C30 7 25 6 21 2 Z"
          fill="url(#goldDividerGrad)"
        />
        <circle cx="21" cy="9" r="2" fill="#FAF5ED" stroke="#B8860B" strokeWidth="1" />
        <defs>
          <linearGradient id="goldDividerGrad" x1="0" y1="0" x2="42" y2="18">
            <stop offset="0%" stopColor="#B38728" />
            <stop offset="50%" stopColor="#E8C87A" />
            <stop offset="100%" stopColor="#996E14" />
          </linearGradient>
        </defs>
      </svg>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]/40" />
    </div>
  );
};

export const BismillahCalligraphy: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <span
        className="font-serif text-2xl sm:text-3xl tracking-widest text-[#A87B22] select-none font-semibold mb-1"
        style={{
          fontFamily: "'Amiri', 'Traditional Arabic', 'Playfair Display', serif",
        }}
      >
        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </span>
      <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6B38] font-medium font-sans">
        In the name of Allah, the Most Gracious, the Most Merciful
      </span>
    </div>
  );
};
