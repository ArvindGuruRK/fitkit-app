'use client';

import { useState, useCallback } from 'react';
import { ChatbotLauncher } from './chatbot-launcher';
import { ChatbotPanel } from './chatbot-panel';
import { MinimizedBar } from './minimized-bar';
import type { ChatMessage } from './types';

const WELCOME_MESSAGE = "Hey there! I'm Fitix.ai, your personal AI fitness coach. Ask me about workouts, nutrition, recovery, or anything fitness-related!";

const MOCK_RESPONSE = "Great question! I'm still calibrating my fitness algorithms for you. Full personalized coaching — workout plans, nutrition guidance, and progress tracking — is coming very soon. Stay strong!";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: 'welcome', role: 'assistant', content: WELCOME_MESSAGE, timestamp: new Date() },
  ]);
  const [showTyping, setShowTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [hasUnread, setHasUnread] = useState(true);

  const open = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const minimize = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(true);
  }, []);

  const handleFabClick = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  const handleSend = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed || showTyping) return;

    setMessages(prev => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', content: trimmed, timestamp: new Date() },
    ]);
    setInputValue('');
    setShowTyping(true);

    setTimeout(() => {
      setShowTyping(false);
      setMessages(prev => [
        ...prev,
        { id: `ai-${Date.now()}`, role: 'assistant', content: MOCK_RESPONSE, timestamp: new Date() },
      ]);
    }, 2000);
  }, [inputValue, showTyping]);

  const handleSuggestionClick = useCallback((text: string) => {
    setInputValue(text);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      <ChatbotPanel
        isOpen={isOpen}
        messages={messages}
        showTyping={showTyping}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSend={handleSend}
        onClose={close}
        onMinimize={minimize}
        onSuggestionClick={handleSuggestionClick}
      />

      {isMinimized && <MinimizedBar onExpand={open} onClose={close} />}

      <ChatbotLauncher
        isOpen={isOpen}
        hasUnread={hasUnread && !isOpen && !isMinimized}
        onClick={handleFabClick}
      />
    </div>
  );
}
