import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`nav-floating fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}
    >
      <header className="mx-auto max-w-7xl px-6 lg:px-12 flex items-center justify-between bg-white/40 dark:bg-background-dark/40 backdrop-blur-[12px] border border-slate-200 dark:border-white/10 rounded-full py-3 shadow-2xl transition-all duration-300">
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <img 
            src="/assets/img/logo.png" 
            alt="RG" 
            className="h-10 w-10 rounded-full object-cover border-2 border-primary shadow-[0_0_15px_rgba(109,40,217,0.4)] brightness-110 contrast-110 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(109,40,217,0.6)] transition-all duration-300 bg-white"
          />
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight hidden sm:block">RG Digital Works</h2>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-bold transition-all hover:text-primary ${pathname === link.path ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-primary hover:border-primary/50 transition-all hover:scale-110"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <Link to="/contact" className="hidden sm:flex min-w-[120px] cursor-pointer items-center justify-center rounded-full h-10 px-6 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              <span>Work with Us</span>
          </Link>
        </div>
      </header>
    </motion.div>
  );
};

export default Navbar;
