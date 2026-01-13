import { Sentiment } from "../../domain/entities/Sentiment";

interface SentimentSelectorProps {
  sentiments: Sentiment[];
  selected: string;
  onSelect: (emoji: string) => void;
}

export const SentimentSelector: React.FC<SentimentSelectorProps> = ({
  sentiments,
  selected,
  onSelect
}) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {sentiments.map((s) => (
        <button
          key={s.emoji}
          onClick={() => onSelect(s.emoji)}
          className={`p-4 border-2 rounded-lg transition-all ${
            selected === s.emoji
              ? 'border-amber-500 bg-amber-100 shadow-md'
              : 'border-stone-200 bg-white hover:border-amber-300'
          }`}
        >
          <div className="text-3xl mb-1">{s.emoji}</div>
          <div className="text-sm text-stone-600">{s.label}</div>
        </button>
      ))}
    </div>
  );
};