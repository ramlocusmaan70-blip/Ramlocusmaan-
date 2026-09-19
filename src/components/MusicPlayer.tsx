import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { Language } from '../types';

interface MusicPlayerProps {
  lang: Language;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ lang }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // Soft romantic wedding harp arpeggio scale notes (Hz)
  const notes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
  ];

  const playChimeNote = (ctx: AudioContext, freq: number, time: number) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Warm triangle wave with gentle overtones
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Gentle envelope: fast soft attack, prolonged warm decay
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.exponentialRampToValueAtTime(0.07, time + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 2.3);
    } catch {
      // Audio context may be closed
    }
  };

  const startMelody = () => {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContextClass();
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;
    let step = 0;
    const pattern = [0, 2, 4, 3, 2, 5, 4, 7, 4, 5, 3, 2, 4, 1, 0, 2];

    const playNext = () => {
      if (!ctx || ctx.state === 'closed') return;
      const noteIdx = pattern[step % pattern.length];
      const freq = notes[noteIdx % notes.length];
      playChimeNote(ctx, freq, ctx.currentTime);
      step++;
      timerRef.current = window.setTimeout(playNext, 680);
    };

    playNext();
    setIsPlaying(true);
  };

  const stopMelody = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMelody();
    } else {
      startMelody();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const label = lang === 'so' ? (isPlaying ? 'Jooji Muusigga' : 'Daar Codka Arooska') : (isPlaying ? 'Mute Music' : 'Play Wedding Melody');

  return (
    <button
      id="wedding-music-toggle-btn"
      onClick={toggleMusic}
      title={label}
      aria-label={label}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-300 text-xs font-sans tracking-wide cursor-pointer shadow-xs ${
        isPlaying
          ? 'bg-[#F4ECE1] text-[#8C621C] border-[#D4AF37] ring-2 ring-[#D4AF37]/20'
          : 'bg-[#FFFDF9]/90 hover:bg-[#FAF4EC] text-[#6B5742] border-[#E8DCcb]'
      }`}
    >
      {isPlaying ? (
        <>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8860B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B8860B]"></span>
          </span>
          <Volume2 className="w-3.5 h-3.5 text-[#B8860B]" />
        </>
      ) : (
        <>
          <Music className="w-3.5 h-3.5 text-[#8C765E]" />
          <VolumeX className="w-3.5 h-3.5 text-[#8C765E]" />
        </>
      )}
      <span className="font-medium">{label}</span>
    </button>
  );
};
