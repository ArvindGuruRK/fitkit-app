'use client';

import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2" aria-label="Fitix.ai is typing" aria-live="polite">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-red-600 flex items-center justify-center shadow-sm">
        <Bot className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="bg-muted border border-border/40 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
