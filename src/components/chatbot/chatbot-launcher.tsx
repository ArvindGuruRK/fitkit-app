'use client';

import { MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatbotLauncherProps {
  isOpen: boolean;
  hasUnread: boolean;
  onClick: () => void;
}

export function ChatbotLauncher({ isOpen, hasUnread, onClick }: ChatbotLauncherProps) {
  return (
    <div className="relative flex-shrink-0">
      {!isOpen && (
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" aria-hidden />
      )}

      {hasUnread && (
        <span className="absolute -top-1 -right-1 z-10 min-w-[18px] h-[18px] rounded-full bg-green-500 border-2 border-background flex items-center justify-center px-1">
          <span className="text-[9px] text-white font-bold leading-none" aria-label="1 unread message">1</span>
        </span>
      )}

      <button
        onClick={onClick}
        aria-label={isOpen ? 'Close Fitix.ai' : 'Open Fitix.ai'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={cn(
          'relative w-14 h-14 rounded-full',
          'flex items-center justify-center overflow-hidden',
          'bg-primary text-primary-foreground',
          'shadow-lg shadow-primary/40',
          'transition-all duration-300 ease-out',
          'hover:scale-110 hover:shadow-xl hover:shadow-primary/50',
          'active:scale-95',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        )}
      >
        {/* MessageSquare — visible when closed */}
        <span
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-all duration-300',
            isOpen ? 'opacity-0 scale-75 rotate-90' : 'opacity-100 scale-100 rotate-0'
          )}
          aria-hidden
        >
          <MessageSquare className="w-6 h-6" strokeWidth={2} />
        </span>

        {/* X — visible when open */}
        <span
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-all duration-300',
            isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-90'
          )}
          aria-hidden
        >
          <X className="w-6 h-6" strokeWidth={2.5} />
        </span>
      </button>
    </div>
  );
}
