import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Droplet, Clock, Banknote } from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      id: 'original',
      icon: <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />,
      title: '100% Original Attar',
      description: 'Authentic imported ingredients with guaranteed pure concentration.',
    },
    {
      id: 'alcohol-free',
      icon: <Droplet className="w-8 h-8 text-[#D4AF37]" />,
      title: 'Alcohol Free',
      description: '100% non-alcoholic oil formulation gentle on skin and apparel.',
    },
    {
      id: 'long-lasting',
      icon: <Clock className="w-8 h-8 text-[#D4AF37]" />,
      title: 'Long Lasting Fragrance',
      description: 'Deep projection that stays with you all day and night.',
    },
    {
      id: 'cod',
      icon: <Banknote className="w-8 h-8 text-[#D4AF37]" />,
      title: 'Cash on Delivery',
      description: 'Pay safely upon doorstep delivery anywhere across Bangladesh.',
    },
  ];

  return (
    <section className="py-12 bg-[#1A1A1A]/90 border-y border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-start space-x-4 p-4 rounded-xl bg-[#111111]/80 border border-neutral-800/80 hover:border-[#D4AF37]/40 transition-all duration-300 group"
            >
              <div className="shrink-0 p-2.5 rounded-xl bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-colors">
                {feature.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
