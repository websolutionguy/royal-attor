import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col justify-between pt-28">
      <div className="max-w-md mx-auto px-4 text-center space-y-6 my-auto">
        <div className="w-20 h-20 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          <Crown className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold font-mono text-[#D4AF37]">
            404
          </span>
          <h1 className="text-2xl font-bold font-serif-luxury text-white">
            Fragrance Page Not Found
          </h1>
          <p className="text-neutral-400 text-sm">
            The scent page or product you are looking for may have been moved or does not exist.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#F9F1DC] via-[#D4AF37] to-[#B8860B] text-[#111111] px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <Footer />
    </div>
  );
};
