'use client';

import { X, Dumbbell } from 'lucide-react';

interface MinimizedBarProps {
  onExpand: () => void;
  onClose: () => void;
}

export function MinimizedBar({ onExpand, onClose }: MinimizedBarProps) {
  return (
    <div className="flex items-stretch bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg shadow-red-900/30 overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-red-900/40">
      <button
        onClick={onExpand}
        aria-label="Expand Fitix.ai chat"
        className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
          <Dumbbell className="w-3.5 h-3.5" />
        </div>
        <span className="text-sm font-headline tracking-widest select-none">FITIX.AI</span>
        <div className="flex items-center gap-1 ml-1" aria-hidden>
          <span className="w-1 h-1 rounded-full bg-white/70 animate-bounce [animation-delay:0ms]" />
          <span className="w-1 h-1 rounded-full bg-white/70 animate-bounce [animation-delay:150ms]" />
          <span className="w-1 h-1 rounded-full bg-white/70 animate-bounce [animation-delay:300ms]" />
        </div>
      </button>

      <div className="w-px bg-white/20 my-1.5" aria-hidden />

      <button
        onClick={onClose}
        aria-label="Close Fitix.ai chat"
        className="px-3 flex items-center justify-center hover:bg-white/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
