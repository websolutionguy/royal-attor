import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Crown, Lock, Mail, ArrowRight, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleFillCredentials = () => {
    setEmail('admin@gmail.com');
    setPassword('Admin!@#007');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const result = await login(email, password);

    setIsSubmitting(false);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] pt-24 pb-16 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative z-10"
      >
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#B8860B] via-[#D4AF37] to-[#F9F1DC] p-0.5 mx-auto shadow-xl">
            <div className="w-full h-full bg-[#111111] rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-[#D4AF37]" />
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
              Management Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-white">
              Admin Login
            </h1>
          </div>

          <p className="text-xs text-neutral-400">
            Sign in to manage orders, catalog inventory, and view store metrics.
          </p>
        </div>

        {/* Demo Quick Fill Button */}
        <div className="p-3 bg-[#111111] border border-[#D4AF37]/20 rounded-2xl flex items-center justify-between text-xs">
          <div className="space-y-0.5 text-left">
            <span className="text-[#D4AF37] font-bold flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3 h-3" /> Demo Admin Account:
            </span>
            <p className="text-neutral-400 font-mono text-[10px]">
              admin@gmail.com | Admin!@#007
            </p>
          </div>
          <button
            type="button"
            onClick={handleFillCredentials}
            className="px-3 py-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/30 text-[11px] font-bold rounded-lg transition-colors shrink-0"
          >
            Auto Fill
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-medium">
              {error}
            </div>
          )}

          <Input
            label="Admin Email"
            type="email"
            required
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4 text-[#D4AF37]" />}
          />

          <Input
            label="Password"
            type="password"
            required
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-4 h-4 text-[#D4AF37]" />}
          />

          <div className="pt-2">
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isSubmitting}
              icon={<KeyRound className="w-4 h-4" />}
            >
              Sign In to Admin Panel
            </Button>
          </div>
        </form>

        {/* Session Persistence Note */}
        <div className="pt-2 border-t border-neutral-800 text-center space-y-2">
          <div className="flex items-center justify-center space-x-1.5 text-[11px] text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Session persists automatically on browser refresh.</span>
          </div>

          <Link
            to="/"
            className="inline-flex items-center space-x-1 text-xs text-neutral-500 hover:text-[#D4AF37] transition-colors"
          >
            <span>Return to Customer Store</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
