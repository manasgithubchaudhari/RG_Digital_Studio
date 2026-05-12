import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-background-dark py-12 lg:px-20">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3 transition-opacity">
          <img 
            src="/assets/img/logo.png" 
            alt="RG" 
            className="h-12 w-12 rounded-full object-cover border-2 border-primary shadow-[0_0_15px_rgba(109,40,217,0.4)] brightness-110 contrast-110 bg-white"
          />
          <div className="flex flex-col justify-center items-start">
            <span className="text-xl font-bold tracking-tight text-white leading-none mb-1">RG Digital Works</span>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase leading-none">Design &bull; Develop &bull; Grow</span>
          </div>
        </div>

        <div className="text-sm text-slate-400">
          © 2026 RG Digital Works. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a
            className="text-slate-400 hover:text-[#E4405F] transition-all duration-300 group"
            href="https://ig.me/m/rg.digital_works"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-opacity"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a
            className="text-slate-400 hover:text-[#0A66C2] transition-all duration-300 group"
            href="https://www.linkedin.com/in/rg-digital-works-a6972a405"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-opacity"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a
            className="text-slate-400 hover:text-[#25D366] transition-all duration-300 group"
            href="https://wa.me/917498540026"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-opacity"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
