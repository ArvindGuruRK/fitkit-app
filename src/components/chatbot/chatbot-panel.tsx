'use client';

import { cn } from '@/lib/utils';
import { ChatbotHeader } from './chatbot-header';
import { ChatbotMessages } from './chatbot-messages';
import { ChatbotInput } from './chatbot-input';
import type { ChatMessage } from './types';

interface ChatbotPanelProps {
  isOpen: boolean;
  messages: ChatMessage[];
  showTyping: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onSuggestionClick: (text: string) => void;
}

export function ChatbotPanel({
  isOpen,
  messages,
  showTyping,
  inputValue,
  onInputChange,
  onSend,
  onClose,
  onMinimize,
  onSuggestionClick,
}: ChatbotPanelProps) {
  return (
    <div
      role="dialog"
      aria-label="Fitix.ai chat"
      aria-modal="true"
      aria-hidden={!isOpen}
      className={cn(
        'w-[380px] max-w-[calc(100vw-32px)] h-[520px] max-h-[calc(100svh-120px)]',
        'rounded-2xl overflow-hidden flex flex-col',
        'bg-background border border-border',
        'shadow-2xl shadow-black/25',
        'transition-all duration-300 ease-out origin-bottom-right',
        isOpen
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
      )}
    >
      <ChatbotHeader onClose={onClose} onMinimize={onMinimize} />
      <ChatbotMessages
        messages={messages}
        showTyping={showTyping}
        onSuggestionClick={onSuggestionClick}
      />
      <ChatbotInput
        value={inputValue}
        onChange={onInputChange}
        onSend={onSend}
        disabled={showTyping}
      />
    </div>
  );
}
