import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ProductGrid } from '../components/ProductGrid';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Hero />
      <Features />
      <ProductGrid />
      <Footer />
    </div>
  );
};
