import React, { useRef } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Download,
  CheckCircle2,
  Mail,
  HeartHandshake,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WeddingDetails, Language } from '../types';
import { FloralCorner, GoldFlourishDivider, BismillahCalligraphy } from './FloralAccents';
import { CountdownTimer } from './CountdownTimer';

interface InvitationCardProps {
  details: WeddingDetails;
  lang: Language;
  onOpenRsvp: () => void;
  onOpenVenue: () => void;
  onResealEnvelope: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  details,
  lang,
  onOpenRsvp,
  onOpenVenue,
  onResealEnvelope,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShareWhatsApp = () => {
    const textMessage =
      lang === 'so'
        ? `Waxaa si sharaf leh lagugu casuumay Xafladda Meherka (Nikax) ee ${details.groomName} iyo ${details.brideName}.\n📅 Taariikhda: 30/09/2026 (4:00 PM)\n📍 Goobta: ${details.venue}, ${details.city}\nKaarka dijitaalka ah ka eeg halkan: ${window.location.href}`
        : `You are cordially invited to the Meher (Nikax) ceremony of ${details.groomName} & ${details.brideName}.\n📅 Date: 30/09/2026 (4:00 PM)\n📍 Venue: ${details.venue}, ${details.city}\nView digital invitation: ${window.location.href}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(textMessage)}`, '_blank');
  };

  const handleAddToCalendar = () => {
    // September 30, 2026 from 16:00 to 21:00 East Africa Time
    const title = `Meher Ceremony: ${details.groomName} & ${details.brideName}`;
    const location = `${details.venue}, ${details.city}`;
    const description = `Meher (Nikax) Wedding Ceremony for ${details.groomName} & ${details.brideName} at ${details.venue}, ${details.city}.`;
    const startTime = '20260930T130000Z'; // 16:00 EAT (UTC+3)
    const endTime = '20260930T180000Z';

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(location)}`;

    window.open(googleUrl, '_blank');
  };

  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Meher Ceremony//Suheyr and Suheyr//SO',
      'BEGIN:VEVENT',
      'UID:' + Date.now() + '@wedding.suheyr',
      'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      'DTSTART:20260930T130000Z',
      'DTEND:20260930T180000Z',
      `SUMMARY:Meher (Nikax) Ceremony: ${details.groomName} & ${details.brideName}`,
      `DESCRIPTION:Celebration of Meher at ${details.venue}, ${details.city}`,
      `LOCATION:${details.venue}, ${details.city}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Meher_Suheyr_and_Suheyr_Invitation.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintCard = () => {
    window.print();
  };

  const text = {
    so: {
      invitationIntro: 'Waxaa sharaf noo ah inaan idinku casuuno',
      meherBadge: 'Munaasabadda Meherka (Nikax)',
      and: 'iyo',
      groomLabel: 'Arooska',
      brideLabel: 'Aroosadda',
      dateLabel: 'Taariikhda',
      dateValue: '30 / 09 / 2026',
      dateFull: 'Arbaco, 30 September 2026',
      timeLabel: 'Waqtiga',
      timeValue: '4:00 Galabnimo',
      cityLabel: 'Magaalada',
      venueLabel: 'Hoolka / Huteelka',
      somaliDuco: 'Guri nabad leh iyo ubad khayr qaba',
      arabicDuco: 'بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
      quranVerseArabic:
        'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
      quranVerseText:
        '“Calaamooyinkiisa waxaa ka mid ah inuu idiinka abuuray naftiinna ahaan haween si aad ugu xasishaan, wuxuuna dhexdiina dhigay jacayl iyo naxariis.”',
      quranSurah: 'Suuradda Ar-Ruum: 21',
      rsvpBtn: 'Xaqiiji RSVP',
      venueBtn: 'Goobta & Khariidada',
      calendarBtn: 'Ku dar Kalandarka',
      shareBtn: 'La wadaag WhatsApp',
      resealBtn: 'Dib ugu xidh Baqshadda (Envelope)',
      printBtn: 'Daabac Kaarka',
      familiesHonor: 'Qoysaska labada dhinac waxay ku faraxsan yihiin imaanshihiina sharafta leh.',
    },
    en: {
      invitationIntro: 'Cordially request the pleasure of your company to celebrate',
      meherBadge: 'The Meher (Nikax) Ceremony',
      and: 'and',
      groomLabel: 'Groom',
      brideLabel: 'Bride',
      dateLabel: 'Date',
      dateValue: '30 / 09 / 2026',
      dateFull: 'Wednesday, September 30, 2026',
      timeLabel: 'Time',
      timeValue: '4:00 PM Afternoon',
      cityLabel: 'City',
      venueLabel: 'Venue',
      somaliDuco: 'A home filled with peace, love, and blessed offspring',
      arabicDuco: 'May Allah bless you, shower His blessings upon you, and unite you both in goodness.',
      quranVerseArabic:
        'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
      quranVerseText:
        '“And among His Signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.”',
      quranSurah: 'Surah Ar-Rum [30:21]',
      rsvpBtn: 'Confirm RSVP',
      venueBtn: 'Venue & Directions',
      calendarBtn: 'Add to Calendar',
      shareBtn: 'Share on WhatsApp',
      resealBtn: 'Close Envelope',
      printBtn: 'Print / Save Card',
      familiesHonor: 'The families joyfully welcome your honorable presence to grace this blessed celebration.',
    },
  }[lang];

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-4 transition-all">
      {/* Action Header Bar for guests */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 print:hidden px-1">
        <button
          id="reseal-envelope-btn"
          onClick={onResealEnvelope}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#F3EBE0] border border-[#E2D6C3] text-xs font-sans text-[#735A42] font-medium transition-colors cursor-pointer shadow-2xs"
        >
          <Mail className="w-3.5 h-3.5 text-[#A07B3A]" />
          <span>{text.resealBtn}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="print-invitation-btn"
            onClick={handlePrintCard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#F3EBE0] border border-[#E2D6C3] text-xs font-sans text-[#735A42] font-medium transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#A07B3A]" />
            <span className="hidden sm:inline">{text.printBtn}</span>
            <span className="sm:hidden">{lang === 'so' ? 'Daabac' : 'Print'}</span>
          </button>

          <button
            id="share-whatsapp-top-btn"
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-xs font-sans text-[#1B773D] font-medium transition-colors cursor-pointer shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      {/* THE MASTER INVITATION CARD */}
      <div
        ref={cardRef}
        id="wedding-invitation-master-card"
        className="relative bg-[#FDFAF5] rounded-2xl sm:rounded-3xl border-2 border-[#D4AF37]/50 shadow-2xl p-6 sm:p-12 overflow-hidden card-paper-texture"
      >
        {/* Four corner floral & gold accents */}
        <FloralCorner position="top-left" className="top-1 left-1" />
        <FloralCorner position="top-right" className="top-1 right-1" />
        <FloralCorner position="bottom-left" className="bottom-1 left-1" />
        <FloralCorner position="bottom-right" className="bottom-1 right-1" />

        {/* Inner delicate gold frame border */}
        <div className="absolute inset-3 sm:inset-5 rounded-xl sm:rounded-2xl border border-[#D4AF37]/40 pointer-events-none" />
        <div className="absolute inset-4 sm:inset-6 rounded-lg sm:rounded-xl border border-[#D4AF37]/20 pointer-events-none" />

        {/* Card Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
          {/* Islamic Bismillah in fine gold & Arabic script */}
          <BismillahCalligraphy className="mb-4 mt-2" />

          {/* Quranic Verse Box */}
          <div className="my-3 px-4 py-3 bg-[#FAF3EB]/70 border border-[#EBDAC3] rounded-xl max-w-md">
            <p
              className="text-sm sm:text-base font-serif text-[#78541D] leading-relaxed mb-1.5 font-medium"
              dir="rtl"
            >
              {text.quranVerseArabic}
            </p>
            <p className="text-[11px] sm:text-xs font-serif italic text-[#7D6A58] leading-normal">
              {text.quranVerseText}
            </p>
            <span className="text-[9px] font-sans uppercase tracking-widest text-[#A89078] block mt-1">
              {text.quranSurah}
            </span>
          </div>

          <GoldFlourishDivider />

          {/* Event Banner */}
          <div className="mt-1 mb-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F7EBE8] via-[#FAF3EB] to-[#F7EBE8] border border-[#D4AF37]/45 text-[#8A631E] font-sans text-xs tracking-[0.25em] uppercase font-bold shadow-2xs">
              {text.meherBadge}
            </span>
          </div>

          <p className="text-xs font-sans text-[#786450] tracking-wide my-1.5">
            {text.invitationIntro}
          </p>

          {/* GROOM AND BRIDE NAMES IN DISPLAY SERIF & CURSIVE ACCENTS */}
          <div className="my-5 w-full">
            <div className="flex flex-col items-center justify-center">
              {/* Groom's Name */}
              <div className="space-y-0.5">
                <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#9E7A3D] font-semibold block">
                  {text.groomLabel}
                </span>
                <h1
                  className="font-serif-display text-4xl sm:text-5xl font-bold tracking-wide gold-foil-text py-1"
                  style={{ textShadow: '0 1px 2px rgba(184, 134, 11, 0.15)' }}
                >
                  {details.groomName}
                </h1>
              </div>

              {/* Romantic Ampersand & Script Flourish */}
              <div className="flex items-center justify-center gap-3 my-1">
                <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <span className="font-script text-3xl sm:text-4xl text-[#B8860B] select-none">
                  &
                </span>
                <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>

              {/* Bride's Name */}
              <div className="space-y-0.5">
                <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#9E7A3D] font-semibold block">
                  {text.brideLabel}
                </span>
                <h1
                  className="font-serif-display text-4xl sm:text-5xl font-bold tracking-wide gold-foil-text py-1"
                  style={{ textShadow: '0 1px 2px rgba(184, 134, 11, 0.15)' }}
                >
                  {details.brideName}
                </h1>
              </div>
            </div>
          </div>

          <GoldFlourishDivider />

          {/* CEREMONY DETAILS (Date, City, Venue, Time) */}
          <div className="w-full bg-[#FAF5ED] border border-[#E8DFC9] rounded-2xl p-4 sm:p-5 my-3 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5D7C2]">
              {/* Date & Time Column */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:pr-3">
                <div className="flex items-center gap-2 mb-1 text-[#8C621C]">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-sans uppercase tracking-widest font-semibold">
                    {text.dateLabel}
                  </span>
                </div>
                <p className="font-serif text-lg sm:text-xl font-bold text-[#3B2C24]">
                  {text.dateFull}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#7A644D] mt-1 font-sans">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{text.timeValue}</span>
                </div>
              </div>

              {/* City & Venue Column */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left pt-3 sm:pt-0 sm:pl-4">
                <div className="flex items-center gap-2 mb-1 text-[#8C621C]">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-sans uppercase tracking-widest font-semibold">
                    {text.venueLabel} & {text.cityLabel}
                  </span>
                </div>
                <p className="font-serif text-lg sm:text-xl font-bold text-[#3B2C24]">
                  {details.venue}
                </p>
                <p className="text-xs text-[#7A644D] mt-1 font-sans flex items-center gap-1">
                  <span>{details.city}, Somali Region</span>
                  <button
                    onClick={onOpenVenue}
                    className="text-[#9E7422] underline hover:text-[#7A5816] font-medium inline-flex items-center gap-0.5 ml-1 cursor-pointer"
                  >
                    <span>({lang === 'so' ? 'faahfaahin' : 'view map'})</span>
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Traditional Somali Wedding Blessing */}
          <div className="my-3 max-w-md">
            <p className="font-serif text-sm sm:text-base italic text-[#594230] font-medium">
              "{text.somaliDuco}"
            </p>
            <p className="text-xs font-serif text-[#8C6F4A] mt-0.5">
              {text.arabicDuco}
            </p>
          </div>

          {/* Countdown Timer */}
          <CountdownTimer targetDateStr={details.date} lang={lang} />

          {/* Families Honor Note */}
          <p className="text-[11px] font-sans text-[#8C7B6C] max-w-sm mt-1 mb-5">
            {text.familiesHonor}
          </p>

          {/* PRIMARY INTERACTIVE CALL TO ACTIONS */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full print:hidden">
            <button
              id="invitation-rsvp-btn"
              onClick={onOpenRsvp}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D8B467] to-[#B08933] text-[#342413] font-sans font-bold text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{text.rsvpBtn}</span>
            </button>

            <button
              id="invitation-venue-btn"
              onClick={onOpenVenue}
              className="px-5 py-3 rounded-xl bg-[#FFFDF9] hover:bg-[#FAF4EC] text-[#523B28] border border-[#D9CBB7] font-sans font-semibold text-sm shadow-2xs hover:shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>{text.venueBtn}</span>
            </button>

            <div className="relative group">
              <button
                id="invitation-calendar-btn"
                onClick={handleAddToCalendar}
                className="px-4 py-3 rounded-xl bg-[#FFFDF9] hover:bg-[#FAF4EC] text-[#523B28] border border-[#D9CBB7] font-sans font-semibold text-sm shadow-2xs hover:shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>{text.calendarBtn}</span>
              </button>
            </div>
          </div>

          {/* Quick .ics download link */}
          <div className="mt-3 print:hidden">
            <button
              onClick={handleDownloadICS}
              className="text-[11px] font-sans text-[#968270] hover:text-[#5C4532] underline cursor-pointer"
            >
              {lang === 'so'
                ? 'Soo degso faylka Kalandarka (.ics)'
                : 'Download iCal / Outlook (.ics file)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
