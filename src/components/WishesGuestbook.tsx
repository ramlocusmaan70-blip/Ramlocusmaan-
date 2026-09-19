import React, { useState } from 'react';
import { Heart, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestWish, Language } from '../types';

interface WishesGuestbookProps {
  wishes: GuestWish[];
  onAddWish: (wish: GuestWish) => void;
  lang: Language;
}

export const WishesGuestbook: React.FC<WishesGuestbookProps> = ({
  wishes,
  onAddWish,
  lang,
}) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: GuestWish = {
      id: Date.now().toString(),
      senderName: name.trim(),
      relation: relation.trim() || undefined,
      message: message.trim(),
      timestamp: 'Hadda / Just now',
    };

    onAddWish(newWish);
    setName('');
    setRelation('');
    setMessage('');

    confetti({
      particleCount: 35,
      spread: 50,
      colors: ['#D4AF37', '#F5D6CE'],
    });
  };

  const text = {
    so: {
      title: 'Ducada & Hambalyada Martida',
      subtitle: 'Reeb ereyo barakeysan iyo duco aad ku maamuuseyso arooska cusub',
      namePlaceholder: 'Magacaaga',
      relationPlaceholder: 'Xiriirka (e.g. Qaraabo, Saaxiib)',
      messagePlaceholder: 'Ku qor ducadaada halkan (e.g. Barakallahu lakumaa, guri nabad leh...)',
      sendBtn: 'Dir Ducada',
      guestbookTitle: 'Ducadii Martida Ee Ugu Dambeysay',
    },
    en: {
      title: 'Blessings & Guest Wishes',
      subtitle: 'Share your warm congratulations and prayers for the happy couple',
      namePlaceholder: 'Your Name',
      relationPlaceholder: 'Relation (e.g. Family, Friend)',
      messagePlaceholder: 'Write your heartfelt blessing (e.g. May Allah bless your union...)',
      sendBtn: 'Send Blessing',
      guestbookTitle: 'Recent Warm Wishes',
    },
  }[lang];

  return (
    <div className="w-full max-w-2xl mx-auto my-8 px-4">
      <div className="bg-[#FAF6F0] rounded-2xl border border-[#E8DFC9] p-5 sm:p-7 shadow-sm">
        <div className="text-center mb-6">
          <div className="inline-flex p-2 rounded-full bg-[#F5ECE0] text-[#9E7A3D] mb-2">
            <Heart className="w-5 h-5 fill-[#C5A059] text-[#C5A059]" />
          </div>
          <h3 className="font-serif-display text-xl sm:text-2xl text-[#3B2C24] font-bold">
            {text.title}
          </h3>
          <p className="text-xs font-sans text-[#7D6B58] mt-1">{text.subtitle}</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={text.namePlaceholder}
              className="px-3.5 py-2.5 bg-[#FFFDF9] border border-[#D9CBB7] rounded-xl text-xs sm:text-sm text-[#2C2420] placeholder-[#A89886] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
            />
            <input
              type="text"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              placeholder={text.relationPlaceholder}
              className="px-3.5 py-2.5 bg-[#FFFDF9] border border-[#D9CBB7] rounded-xl text-xs sm:text-sm text-[#2C2420] placeholder-[#A89886] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>
          <div className="relative">
            <textarea
              required
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={text.messagePlaceholder}
              className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#D9CBB7] rounded-xl text-xs sm:text-sm text-[#2C2420] placeholder-[#A89886] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>
          <button
            id="send-wedding-wish-btn"
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-[#4A3521] hover:bg-[#3B2A18] text-[#FAF4EC] rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ml-auto"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{text.sendBtn}</span>
          </button>
        </form>

        {/* Wishes List */}
        <div className="border-t border-[#E8DFC9] pt-4">
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#9C783E] font-semibold block mb-3">
            {text.guestbookTitle} ({wishes.length})
          </span>
          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="bg-[#FFFDF9] border border-[#EDE3D4] p-3 rounded-xl shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#3B2C24]">
                      {w.senderName}
                    </span>
                    {w.relation && (
                      <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-[#F3EBE0] text-[#7A6043]">
                        {w.relation}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#A39282] font-sans">{w.timestamp}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C4B3C] font-serif italic">
                  "{w.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
