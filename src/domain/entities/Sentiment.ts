export interface Sentiment {
  emoji: string;
  label: string;
}

export const SENTIMENTS: Sentiment[] = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '⭐', label: 'Special' },
  { emoji: '☕', label: 'Cozy' },
  { emoji: '☀️', label: 'Bright' },
];