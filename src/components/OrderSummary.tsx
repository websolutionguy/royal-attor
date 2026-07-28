import React from 'react';
import { ShoppingBag, Truck, Lock, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Button } from './Button';
import { QuantitySelector } from './QuantitySelector';

interface OrderSummaryProps {
  isSubmitting: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ isSubmitting }) => {
  const { items, cartSubtotal, deliveryCharge, grandTotal, updateQuantity, removeItem } =
    useCart();

  return (
    <div className="bg-[#1A1A1A] border border-neutral-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl sticky top-24">
      <div className="border-b border-neutral-800 pb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold font-serif-luxury text-white flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
          Order Summary
        </h2>
        <span className="text-xs font-mono text-neutral-400">
          {items.reduce((acc, item) => acc + item.quantity, 0)} Items
        </span>
      </div>

      {/* Cart Items List */}
      <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
        {items.length === 0 ? (
          <p className="text-sm text-neutral-500 text-center py-6">
            Your cart is empty. Please add a product to checkout.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 p-3 rounded-xl bg-[#111111] border border-neutral-800/80"
            >
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 object-cover rounded-lg bg-neutral-900 shrink-0 border border-neutral-800"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold text-white truncate font-serif-luxury">
                    {item.name}
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-neutral-500 hover:text-red-400 text-xs transition-colors ml-2"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded font-mono">
                    {item.selectedVolume}
                  </span>
                  <span className="text-neutral-400 font-mono">
                    ৳{item.unitPrice} × {item.quantity}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <QuantitySelector
                    quantity={item.quantity}
                    onQuantityChange={(qty) => updateQuantity(item.id, qty)}
                    size="sm"
                  />
                  <span className="text-sm font-bold text-[#D4AF37] font-mono">
                    ৳{item.unitPrice * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Calculation Table */}
      <div className="space-y-2.5 pt-4 border-t border-neutral-800 text-sm">
        <div className="flex justify-between text-neutral-400">
          <span>Subtotal</span>
          <span className="font-mono text-white">৳{cartSubtotal}</span>
        </div>

        <div className="flex justify-between text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#D4AF37]" />
            Delivery Charge (Flat rate)
          </span>
          <span className="font-mono text-white">৳{deliveryCharge}</span>
        </div>

        <div className="flex justify-between pt-3 border-t border-neutral-800 text-lg font-bold">
          <span className="text-white">Grand Total</span>
          <span className="font-mono text-[#D4AF37] text-2xl font-extrabold">
            ৳{grandTotal}
          </span>
        </div>
      </div>

      {/* Submit Button (Submits #checkout-form) */}
      <div className="pt-2">
        <Button
          type="submit"
          form="checkout-form"
          fullWidth
          size="lg"
          isLoading={isSubmitting}
          disabled={items.length === 0}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Place Order (৳{grandTotal})
        </Button>

        <div className="flex items-center justify-center space-x-1.5 text-[11px] text-neutral-500 mt-3">
          <Lock className="w-3 h-3 text-[#D4AF37]" />
          <span>Encrypted 256-bit Secure Cash on Delivery</span>
        </div>
      </div>
    </div>
  );
};
