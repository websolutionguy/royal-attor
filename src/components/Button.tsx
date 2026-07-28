import React, { ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  icon,
  className = '',
  disabled,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-xs md:text-sm';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#F9F1DC] via-[#D4AF37] to-[#B8860B] text-[#111111] font-semibold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.98]',
    secondary:
      'bg-[#1A1A1A] text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#222222] hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] active:scale-[0.98]',
    outline:
      'bg-transparent text-neutral-200 border border-neutral-700 hover:border-[#D4AF37] hover:text-[#D4AF37] active:scale-[0.98]',
    ghost:
      'bg-transparent text-neutral-300 hover:text-[#D4AF37] hover:bg-neutral-800/50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-xs font-semibold',
    lg: 'px-7 py-3.5 text-sm font-semibold',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...(props as HTMLMotionProps<'button'>)}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center space-x-2">
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </span>
      )}
    </motion.button>
  );
};
