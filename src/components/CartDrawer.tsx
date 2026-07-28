import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { QuantitySelector } from './QuantitySelector';
import { Button } from './Button';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    cartSubtotal,
    deliveryCharge,
    grandTotal,
  } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#161616] border-l border-neutral-800 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-[#111111]">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="text-lg font-bold font-serif-luxury text-white uppercase tracking-wider">
                  Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-medium text-neutral-300">
                      Your cart is empty
                    </p>
                    <p className="text-xs text-neutral-500">
                      Explore our pure luxury attars and add your favorites.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2"
                  >
                    Browse Collection
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-3 rounded-xl bg-[#1D1D1D] border border-neutral-800 relative group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-lg bg-black shrink-0 border border-neutral-800"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-bold text-white truncate font-serif-luxury">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 text-xs">
                        <span className="bg-[#D4AF37]/15 text-[#D4AF37] px-2 py-0.5 rounded font-mono font-semibold">
                          {item.selectedVolume}
                        </span>
                        <span className="text-neutral-400 font-mono">
                          ৳{item.unitPrice} each
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <QuantitySelector
                          quantity={item.quantity}
                          onQuantityChange={(qty) => updateQuantity(item.id, qty)}
                          size="sm"
                        />
                        <span className="text-sm font-extrabold text-[#D4AF37] font-mono">
                          ৳{item.unitPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-neutral-800 bg-[#111111] space-y-4">
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">৳{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge (Flat)</span>
                    <span className="font-mono text-white">৳{deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-neutral-800 text-sm font-bold">
                    <span className="text-white">Grand Total</span>
                    <span className="font-mono text-[#D4AF37] text-base">
                      ৳{grandTotal}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    fullWidth
                    size="lg"
                    onClick={handleCheckout}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Checkout (৳{grandTotal})
                  </Button>

                  <button
                    onClick={clearCart}
                    className="w-full text-center text-xs text-neutral-500 hover:text-red-400 transition-colors py-1"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
