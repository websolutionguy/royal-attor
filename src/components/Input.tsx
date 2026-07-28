import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, icon, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
            {label} {required && <span className="text-[#D4AF37]">*</span>}
          </label>
        )}
        <div className="relative rounded-lg shadow-sm">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-[#1A1A1A] text-neutral-100 placeholder-neutral-500 rounded-lg border text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 ${
              icon ? 'pl-10' : 'pl-4'
            } pr-4 py-3 ${
              error
                ? 'border-red-500/80 focus:border-red-500'
                : 'border-neutral-800 focus:border-[#D4AF37]'
            } ${className}`}
            {...props}
          />
        </div>
        {error ? (
          <p className="text-xs text-red-400 font-medium flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-neutral-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
