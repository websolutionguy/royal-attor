import React from 'react';
import { VolumeOption } from '../types';

interface VariationSelectorProps {
  selectedVolume: VolumeOption;
  onVolumeChange: (volume: VolumeOption) => void;
  variations: Record<VolumeOption, number>;
}

export const VariationSelector: React.FC<VariationSelectorProps> = ({
  selectedVolume,
  onVolumeChange,
  variations,
}) => {
  const options: VolumeOption[] = ['10ml', '20ml', '30ml'];

  return (
    <div className="w-full space-y-1.5">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
        Select Size / Volume:
      </label>
      
      {/* Interactive Volume Pills */}
      <div className="grid grid-cols-3 gap-2">
        {options.map((vol) => {
          const isSelected = selectedVolume === vol;
          const price = variations[vol];

          return (
            <button
              key={vol}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onVolumeChange(vol);
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                  : 'bg-[#111111] border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
              }`}
            >
              <span className={`font-semibold ${isSelected ? 'text-[#D4AF37]' : ''}`}>
                {vol}
              </span>
              <span className="text-[10px] font-mono mt-0.5 text-neutral-300">
                ৳{price}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
