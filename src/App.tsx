/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Globe,
  Sliders,
  Mail,
  Heart,
  Sparkles,
  Share2,
  Calendar,
  Layers,
} from 'lucide-react';
import { WeddingDetails, GuestWish, RSVPData, Language } from './types';
import { EnvelopeView } from './components/EnvelopeView';
import { InvitationCard } from './components/InvitationCard';
import { RsvpModal } from './components/RsvpModal';
import { VenueInfoModal } from './components/VenueInfoModal';
import { CustomizeDrawer } from './components/CustomizeDrawer';
import { WishesGuestbook } from './components/WishesGuestbook';
import { MusicPlayer } from './components/MusicPlayer';

const DEFAULT_DETAILS: WeddingDetails = {
  eventName: 'Meher (Nikax)',
  subTitle: 'Xafladda Meherka Dhaqanka Soomaaliyeed',
  groomName: 'Suheyr',
  brideName: 'Suheyr',
  date: '2026-09-30',
  time: '16:00',
  city: 'Jigjiga',
  venue: 'Duulane Hotel',
  address: 'Duulane Hotel, Jigjiga, Somali Region',
  quranicVerse:
    'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  quranicVerseTranslation:
    'And among His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.',
  somaliBlessing: 'Guri nabad leh iyo ubad khayr qaba, bash-bash iyo barwaaqo.',
};

const INITIAL_WISHES: GuestWish[] = [
  {
    id: '1',
    senderName: 'Faarax & Xaawo',
    relation: 'Ehel / Family',
    message:
      'Barakallahu laka wa baraka calayka wa jamaca baynakumaa fii khayr. Guri nabad leh iyo ubad khayr qaba inshaAllah!',
    timestamp: 'Hambalyo Ehel',
  },
  {
    id: '2',
    senderName: 'Nimco Cabdi',
    relation: 'Saaxiib / Friend',
    message:
      'Hambalyo meherka barakeysan ee Suheyr & Suheyr! Waxaan idiin rajeynayaa nolosha ugu quruxda badan.',
    timestamp: 'Duco & Farxad',
  },
  {
    id: '3',
    senderName: 'Cabdiraxmaan Cali',
    relation: 'Adeer / Uncle',
    message: 'Ilaahay ha idinku barakeeyo reerkiinna cusub, nabad iyo caano!',
    timestamp: 'Jigjiga',
  },
];

