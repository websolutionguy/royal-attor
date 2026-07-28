import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', glow = false }) => {
  return (
    <div
      className={`bg-[#1A1A1A]/90 backdrop-blur-md rounded-xl border border-[#D4AF37]/20 p-5 md:p-6 shadow-xl transition-all duration-300 hover:border-[#D4AF37]/40 ${
        glow ? 'gold-border-glow' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
