
import React from 'react';
import { Truck, CreditCard, ShieldCheck, RotateCcw, BadgeCheck } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <div className="bg-[#eff6ff] rounded-lg border border-blue-50 overflow-hidden font-sans">
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-blue-100">
        
        {/* Item 1: Fast Delivery */}
        <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 text-center group hover:bg-blue-50/50 transition-colors">
           <div className="mb-5 relative">
              <Truck size={48} className="text-[#ef4444]" strokeWidth={1.5} />
              <div className="absolute top-1/2 -left-6 -translate-y-1/2 flex flex-col gap-1 opacity-60">
                 <div className="w-4 h-0.5 bg-gray-400"></div>
                 <div className="w-3 h-0.5 bg-gray-400"></div>
                 <div className="w-5 h-0.5 bg-gray-400"></div>
              </div>
              <div className="absolute top-2 -right-2 bg-red-600 text-white text-[9px] px-1 py-0.5 rounded font-bold uppercase tracking-tighter transform rotate-12 border border-white">
                FAST
              </div>
           </div>
           <h3 className="text-gray-800 font-medium text-sm md:text-[15px]">Fast Delivery all across Delhi-NCR</h3>
        </div>

        {/* Item 2: Safe Payment */}
        <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 text-center group hover:bg-blue-50/50 transition-colors">
           <div className="mb-5 relative">
              <CreditCard size={52} className="text-[#f97316]" strokeWidth={1.5} />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5">
                 <ShieldCheck size={28} className="text-[#fbbf24] fill-white" />
              </div>
           </div>
           <h3 className="text-gray-800 font-medium text-sm md:text-[15px]">Safe Payment</h3>
        </div>

        {/* Item 3: 24 Hours Return Policy */}
        <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 text-center group hover:bg-blue-50/50 transition-colors">
           <div className="mb-5 relative w-14 h-14 border-[3px] border-black rounded-full flex items-center justify-center">
              <div className="text-center leading-none">
                 <span className="block text-xl font-extrabold tracking-tighter">24</span>
                 <span className="text-[8px] font-bold block -mt-0.5">HOURS</span>
              </div>
              <RotateCcw size={40} className="absolute inset-0 text-black -m-[5px] w-[66px] h-[66px]" strokeWidth={1} />
           </div>
           <h3 className="text-gray-800 font-medium text-sm md:text-[15px]">24 Hours Return Policy</h3>
        </div>

        {/* Item 4: 100% Authentic Products */}
        <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 text-center group hover:bg-blue-50/50 transition-colors">
           <div className="mb-5 relative">
              <BadgeCheck size={56} className="text-gray-800" strokeWidth={1.2} />
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-[8px] font-bold text-gray-800 -rotate-12 bg-white px-0.5">AUTHENTIC</span>
              </div>
           </div>
           <h3 className="text-gray-800 font-medium text-sm md:text-[15px]">100% Authentic Products</h3>
        </div>

      </div>
    </div>
  );
};

export default FeaturesSection;
