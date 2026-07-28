import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Zap, Sparkles, Check } from 'lucide-react';
import { Product, VolumeOption } from '../types';
import { VariationSelector } from './VariationSelector';
import { QuantitySelector } from './QuantitySelector';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const [selectedVolume, setSelectedVolume] = useState<VolumeOption>('10ml');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  const currentPrice = product.variations[selectedVolume];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVolume, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVolume, quantity);
    navigate('/checkout');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col justify-between bg-[#1A1A1A] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full bg-[#111111] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />

        {/* Gradient Overlay for luxury texture */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-black/30" />

        {/* Bestseller Badge */}
        {product.isBestseller && (
          <div className="absolute top-3 left-3 bg-[#D4AF37] text-[#111111] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-current" />
            <span>Bestseller</span>
          </div>
        )}

        {/* Alcohol Free Pure Attar Pill */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
          100% Pure Attar
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between">
            <h3 className="text-lg md:text-xl font-bold font-serif-luxury text-white group-hover:text-[#D4AF37] transition-colors">
              {product.name}
            </h3>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37]/80 font-mono bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
              {product.category}
            </span>
          </div>

          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Scent Notes Preview */}
          <div className="pt-1 flex flex-wrap gap-1 text-[10px] text-neutral-400">
            <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-300">
              <span className="text-[#D4AF37]">Top:</span> {product.notes.top}
            </span>
          </div>
        </div>

        {/* Variation Selection */}
        <VariationSelector
          selectedVolume={selectedVolume}
          onVolumeChange={setSelectedVolume}
          variations={product.variations}
        />

        {/* Price & Quantity Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
              Total Price
            </span>
            <span className="text-xl font-extrabold text-[#D4AF37] font-mono">
              ৳{currentPrice * quantity}
            </span>
            {quantity > 1 && (
              <span className="text-[10px] text-neutral-400 block">
                (৳{currentPrice} × {quantity})
              </span>
            )}
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 block mb-1">
              Quantity
            </span>
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              size="sm"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
              addedToast
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
                : 'bg-[#111111] border-neutral-700 text-neutral-200 hover:border-[#D4AF37] hover:text-[#D4AF37]'
            }`}
          >
            {addedToast ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Add Cart</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleOrderNow}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#F9F1DC] via-[#D4AF37] to-[#B8860B] text-[#111111] hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Order Now</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
