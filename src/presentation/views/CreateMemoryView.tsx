import { SentimentSelector } from "../components/SentimentSelector";
import { X } from 'lucide-react';
import { Sentiment } from "../../domain/entities/Sentiment";
import { RichTextEditor } from '../components/RichTextEditor';


interface CreateMemoryViewProps {
  text: string;
  sentiment: string;
  sentiments: Sentiment[];
  onTextChange: (value: string) => void;
  onSentimentChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const CreateMemoryView: React.FC<CreateMemoryViewProps> = ({
  text,
  sentiment,
  sentiments,
  onTextChange,
  onSentimentChange,
  onSave,
  onCancel
}) => {
  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-light text-stone-800">New Memory</h1>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-stone-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-stone-600" />
          </button>
        </div>

        <div className="bg-white shadow-sm border border-stone-200 rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Memory
            </label>
            <RichTextEditor
              value={text}
              onChange={onTextChange}
              placeholder="What would you like to remember?"
            />
            {/* <textarea
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="What would you like to remember?"
              className="w-full h-40 p-4 border border-stone-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-amber-50/30"
            /> */}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-3">
              How does it feel?
            </label>
            <SentimentSelector
              sentiments={sentiments}
              selected={sentiment}
              onSelect={onSentimentChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Image (optional)
            </label>
            <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center hover:border-amber-400 transition-colors cursor-pointer bg-amber-50/30">
              <div className="w-8 h-8 mx-auto mb-2 text-stone-400 text-2xl">📷</div>
              <p className="text-sm text-stone-500">Click to upload image</p>
            </div>
          </div>

          <button
            onClick={onSave}
            disabled={!text || !sentiment}
            className="w-full py-4 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Save Memory
          </button>
        </div>
      </div>
    </div>
  );
};