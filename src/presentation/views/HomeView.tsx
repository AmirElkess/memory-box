import { MemoryCard } from "../components/MemoryCard";
import { Memory } from "../../domain/entities/Memory";
import { Plus, Star} from 'lucide-react';
import { Sentiment } from "../../domain/entities/Sentiment";

interface HomeViewProps {
  memories: Memory[];
  sentiments: Sentiment[];
  onCreateNew: () => void;
  onRandomMemory: () => void;
  onReliveBy: (sentiment: string) => void;
  onSelectMemory: (memory: Memory) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  memories,
  sentiments,
  onCreateNew,
  onRandomMemory,
  onReliveBy,
  onSelectMemory
}) => {
  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-stone-800 mb-2">Memory Box</h1>
          <p className="text-stone-600">Your personal collection of moments</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={onCreateNew}
            className="bg-white border-2 border-stone-200 rounded-lg p-8 hover:border-amber-400 hover:shadow-lg transition-all group"
          >
            <div className="flex flex-col items-center">
              <Plus className="w-12 h-12 text-amber-600 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-medium text-stone-800">New Memory</span>
              <span className="text-sm text-stone-500 mt-1">Capture a moment</span>
            </div>
          </button>

          <button
            onClick={onRandomMemory}
            className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg p-8 hover:shadow-lg transition-all group text-white"
          >
            <div className="flex flex-col items-center">
              <Star className="w-12 h-12 mb-3 group-hover:rotate-12 transition-transform" />
              <span className="text-lg font-medium">Random Memory</span>
              <span className="text-sm opacity-90 mt-1">Surprise me</span>
            </div>
          </button>
        </div>

        <div className="bg-white shadow-sm border border-stone-200 rounded-lg p-8">
          <h2 className="text-xl font-medium text-stone-800 mb-6">Relive by feeling</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sentiments.map((s) => {
              const count = memories.filter(m => m.sentiment === s.emoji).length;
              return (
                <button
                  key={s.emoji}
                  onClick={() => onReliveBy(s.emoji)}
                  disabled={count === 0}
                  className={`p-6 border-2 rounded-lg transition-all ${
                    count > 0
                      ? 'border-stone-200 hover:border-amber-400 hover:shadow-md bg-white'
                      : 'border-stone-100 bg-stone-50 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-2">{s.emoji}</div>
                  <div className="text-sm font-medium text-stone-700">{s.label}</div>
                  <div className="text-xs text-stone-500 mt-1">{count} memories</div>
                </button>
              );
            })}
          </div>
        </div>

        {memories.length > 0 && (
          <div className="mt-8 bg-white shadow-sm border border-stone-200 rounded-lg p-8">
            <h2 className="text-xl font-medium text-stone-800 mb-6">Recent Memories</h2>
            <div className="space-y-4">
              {memories.slice(0, 5).map((memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  onClick={() => onSelectMemory(memory)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
