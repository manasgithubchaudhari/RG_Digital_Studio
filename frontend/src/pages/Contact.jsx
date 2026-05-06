import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: '', 
    message: '',
    serviceType: '',
    budget: '',
    timeline: ''
  });
  const [status, setStatus] = useState('');

  const services = [
    "Digital Marketing", "SEO Optimization", "Web Development", 
    "Performance Marketing", "Social Media", "Data Analysis", 
    "Branding & Identity", "Video Production", "In-House Studio", 
    "Lead Generation", "Content Strategy", "Influencer Marketing"
  ];

  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) {
      // Find the display name from the ID
      const displayName = services.find(s => s.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === serviceId) || serviceId;
      setFormData(prev => ({
        ...prev,
        serviceType: displayName,
        subject: `Inquiry about ${displayName}`
      }));
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    fetch(`${import.meta.env.VITE_API_URL || 'https://rg-digital-studio.onrender.com'}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(() => {
      setStatus('Message Sent!');
      setFormData({ name: '', email: '', subject: '', message: '', serviceType: '', budget: '', timeline: '' });
      setTimeout(() => setStatus(''), 3000);
    })
    .catch(() => {
      setStatus('Error sending message');
      setTimeout(() => setStatus(''), 3000);
    });
  };

  const processSteps = [
    { title: "Digital Inquiry", desc: "Share your vision through our detailed inquiry form.", icon: "edit_note" },
    { title: "Strategy Call", desc: "A deep-dive session to align on goals and expectations.", icon: "call" },
    { title: "Custom Proposal", desc: "We deliver a bespoke roadmap and transparent quote.", icon: "description" },
    { title: "Project Kickoff", desc: "Seamless launch with your dedicated agency team.", icon: "rocket_launch" }
  ];

  return (
    <main className="flex-1 pt-32 lg:pt-48 bg-slate-50 dark:bg-background-dark overflow-hidden transition-colors duration-500">
      <section className="mx-auto max-w-7xl px-6 lg:px-20 py-16 relative">
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary/20 blur-[120px] opacity-30"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-primary/10 blur-[120px] opacity-20"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">Get In Touch</span>
              <h1 className="mt-6 text-5xl font-black tracking-tight lg:text-7xl leading-tight text-slate-900 dark:text-white transition-all">
                The start of <br /> something <span className="text-primary">legendary.</span>
              </h1>
              <p className="mt-8 text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                Ready to accelerate your digital growth? Our team is standing by to transform your vision into market-leading results.
              </p>
            </motion.div>

            <div className="mt-16 space-y-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-primary"></span>
                How We Work
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {processSteps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">{step.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 lg:p-12 rounded-[2.5rem] border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Project Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="John Doe"
                      className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-slate-900 dark:text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="john@example.com"
                      className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-slate-900 dark:text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Service Interested In</label>
                  <select 
                    required
                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-slate-900 dark:text-white appearance-none cursor-pointer"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({...formData, serviceType: e.target.value, subject: `Inquiry about ${e.target.value}`})}
                  >
                    <option value="" disabled className="bg-white dark:bg-background-dark text-slate-900 dark:text-white">Select a service</option>
                    {services.map(s => <option key={s} value={s} className="bg-white dark:bg-background-dark text-slate-900 dark:text-white">{s}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Budget Range</label>
                    <select 
                      required
                      className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-slate-900 dark:text-white appearance-none cursor-pointer"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    >
                      <option value="" disabled className="bg-white dark:bg-background-dark text-slate-900 dark:text-white">Project Budget</option>
                      <option value="<$5k" className="bg-white dark:bg-background-dark text-slate-900 dark:text-white">Less than $5,000</option>
                      <option value="$5k-$15k" className="bg-white dark:bg-background-dark text-slate-900 dark:text-white">$5,000 - $15,000</option>
                      <option value="$15k-$50k" className="bg-white dark:bg-background-dark text-slate-900 dark:text-white">$15,000 - $50,000</option>
                      <option value="$50k+" className="bg-white dark:bg-background-dark text-slate-900 dark:text-white">$50,000+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Timeline</label>
                    <select 
                      required
                      className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-slate-900 dark:text-white appearance-none cursor-pointer"
                      value={formData.timeline}
                      onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                    >
                      <option value="" disabled className="bg-white dark:bg-background-dark text-slate-900 dark:text-white">Desired Timeline</option>
                      <option value="Immediate" className="bg-white dark:bg-background-dark text-slate-900 dark:text-white">Immediate Start</option>
                      <option value="1-3 Months" className="bg-white dark:bg-background-dark text-slate-900 dark:text-white">1-3 Months</option>
                      <option value="3-6 Months" className="bg-white dark:bg-background-dark text-slate-900 dark:text-white">3-6 Months</option>
                      <option value="Not Sure" className="bg-white dark:bg-background-dark text-slate-900 dark:text-white">Not Sure Yet</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Tell us more</label>
                  <textarea 
                    required 
                    rows="4"
                    placeholder="Briefly describe your goals and requirements..."
                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-4 outline-none focus:border-primary transition-colors resize-none text-slate-900 dark:text-white"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'Sending...'}
                  className="w-full bg-primary py-4 rounded-xl font-bold text-white hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20 disabled:opacity-50"
                >
                  {status || 'Send Inquiry'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
