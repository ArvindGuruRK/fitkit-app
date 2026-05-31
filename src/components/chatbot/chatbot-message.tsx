'use client';

import { cn } from '@/lib/utils';
import { Bot } from 'lucide-react';
import type { ChatMessage } from './types';

interface ChatbotMessageProps {
  message: ChatMessage;
}

export function ChatbotMessage({ message }: ChatbotMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex items-end gap-2', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-red-600 flex items-center justify-center shadow-sm">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[78%] text-sm leading-relaxed shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-3.5 py-2.5'
            : 'bg-muted text-foreground rounded-2xl rounded-bl-sm px-3.5 py-2.5 border border-border/40'
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <time
          dateTime={message.timestamp.toISOString()}
          className={cn('block text-[10px] mt-1 opacity-60', isUser ? 'text-right' : 'text-left')}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>
    </div>
  );
}
