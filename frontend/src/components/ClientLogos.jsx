import React from 'react';
import { Link } from 'react-router-dom';

const ClientLogos = () => {
  const logos = [
    { src: '/assets/img/logo1.jpeg', alt: 'Client Logo 1' },
    { src: '/assets/img/logo2.jpeg', alt: 'Client Logo 2' },
    { src: '/assets/img/logo3.jpeg', alt: 'Client Logo 3' },
    { src: '/assets/img/logo4.jpeg', alt: 'Client Logo 4' },
    { src: '/assets/img/logo5.jpeg', alt: 'Client Logo 5' },
    { src: '/assets/img/logo6.jpeg', alt: 'Client Logo 6' },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-20 py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold">Trusted by Industry Leaders</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Brands that have utilized our studio facilities</p>
        </div>
        <Link to="/portfolio" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
          View Case Studies <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {logos.map((logo, index) => (
          <div key={index} className="aspect-[4/3] glass-card rounded-2xl flex items-center justify-center p-6 group hover:border-primary/50 transition-all overflow-hidden bg-white/5">
            <img 
              src={logo.src} 
              alt={logo.alt} 
              loading="lazy"
              width="150"
              height="150"
              className="max-w-full max-h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Logo'; }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientLogos;
