import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-background-dark py-12 lg:px-20">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3 opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-xl">rocket_launch</span>
          </div>
          <span className="text-sm font-bold tracking-tight text-white uppercase">RG Digital Studio</span>
        </div>
        
        <div className="text-sm text-slate-400">
          © 2024 RG Digital Studio. All rights reserved.
        </div>
        
        <div className="flex gap-6">
          <a 
            className="text-slate-400 hover:text-[#E4405F] transition-all duration-300" 
            href="https://instagram.com/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram text-2xl"></i>
          </a>
          <a 
            className="text-slate-400 hover:text-[#0A66C2] transition-all duration-300" 
            href="https://linkedin.com/in/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin text-2xl"></i>
          </a>
          <a 
            className="text-slate-400 hover:text-[#25D366] transition-all duration-300" 
            href="https://wa.me/yourphonenumber" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <i className="fa-brands fa-whatsapp text-2xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
