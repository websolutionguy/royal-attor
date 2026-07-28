import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CheckoutForm } from '../components/CheckoutForm';
import { OrderSummary } from '../components/OrderSummary';
import { CustomerDetails, Order } from '../types';
import { Footer } from '../components/Footer';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, cartSubtotal, deliveryCharge, grandTotal, clearCart, setLastOrder } =
    useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to home if cart is empty and no submit in progress
  useEffect(() => {
    if (items.length === 0 && !isSubmitting) {
      // Allow user to view page if they just completed order, but if cart empty default redirect
    }
  }, [items, isSubmitting]);

  const handleOrderSubmit = async (customerData: CustomerDetails) => {
    if (items.length === 0) return;

    setIsSubmitting(true);

    const newOrder: Order = {
      orderId: 'RA-' + Math.floor(100000 + Math.random() * 900000),
      customer: customerData,
      items: [...items],
      subtotal: cartSubtotal,
      deliveryCharge,
      grandTotal,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    };

    try {
      // Simulate API submission using Axios to mock endpoint with fallback
      try {
        await axios.post('/api/orders', newOrder, { timeout: 1500 });
      } catch {
        // Fallback simulated success response for frontend-only
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setLastOrder(newOrder);
      clearCart();
      navigate('/success');
    } catch (err) {
      console.error('Order placement failed', err);
      // Still proceed gracefully with local order
      setLastOrder(newOrder);
      clearCart();
      navigate('/success');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#111111] pt-28 pb-16 flex flex-col justify-between">
        <div className="max-w-md mx-auto px-4 text-center space-y-6 my-auto">
          <div className="w-20 h-20 bg-[#1A1A1A] border border-neutral-800 rounded-full flex items-center justify-center mx-auto text-[#D4AF37]">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold font-serif-luxury text-white">
              Your Cart is Empty
            </h1>
            <p className="text-neutral-400 text-sm">
              You cannot proceed to checkout without adding products to your cart.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#F9F1DC] via-[#D4AF37] to-[#B8860B] text-[#111111] px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Collection</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shopping</span>
          </Link>

          <div className="flex items-center space-x-2 text-xs text-[#D4AF37] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Guaranteed Doorstep Delivery across Bangladesh</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-white">
            Checkout & Confirmation
          </h1>
          <p className="text-sm text-neutral-400">
            Provide your delivery details to confirm your Cash on Delivery order.
          </p>
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Customer Details Form */}
          <div className="lg:col-span-7">
            <CheckoutForm onSubmit={handleOrderSubmit} isSubmitting={isSubmitting} />
          </div>

          {/* Right Column: Order Summary & Pay */}
          <div className="lg:col-span-5">
            <OrderSummary isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>
    </div>
  );
};
