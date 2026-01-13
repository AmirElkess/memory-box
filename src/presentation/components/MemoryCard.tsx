import React from 'react';
import { Memory } from '../../domain/entities/Memory';

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 border border-stone-200 rounded-lg hover:border-amber-400 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{memory.sentiment}</span>
            <span className="text-xs text-stone-500">{memory.date}</span>
          </div>
          <p className="text-stone-700 line-clamp-2">{memory.text}</p>
        </div>
      </div>
    </button>
  );
};