'use client';

import { X, Minus, Dumbbell } from 'lucide-react';

interface ChatbotHeaderProps {
  onClose: () => void;
  onMinimize: () => void;
}

export function ChatbotHeader({ onClose, onMinimize }: ChatbotHeaderProps) {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 border-b border-red-800/30">
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
        <Dumbbell className="w-5 h-5 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-white font-headline text-sm tracking-widest select-none">FITIX.AI</h2>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden />
          <p className="text-white/75 text-[11px]">AI Fitness Coach · Online</p>
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={onMinimize}
          aria-label="Minimize chat"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
