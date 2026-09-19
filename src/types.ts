export interface WeddingDetails {
  eventName: string;
  subTitle: string;
  groomName: string;
  brideName: string;
  date: string; // YYYY-MM-DD
  time: string;
  city: string;
  venue: string;
  address: string;
  quranicVerse: string;
  quranicVerseTranslation: string;
  somaliBlessing: string;
}

export interface GuestWish {
  id: string;
  senderName: string;
  relation?: string;
  message: string;
  timestamp: string;
}

export interface RSVPData {
  id: string;
  fullName: string;
  phone?: string;
  attending: 'yes' | 'no' | 'maybe';
  guestsCount: number;
  message?: string;
  timestamp: string;
}

export type Language = 'so' | 'en';
