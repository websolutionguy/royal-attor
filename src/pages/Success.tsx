import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ShoppingBag, PhoneCall, MapPin, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Footer } from '../components/Footer';

export const Success: React.FC = () => {
  const navigate = useNavigate();
  const { lastOrder } = useCart();

  // Fallback demo order if page accessed directly
  const order = lastOrder || {
    orderId: 'RA-784920',
    createdAt: new Date().toISOString(),
    status: 'Confirmed' as const,
    customer: {
      name: 'Tanvir Hossain',
      phone: '01712345678',
      address: 'House 14, Road 5, Block B, Mirpur 10, Dhaka',
      email: 'tanvir@example.com',
      paymentMethod: 'cod' as const,
    },
    items: [
      {
        id: 'royal-oud-10ml',
        productId: 'royal-oud',
        name: 'Royal Oud',
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
        selectedVolume: '10ml' as const,
        unitPrice: 450,
        quantity: 1,
      },
    ],
    subtotal: 450,
    deliveryCharge: 80,
    grandTotal: 530,
  };

  return (
    <div className="min-h-screen bg-[#111111] pt-24 pb-16 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Animated Success Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-[0_0_40px_rgba(212,175,55,0.15)] relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#B8860B] via-[#D4AF37] to-[#F9F1DC] p-1 mx-auto shadow-xl"
          >
            <div className="w-full h-full bg-[#111111] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#D4AF37]" />
            </div>
          </motion.div>

          {/* Heading Statements as requested */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20 inline-block">
              Order Verified • Cash on Delivery
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-white">
              ✔ Thank You!
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[#D4AF37]">
              Your order has been received successfully.
            </p>

            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Our team will contact you shortly on your phone number{' '}
              <span className="font-bold text-white font-mono">
                {order.customer.phone}
              </span>{' '}
              to confirm your order and dispatch your parcel.
            </p>
          </div>

          {/* Order Details Voucher */}
          <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-5 text-left space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 pb-3 gap-2">
              <div>
                <span className="text-[10px] uppercase text-neutral-500 font-bold block">
                  Order Number
                </span>
                <span className="text-base font-bold font-mono text-[#D4AF37]">
                  {order.orderId}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-neutral-500 font-bold block">
                  Date
                </span>
                <span className="text-xs text-neutral-300 flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {new Date(order.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-neutral-500 font-bold block">
                  Payment
                </span>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Cash on Delivery
                </span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300 pt-1">
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-neutral-500 font-bold block">
                  Customer
                </span>
                <p className="font-semibold text-white">{order.customer.name}</p>
                <p className="flex items-center gap-1 text-neutral-400 font-mono">
                  <PhoneCall className="w-3 h-3 text-[#D4AF37]" />
                  {order.customer.phone}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase text-neutral-500 font-bold block">
                  Delivery Address
                </span>
                <p className="flex items-start gap-1 text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{order.customer.address}</span>
                </p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="pt-3 border-t border-neutral-800 space-y-2">
              <span className="text-[10px] uppercase text-neutral-500 font-bold block">
                Ordered Items
              </span>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-900 last:border-none"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white font-serif-luxury">
                        {item.name}
                      </span>
                      <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-1.5 py-0.2 rounded font-mono">
                        {item.selectedVolume}
                      </span>
                      <span className="text-neutral-500">× {item.quantity}</span>
                    </div>
                    <span className="font-mono text-neutral-200">
                      ৳{item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="pt-3 border-t border-neutral-800 space-y-1 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">৳{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Delivery Fee</span>
                  <span className="font-mono text-white">৳{order.deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-1 text-white">
                  <span>Total Payable on Delivery</span>
                  <span className="font-mono text-[#D4AF37] text-base font-extrabold">
                    ৳{order.grandTotal}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Shopping Button */}
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto bg-gradient-to-r from-[#F9F1DC] via-[#D4AF37] to-[#B8860B] text-[#111111] px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:brightness-110 shadow-lg transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};
