import { CommentSection } from "../components/CommentSection";
import { Memory } from "../../domain/entities/Memory";
import { X } from 'lucide-react';

interface ReliveMemoryViewProps {
  memory: Memory;
  newComment: string;
  onCommentChange: (value: string) => void;
  onAddComment: () => void;
  onClose: () => void;
}

export const ReliveMemoryView: React.FC<ReliveMemoryViewProps> = ({
  memory,
  newComment,
  onCommentChange,
  onAddComment,
  onClose
}) => {
  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-light text-stone-800">Reliving</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-stone-600" />
          </button>
        </div>

        <div className="bg-white shadow-sm border border-stone-200 rounded-lg p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-4xl">{memory.sentiment}</span>
            <span className="text-sm text-stone-500">{memory.date}</span>
          </div>

          {memory.image && (
            <div className="w-full h-64 bg-stone-100 rounded-lg" />
          )}

          <p className="text-lg text-stone-700 leading-relaxed">
            {memory.text}
          </p>

          <CommentSection
            comments={memory.comments}
            newComment={newComment}
            onCommentChange={onCommentChange}
            onAddComment={onAddComment}
          />
        </div>
      </div>
    </div>
  );
};