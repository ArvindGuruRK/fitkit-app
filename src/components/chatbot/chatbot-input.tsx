'use client';

import { useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatbotInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export function ChatbotInput({ value, onChange, onSend, disabled }: ChatbotInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="flex-shrink-0 border-t border-border/50 px-3 py-3 bg-background/80 backdrop-blur-sm">
      <div className="flex items-end gap-2 bg-muted/60 rounded-xl border border-border/50 px-3 py-2 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary/40 transition-all duration-200">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask Fitix.ai anything..."
          rows={1}
          disabled={disabled}
          aria-label="Message input"
          className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none leading-5 py-0.5 min-h-[20px] max-h-24 overflow-y-auto"
        />
        <button
          onClick={onSend}
          disabled={!canSend}
          aria-label="Send message"
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
            canSend
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 shadow-sm hover:shadow-primary/30'
              : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
          )}
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="text-center text-[10px] text-muted-foreground/60 mt-2 select-none">
        Fitix.ai · AI-powered fitness assistant
      </p>
    </div>
  );
}