export default function App() {
  const [details, setWeddingDetails] = useState<WeddingDetails>(() => {
    const saved = localStorage.getItem('wedding_details');
    return saved ? JSON.parse(saved) : DEFAULT_DETAILS;
  });

  const [lang, setLang] = useState<Language>('so');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isVenueOpen, setIsVenueOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    const saved = localStorage.getItem('wedding_wishes');
    return saved ? JSON.parse(saved) : INITIAL_WISHES;
  });

  const [rsvps, setRsvps] = useState<RSVPData[]>(() => {
    const saved = localStorage.getItem('wedding_rsvps');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wedding_details', JSON.stringify(details));
  }, [details]);

  useEffect(() => {
    localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
  }, [wishes]);

  useEffect(() => {
    localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));
  }, [rsvps]);

  const handleAddWish = (wish: GuestWish) => {
    setWishes((prev) => [wish, ...prev]);
  };

  const handleSaveRSVP = (rsvp: RSVPData) => {
    setRsvps((prev) => [rsvp, ...prev]);
    if (rsvp.message) {
      handleAddWish({
        id: Date.now().toString(),
        senderName: rsvp.fullName,
        relation: 'RSVP Guest',
        message: rsvp.message,
        timestamp: 'Hadda / Just now',
      });
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'so' ? 'en' : 'so'));
  };

  const resetDetails = () => {
    setWeddingDetails(DEFAULT_DETAILS);
    localStorage.removeItem('wedding_details');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2420] flex flex-col justify-between selection:bg-[#EBDCC8] selection:text-[#3B2C24]">
      {/* TOP NAVIGATION / UTILITY BAR */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFC9]/70 px-4 py-3 print:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Brand/Couple Monogram */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEnvelopeOpen(false)}
              className="flex items-center gap-2 text-left group cursor-pointer"
              title={lang === 'so' ? 'Ku laabo Baqshadda' : 'Back to Envelope'}
            >
              <div className="w-8 h-8 rounded-full border border-[#D4AF37] bg-[#F7EFE4] flex items-center justify-center shadow-xs">
                <span className="font-serif-display font-bold text-xs text-[#8C621C]">
                  S&S
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="font-serif-display text-sm font-bold text-[#3B2C24] block leading-tight">
                  {details.groomName} & {details.brideName}
                </span>
                <span className="text-[10px] font-sans text-[#8C765E] block leading-none">
                  {details.eventName} • {details.city}
                </span>
              </div>
            </button>
          </div>

          {/* Center / Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ambient romantic music toggle */}
            <MusicPlayer lang={lang} />

            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#FFFDF9] hover:bg-[#F7EFE4] border border-[#E2D6C3] text-xs font-sans text-[#5A4535] font-semibold transition-colors cursor-pointer shadow-2xs"
              title={lang === 'so' ? 'Switch to English' : 'U beddel Af-Soomaali'}
            >
              <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{lang === 'so' ? 'English' : 'Soomaali'}</span>
            </button>

            {/* View Mode Switcher: Envelope vs Card */}
            <button
              id="toggle-view-mode-btn"
              onClick={() => setIsEnvelopeOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#FFFDF9] hover:bg-[#F7EFE4] border border-[#E2D6C3] text-xs font-sans text-[#5A4535] font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              {isEnvelopeOpen ? (
                <>
                  <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="hidden md:inline">
                    {lang === 'so' ? 'Baqshadda' : 'Envelope'}
                  </span>
                </>
              ) : (
                <>
                  <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="hidden md:inline">
                    {lang === 'so' ? 'Kaarka' : 'Open Card'}
                  </span>
                </>
              )}
            </button>

            {/* Customize Drawer Trigger */}
            <button
              id="open-customize-drawer-btn"
              onClick={() => setIsCustomizeOpen(true)}
              className="p-2 rounded-full bg-[#FFFDF9] hover:bg-[#F7EFE4] border border-[#E2D6C3] text-[#5A4535] transition-colors cursor-pointer shadow-2xs"
              title={lang === 'so' ? 'Habee Magacyada & Faahfaahinta' : 'Customize Details'}
            >
              <Sliders className="w-4 h-4 text-[#8C621C]" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN VIEW AREA */}
      <main className="flex-1 flex flex-col items-center justify-center py-6 sm:py-10">
        {!isEnvelopeOpen ? (
          /* ENVELOPE VIEW - matches the uploaded image */
          <div className="w-full flex flex-col items-center animate-fade-in">
            <EnvelopeView
              isOpen={isEnvelopeOpen}
              onOpen={() => setIsEnvelopeOpen(true)}
              lang={lang}
              monogram="M"
              groomName={details.groomName}
              brideName={details.brideName}
            />

            {/* Subtle invitation prompt hint */}
            <p className="text-xs text-[#8C765E] text-center mt-4 max-w-sm px-4 font-sans">
              {lang === 'so'
                ? 'Kaarka casuumaadda ee rasmiga ah ee Meherka Suheyr & Suheyr — Huteelka Duulane, Jigjiga.'
                : 'Digital wedding & Meher ceremony invitation card for Suheyr & Suheyr — Duulane Hotel, Jigjiga.'}
            </p>
          </div>
        ) : (
          /* INVITATION CARD VIEW - pristine central wedding card */
          <div className="w-full flex flex-col items-center animate-fade-in">
            <InvitationCard
              details={details}
              lang={lang}
              onOpenRsvp={() => setIsRsvpOpen(true)}
              onOpenVenue={() => setIsVenueOpen(true)}
              onResealEnvelope={() => setIsEnvelopeOpen(false)}
            />

            {/* Guestbook & Warm Duco / Wishes Section */}
            <div className="w-full print:hidden">
              <WishesGuestbook
                wishes={wishes}
                onAddWish={handleAddWish}
                lang={lang}
              />
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#E8DFC9] bg-[#F7EFE4]/60 py-6 px-4 text-center print:hidden">
        <div className="max-w-md mx-auto space-y-2">
          <p className="font-serif text-sm text-[#4A3828] font-medium">
            {details.groomName} & {details.brideName} • Meher (Nikax)
          </p>
          <p className="text-xs text-[#7A644D] font-sans">
            30 September 2026 • {details.venue}, {details.city}
          </p>
          <div className="flex items-center justify-center gap-1 text-[11px] text-[#A08873] font-sans pt-1">
            <span>{lang === 'so' ? 'Waxaa lagu maamuusay jacayl & duco' : 'Honored with love and prayers'}</span>
            <Heart className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onSaveRSVP={handleSaveRSVP}
        lang={lang}
      />

      <VenueInfoModal
        isOpen={isVenueOpen}
        onClose={() => setIsVenueOpen(false)}
        details={details}
        lang={lang}
      />

      <CustomizeDrawer
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        details={details}
        onUpdateDetails={setWeddingDetails}
        onReset={resetDetails}
        lang={lang}
      />
    </div>
  );
}
