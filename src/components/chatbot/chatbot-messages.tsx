'use client';

import { useEffect, useRef } from 'react';
import { ChatbotMessage } from './chatbot-message';
import { TypingIndicator } from './chatbot-typing';
import type { ChatMessage } from './types';

const SUGGESTIONS = [
  'Create a workout plan',
  'Nutrition tips',
  'Track my progress',
  'Best ab exercises',
];

interface ChatbotMessagesProps {
  messages: ChatMessage[];
  showTyping: boolean;
  onSuggestionClick: (text: string) => void;
}

export function ChatbotMessages({ messages, showTyping, onSuggestionClick }: ChatbotMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const showSuggestions = messages.length === 1 && messages[0].role === 'assistant';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 [scrollbar-width:thin] [scrollbar-color:hsl(var(--border))_transparent]">
      {messages.map(message => (
        <ChatbotMessage key={message.id} message={message} />
      ))}

      {showSuggestions && (
        <div className="flex flex-wrap gap-2 pt-1" role="list" aria-label="Suggested questions">
          {SUGGESTIONS.map(suggestion => (
            <button
              key={suggestion}
              role="listitem"
              onClick={() => onSuggestionClick(suggestion)}
              className="text-xs px-3 py-1.5 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {showTyping && <TypingIndicator />}
      <div ref={bottomRef} aria-hidden />
    </div>
  );
}
