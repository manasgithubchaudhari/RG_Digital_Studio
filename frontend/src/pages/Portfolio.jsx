import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'https://rg-digital-studio.onrender.com'}/api/portfolio`)
      .then(res => res.json())
      .then(data => {
        setPortfolio(data);
        setFilteredItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching portfolio:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (category === 'All') {
      setFilteredItems(portfolio);
    } else {
      setFilteredItems(portfolio.filter(item => item.category === category));
    }
  }, [category, portfolio]);

  const categories = ['All', 'Graphic Design', 'Branding'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="flex-1 pt-32 min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500">
      {/* Header Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-20 py-16 text-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary"
        >
          Our Featured Work
        </motion.span>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-5xl font-black tracking-tight lg:text-7xl text-slate-900 dark:text-white"
        >
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 dark:from-purple-400 dark:to-purple-200">Projects</span>
        </motion.h1>
      </section>

      {/* Filter Tabs */}
      <section className="mx-auto max-w-7xl px-6 lg:px-20 pb-12 flex justify-center">
        <div className="flex p-1 bg-slate-100 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                category === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-20 py-16">
        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={category} // Re-animate on category change
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item, index) => (
              <motion.div 
                key={item.title + index}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card group overflow-hidden rounded-3xl flex flex-col cursor-pointer border-white/5 hover:border-primary/40"
                onClick={() => setSelectedImage(item)}
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-900 relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl transform scale-50 group-hover:scale-100 transition-transform duration-300">fullscreen</span>
                  </div>
                  <img 
                    src={item.image.startsWith('http') ? item.image : item.image} 
                    alt={item.title} 
                    width="800"
                    height="600"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <span className="text-xs font-bold text-primary dark:text-purple-400 uppercase tracking-widest">{item.category}</span>
                  <h3 className="text-2xl font-bold mt-3 text-slate-900 dark:text-white group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
              <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Curating gallery...</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-6 lg:p-20"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-auto rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.image.startsWith('http') ? selectedImage.image : selectedImage.image} 
                alt={selectedImage.title} 
                width="1200"
                height="800"
                loading="lazy"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{selectedImage.category}</span>
                <h2 className="text-3xl font-black text-white mt-2">{selectedImage.title}</h2>
              </div>
              <button 
                className="absolute top-6 right-6 size-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white backdrop-blur-xl"
                onClick={() => setSelectedImage(null)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Portfolio;
