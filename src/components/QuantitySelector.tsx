import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQty: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  size = 'md',
}) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const buttonSize = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm';
  const textSize = size === 'sm' ? 'w-8 text-xs font-semibold' : 'w-10 text-sm font-bold';

  return (
    <div className="inline-flex items-center bg-[#111111] border border-neutral-800 rounded-lg p-1 space-x-1 shadow-inner">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={`${buttonSize} flex items-center justify-center rounded-md text-neutral-300 hover:text-[#D4AF37] hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-300 transition-colors`}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className={`${textSize} text-center text-[#D4AF37] font-mono select-none`}>
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`${buttonSize} flex items-center justify-center rounded-md text-neutral-300 hover:text-[#D4AF37] hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-300 transition-colors`}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
