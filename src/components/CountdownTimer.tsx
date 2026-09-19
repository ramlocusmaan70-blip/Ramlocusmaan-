import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface CountdownTimerProps {
  targetDateStr: string;
  lang: Language;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDateStr,
  lang,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(`${targetDateStr}T16:00:00`).getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const labels = {
    so: {
      days: 'Maalmood',
      hours: 'Saacadood',
      minutes: 'Daqiiqo',
      seconds: 'Ilbiriqsi',
      title: 'Tirinta Waqtiga Xafladda Meherka',
      celebratingNow: 'Maanta waa Maalintii Meherka! Hambalyo!',
    },
    en: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      title: 'Countdown to the Meher Ceremony',
      celebratingNow: 'Today is the Meher Ceremony! Congratulations!',
    },
  }[lang];

  return (
    <div className="w-full max-w-md mx-auto my-6 px-4">
      <div className="text-center mb-3">
        <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#9C783E] font-semibold">
          {labels.title}
        </span>
      </div>

      {timeLeft.isPast ? (
        <div className="bg-[#FAF3EB] border border-[#D4AF37]/50 rounded-xl p-4 text-center text-[#7E5C20] font-serif font-medium">
          {labels.celebratingNow}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {[
            { value: timeLeft.days, label: labels.days },
            { value: timeLeft.hours, label: labels.hours },
            { value: timeLeft.minutes, label: labels.minutes },
            { value: timeLeft.seconds, label: labels.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-2.5 sm:p-3 bg-gradient-to-b from-[#FFFDF9] to-[#FBF4EC] border border-[#E8D7BE] rounded-xl shadow-xs"
            >
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#8C621C] tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans text-[#7D6B58] tracking-wider mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
