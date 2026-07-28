import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Phone, MapPin, Mail, FileText, ShieldCheck } from 'lucide-react';
import { CustomerDetails } from '../types';
import { Input } from './Input';

interface CheckoutFormProps {
  onSubmit: (data: CustomerDetails) => void;
  isSubmitting: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerDetails>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      email: '',
      notes: '',
      paymentMethod: 'cod',
    },
  });

  return (
    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-[#1A1A1A] border border-neutral-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        {/* Form Title */}
        <div className="border-b border-neutral-800 pb-4 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-serif-luxury text-white flex items-center gap-2">
              <User className="w-5 h-5 text-[#D4AF37]" />
              Shipping Information
            </h2>
            <p className="text-xs text-neutral-400">
              Please enter your contact and delivery address in Bangladesh.
            </p>
          </div>
          <span className="text-[10px] uppercase font-mono font-bold bg-[#D4AF37]/10 text-[#D4AF37] px-2.5 py-1 rounded border border-[#D4AF37]/30">
            Cash on Delivery
          </span>
        </div>

        <div className="space-y-4">
          {/* Customer Name */}
          <Input
            label="Customer Name"
            required
            placeholder="e.g. Tanvir Hossain"
            icon={<User className="w-4 h-4" />}
            error={errors.name?.message}
            {...register('name', {
              required: 'Full name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters',
              },
            })}
          />

          {/* Phone Number */}
          <Input
            label="Phone Number (BD Mobile)"
            required
            type="tel"
            placeholder="01712345678"
            helperText="We will call this number to confirm delivery."
            icon={<Phone className="w-4 h-4" />}
            error={errors.phone?.message}
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^(?:\+8801|01)[3-9]\d{8}$/,
                message: 'Enter a valid Bangladesh mobile number (e.g. 01712345678)',
              },
            })}
          />

          {/* Email (Optional) */}
          <Input
            label="Email Address (Optional)"
            type="email"
            placeholder="name@example.com"
            helperText="Receive email confirmation & invoice."
            icon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />

          {/* Full Delivery Address */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Full Delivery Address <span className="text-[#D4AF37]">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 text-neutral-400">
                <MapPin className="w-4 h-4" />
              </div>
              <textarea
                rows={3}
                placeholder="House / Road / Holding No, Area, Thana, District (e.g., House 12, Road 5, Block B, Mirpur 10, Dhaka)"
                className={`w-full bg-[#111111] text-neutral-100 placeholder-neutral-500 rounded-lg border text-sm pl-10 pr-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 ${
                  errors.address
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-neutral-800 focus:border-[#D4AF37]'
                }`}
                {...register('address', {
                  required: 'Full delivery address is required',
                  minLength: {
                    value: 10,
                    message: 'Address must be specific (at least 10 characters)',
                  },
                })}
              />
            </div>
            {errors.address && (
              <p className="text-xs text-red-400 font-medium">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Order Notes (Optional) */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Special Instructions / Delivery Notes (Optional)
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 text-neutral-400">
                <FileText className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="e.g. Call before delivery or deliver after 2 PM"
                className="w-full bg-[#111111] text-neutral-100 placeholder-neutral-500 rounded-lg border border-neutral-800 text-sm pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                {...register('notes')}
              />
            </div>
          </div>
        </div>

        {/* Payment Method Banner */}
        <div className="p-4 rounded-xl bg-[#111111] border border-[#D4AF37]/30 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-xs space-y-0.5">
            <h4 className="font-bold text-white uppercase tracking-wider">
              Payment Method: Cash on Delivery (COD)
            </h4>
            <p className="text-neutral-400">
              No advance payment required. Inspect your product and pay cash to the courier upon delivery.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
