import React from 'react';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/917498540026"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 hover:scale-110 hover:shadow-xl transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        width="32"
        height="32"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transform group-hover:-rotate-12 transition-transform duration-300"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 pointer-events-none">
        Chat with us
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
