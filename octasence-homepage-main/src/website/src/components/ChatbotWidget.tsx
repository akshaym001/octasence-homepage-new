'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

// ─── Shared OctaSence Logo (inline SVG — fully transparent background) ────────
const OctaSenceLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient
        id="octa-grad"
        x1="0"
        y1="0"
        x2="100"
        y2="100"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </defs>
    {/* Outer spokes + nodes */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 50 + 28 * Math.cos(rad);
      const y1 = 50 + 28 * Math.sin(rad);
      const x2 = 50 + 44 * Math.cos(rad);
      const y2 = 50 + 44 * Math.sin(rad);
      return (
        <g key={i}>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#octa-grad)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx={x2} cy={y2} r="5" fill="url(#octa-grad)" />
        </g>
      );
    })}
    {/* Inner ring */}
    <circle
      cx="50"
      cy="50"
      r="26"
      stroke="url(#octa-grad)"
      strokeWidth="5"
      fill="none"
    />
    {/* Center dot */}
    <circle cx="50" cy="50" r="8" fill="url(#octa-grad)" />
  </svg>
);

// ─── Typing indicator ────────────────────────────────────────────────────────
const TypingDots: React.FC = () => (
  <div className="flex items-center gap-2 px-2 py-2">
    <OctaSenceLogo size={26} className="flex-shrink-0" />
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-[#5b6cf3]"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  </div>
);

// ─── Icon helpers ─────────────────────────────────────────────────────────────
const ExpandIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4"
    />
  </svg>
);

const CollapseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 9H4m5 0V4M15 9h5m-5 0V4M9 15H4m5 0v5M15 15h5m-5 0v5"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-white"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

// ─── Main Widget ─────────────────────────────────────────────────────────────
const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      text: "Hi there! I'm the OctaSence AI Assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: "Thank you for reaching out! Our team is here to help you with OctaSence's infrastructure monitoring platform. A specialist will respond shortly.",
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const widgetWidth = isExpanded ? 430 : 360;
  const widgetHeight = isExpanded ? 610 : 520;

  return (
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end gap-3">
      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{ width: widgetWidth, height: widgetHeight, fontSize }}
            className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white"
          >
            {/* ── Header ── */}
            <div className="bg-gradient-to-r from-[#5b6cf3] to-[#7c3aed] px-4 pt-3 pb-3 flex-shrink-0">
              {/* Row 1: Close button pinned top-right */}
              <div className="flex justify-end mb-1">
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition text-white"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Row 2: Logo + title */}
              <div className="flex items-center gap-3">
                {/* Logo with green active dot — same SVG as FAB */}
                <div className="relative flex-shrink-0">
                  <OctaSenceLogo size={42} />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white shadow-sm" />
                </div>

                {/* Title + subtitle */}
                <div className="min-w-0 flex-1">
                  <p className="text-white font-bold text-sm whitespace-nowrap leading-tight">
                    Welcome to OctaSence AI Assistant
                  </p>
                  <p className="text-white/70 text-xs mt-0.5">
                    An expert from our team is on the way
                  </p>
                </div>
              </div>

              {/* Row 3: Controls — Expand | Zoom+ | Zoom- */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => setIsExpanded((p) => !p)}
                  title={isExpanded ? 'Collapse' : 'Expand'}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition"
                >
                  {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
                  <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
                </button>

                <div className="flex items-center gap-1.5 ml-auto">
                  <button
                    onClick={() => setFontSize((f) => Math.min(f + 2, 22))}
                    title="Zoom In"
                    className="w-7 h-7 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] flex items-center justify-center text-white font-bold text-lg leading-none transition shadow"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setFontSize((f) => Math.max(f - 2, 10))}
                    title="Zoom Out"
                    className="w-7 h-7 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] flex items-center justify-center text-white font-bold text-lg leading-none transition shadow"
                  >
                    −
                  </button>
                </div>
              </div>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-[#f5f6ff]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-start gap-2'}`}
                >
                  {/* Bot avatar — same SVG logo as FAB */}
                  {msg.role === 'bot' && (
                    <div className="flex-shrink-0 mt-1">
                      <OctaSenceLogo size={26} />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#5b6cf3] text-white rounded-br-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm'
                    }`}
                    style={{ fontSize }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator — same SVG logo + bouncing dots */}
              {isLoading && <TypingDots />}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input ── */}
            <div className="px-3 py-3 bg-white border-t border-gray-100 flex gap-2 items-center flex-shrink-0">
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-gray-700 outline-none focus:border-[#5b6cf3] focus:ring-2 focus:ring-[#5b6cf3]/20 transition bg-gray-50"
                placeholder="Type a message..."
                style={{ fontSize }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="w-9 h-9 rounded-full bg-[#5b6cf3] hover:bg-[#4a5be0] disabled:opacity-50 flex items-center justify-center transition-all active:scale-90 shadow"
              >
                <SendIcon />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB — pure SVG logo, no background at all ── */}
      <motion.button
        onHoverStart={() => setIsLogoHovered(true)}
        onHoverEnd={() => setIsLogoHovered(false)}
        onClick={() => setIsOpen((p) => !p)}
        whileTap={{ scale: 0.88 }}
        className="relative focus:outline-none"
        aria-label="Open OctaSence AI Chat"
        style={{ background: 'none', border: 'none', padding: 0 }}
      >
        {/* Rotating logo — same OctaSenceLogo SVG */}
        <motion.div
          animate={{ rotate: isLogoHovered ? 360 : 0 }}
          transition={
            isLogoHovered
              ? { duration: 2, ease: 'linear', repeat: Infinity }
              : { duration: 0.5, ease: 'easeOut' }
          }
        >
          <OctaSenceLogo size={64} className="drop-shadow-xl" />
        </motion.div>

        {/* Green / grey status dot */}
        <span
          className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white shadow-md transition-colors duration-300 ${
            isOpen ? 'bg-green-400' : 'bg-gray-400'
          }`}
        />
      </motion.button>
    </div>
  );
};

export default ChatbotWidget;
