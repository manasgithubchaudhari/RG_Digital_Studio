import React from 'react';
import { Link } from 'react-router-dom';
import ClientLogos from '../components/ClientLogos';

const Home = () => {
  return (
    <main className="w-full max-w-7xl px-6 pt-24 mx-auto">
      <section className="flex flex-col gap-12 py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-6 lg:w-1/2">
            <div className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 bg-primary/10 border border-primary/20">
              <span className="size-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Now accepting new clients</span>
            </div>
            <h1 className="text-5xl font-black leading-[1.1] tracking-tighter md:text-7xl">
              Your Partner in <span className="text-primary">Digital Growth</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              Helping brands scale with high-impact digital solutions, innovative design, and data-driven strategic growth marketing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/portfolio" className="flex h-12 items-center justify-center rounded-lg px-8 glass-card font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                View Portfolio
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="glass-card p-4 rounded-xl shadow-2xl relative z-10 overflow-hidden">
              <div className="w-full aspect-video rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-900">
                <img 
                  src="/assets/img/logo.webp" 
                  alt="Digital marketing dashboard" 
                  width="800"
                  height="450"
                  fetchpriority="high"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="absolute -top-6 -right-6 size-24 glass-card rounded-xl flex items-center justify-center -rotate-12 z-0">
              <span className="material-symbols-outlined text-primary dark:text-purple-400 text-4xl">trending_up</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
        <div className="glass-card p-8 rounded-xl flex flex-col gap-2">
          <p className="text-slate-600 dark:text-slate-400 font-medium">Projects Completed</p>
          <p className="text-4xl font-bold tracking-tight">250<span className="text-primary dark:text-purple-400">+</span></p>
        </div>
        <div className="glass-card p-8 rounded-xl flex flex-col gap-2">
          <p className="text-slate-600 dark:text-slate-400 font-medium">Average Client Growth</p>
          <p className="text-4xl font-bold tracking-tight">140<span className="text-primary dark:text-purple-400">%</span></p>
        </div>
        <div className="glass-card p-8 rounded-xl flex flex-col gap-2">
          <p className="text-slate-600 dark:text-slate-400 font-medium">Global Awards</p>
          <p className="text-4xl font-bold tracking-tight">15<span className="text-primary dark:text-purple-400">+</span></p>
        </div>
      </section>

      <section className="py-20 flex flex-col gap-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">We build digital products that drive results</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              We specialize in delivering premium digital experiences that drive measurable results for our global partners.
            </p>
          </div>
          <div className="text-primary dark:text-purple-400 flex items-center gap-2 font-bold cursor-pointer group">
            Learn more about our process
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 rounded-xl flex flex-col gap-6 hover:border-primary/40 transition-colors">
            <div className="bg-primary/10 p-3 rounded-lg w-fit text-primary">
              <span className="material-symbols-outlined">palette</span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold">Strategic Design</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                User-centric interfaces with a focus on glassmorphism and modern aesthetics that convert visitors into loyal customers.
              </p>
            </div>
          </div>
          <div className="glass-card p-8 rounded-xl flex flex-col gap-6 hover:border-primary/40 transition-colors">
            <div className="bg-primary/10 p-3 rounded-lg w-fit text-primary">
              <span className="material-symbols-outlined">code</span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold">Scalable Development</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Scalable, high-performance web and mobile applications built with the latest tech stack for maximum speed and security.
              </p>
            </div>
          </div>
          <div className="glass-card p-8 rounded-xl flex flex-col gap-6 hover:border-primary/40 transition-colors">
            <div className="bg-primary/10 p-3 rounded-lg w-fit text-primary">
              <span className="material-symbols-outlined">show_chart</span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold">Growth Marketing</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Data-driven strategies to acquire and retain high-value customers through aggressive multi-channel marketing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ClientLogos />

      <section className="mx-auto max-w-7xl px-6 lg:px-20 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-8 py-20 text-center text-white lg:px-16 shadow-2xl shadow-primary/20">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:24px_24px] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black leading-tight lg:text-5xl">Ready to elevate your <br className="hidden lg:block"/> digital presence?</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">Let's build something extraordinary together. Our team is ready to discuss your project.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-block text-center min-w-[180px] rounded-full bg-white px-8 py-4 font-bold text-primary transition-all hover:scale-105 hover:bg-slate-100">
                Contact Us
              </Link>
              <Link to="/portfolio" className="inline-block text-center min-w-[180px] rounded-full border-2 border-white/30 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
