import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import { Button } from './Button';

export const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#111111] pt-20 pb-12">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Attar Perfume Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25 scale-105 filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-[#111111]/90" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#111111] to-transparent" />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-[#D4AF37]/20 border border-[#D4AF37]/40 px-4 py-1.5 rounded-full backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            100% Pure & Alcohol-Free
          </span>
        </motion.div>

        {/* Main Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-serif-luxury tracking-tight leading-[1.15] text-white">
            Premium Attar{' '}
            <span className="gold-gradient-text block sm:inline">
              Collection
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Experience long-lasting alcohol-free luxury fragrances.
          </p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button
            size="lg"
            onClick={scrollToProducts}
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto min-w-[200px]"
          >
            Shop Now
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={scrollToProducts}
            className="w-full sm:w-auto min-w-[200px]"
          >
            Explore Scents
          </Button>
        </motion.div>

        {/* Highlights Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-10 grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-neutral-800/80 max-w-3xl mx-auto text-neutral-400 text-xs sm:text-sm font-medium"
        >
          <div className="flex items-center justify-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>100% Concentrated Oil</span>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span>12+ Hours Longevity</span>
          </div>

          <div className="col-span-2 md:col-span-1 flex items-center justify-center space-x-2">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>Cash on Delivery</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
