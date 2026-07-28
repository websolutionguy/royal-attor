import React from 'react';
import { Crown, Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="about" className="bg-[#0B0B0B] border-t border-neutral-800/80 text-neutral-400 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#B8860B] via-[#D4AF37] to-[#F9F1DC] p-0.5 shadow-md">
                <div className="w-full h-full bg-[#111111] rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
              <span className="text-xl font-bold font-serif-luxury tracking-widest text-white">
                ROYAL ATTAR
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed">
              Royal Attar specializes in 100% pure, concentrated, alcohol-free fragrance oils crafted using traditional steam distillation and precious botanical extracts. Experience timeless oriental luxury.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#161616] border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#161616] border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#161616] border border-neutral-800 flex items-center justify-center text-emerald-400 border-emerald-500/30 hover:bg-emerald-950/30 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white font-serif-luxury">
              Collection & Scents
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#products" className="hover:text-[#D4AF37] transition-colors">
                  Royal Oud Collection
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#D4AF37] transition-colors">
                  Amber & Velvet Musk
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#D4AF37] transition-colors">
                  Taif Black Rose
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#D4AF37] transition-colors">
                  White Musk Concentre
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#D4AF37] transition-colors">
                  Golden Sandalwood
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policy */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white font-serif-luxury">
              Customer Guarantees
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="text-neutral-400">✔ 100% Non-Alcoholic Oil</li>
              <li className="text-neutral-400">✔ 12+ Hours Sillage & Longevity</li>
              <li className="text-neutral-400">✔ Doorstep Cash on Delivery</li>
              <li className="text-neutral-400">✔ 3-Day Easy Return Policy</li>
              <li className="text-neutral-400">✔ Leakproof Crystal Flacons</li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white font-serif-luxury">
              Contact & Hotline
            </h3>
            <div className="space-y-2 text-xs">
              <p className="flex items-center space-x-2.5 text-white font-semibold">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+880 1700-000000</span>
              </p>

              <p className="flex items-center space-x-2.5 text-neutral-400">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>info@royalattar.com.bd</span>
              </p>

              <p className="flex items-start space-x-2.5 text-neutral-400">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Level 4, Gulshan Shopping Centre, Dhaka, Bangladesh</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} ROYAL ATTAR. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for Luxury Fragrance Connoisseurs</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
