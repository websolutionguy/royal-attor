import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Crown, PhoneCall, Shield } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuantity, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/#products' },
    { name: 'About', path: '/#about' },
    { name: 'Checkout', path: '/checkout' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const id = path.replace('/#', '');
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const id = path.replace('/#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#111111]/95 backdrop-blur-md border-b border-[#D4AF37]/20 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B8860B] via-[#D4AF37] to-[#F9F1DC] p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#111111] rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#D4AF37]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black font-serif-luxury tracking-widest text-white group-hover:text-[#D4AF37] transition-colors">
                ROYAL ATTAR
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-sans -mt-1 font-semibold">
                Pure Fragrances
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-200 hover:text-[#D4AF37] cursor-pointer ${
                  location.pathname === link.path
                    ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1'
                    : 'text-neutral-300'
                }`}
              >
                {link.name}
              </button>
            ))}

            <Link
              to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
              className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37] hover:text-white flex items-center gap-1 bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/30 transition-all cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isAuthenticated ? 'Admin Panel' : 'Login'}</span>
            </Link>
          </nav>

          {/* Right Action Icons & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {/* Quick WhatsApp Hotline */}
            <a
              href="https://wa.me/8801700000000?text=Hello%20Royal%20Attar,%20I%20have%20an%20inquiry%20about%20your%20fragrances"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center space-x-1.5 text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1.5 rounded-full hover:bg-[#D4AF37]/20 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+880 1700-000000</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#1A1A1A] border border-neutral-800 text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-200 cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-[#F9F1DC] via-[#D4AF37] to-[#B8860B] text-[#111111] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg font-mono animate-bounce">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#D4AF37]" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 border-t border-neutral-800 bg-[#161616] rounded-2xl p-4 space-y-3 shadow-2xl border border-neutral-800">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className="block w-full text-left py-2 px-3 text-sm font-semibold uppercase tracking-wider text-neutral-200 hover:text-[#D4AF37] hover:bg-neutral-800/50 rounded-lg transition-colors"
              >
                {link.name}
              </button>
            ))}

            <Link
              to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 w-full py-2 px-3 text-sm font-semibold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg"
            >
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}</span>
            </Link>

            <div className="pt-2 border-t border-neutral-800">
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-2.5 text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Hotline: +880 1700-000000</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
