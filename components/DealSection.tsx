import React, { useState, useEffect } from 'react';
import { ChevronRight, Eye } from 'lucide-react';
import { Product } from '../types';

interface DealSectionProps {
  dealProducts: Product[];
  latestProducts: Product[];
  onProductClick: (product: Product) => void;
  onViewAll: () => void;
}

const DealSection: React.FC<DealSectionProps> = ({ dealProducts, latestProducts, onProductClick, onViewAll }) => {
  const [currentDealIndex, setCurrentDealIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDealIndex((prev) => (prev + 1) % dealProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [dealProducts.length]);

  const activeDeal = dealProducts[currentDealIndex] || dealProducts[0];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* Sidebar - Deal of the Day */}
      <div className="w-full lg:w-[280px] shrink-0">
        <div className="bg-[#f0f8ff] border border-blue-100 rounded-md p-6 flex flex-col items-center text-center h-full shadow-sm">
          
          <h3 className="text-[#990000] font-bold text-base tracking-wide mb-6 uppercase">
            DEAL OF THE DAY
          </h3>

          <div className="bg-white p-2 w-full rounded-sm shadow-sm mb-4 border border-gray-100">
             <div 
               className="w-full aspect-square bg-gray-50 cursor-pointer relative group overflow-hidden"
               onClick={() => onProductClick(activeDeal)}
             >
                <img 
                  src={activeDeal.image} 
                  alt={activeDeal.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  key={activeDeal.id}
                />
             </div>
          </div>

          <h4 
            className="text-[15px] font-medium text-gray-800 mb-3 line-clamp-3 leading-snug px-1" 
            title={activeDeal.name}
          >
            {activeDeal.name}
          </h4>

          <div className="text-xl font-bold text-[#1e293b] mb-5">
            ₹{(activeDeal.price * 83).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>

          <button 
             onClick={() => onProductClick(activeDeal)}
             className="bg-[#990000] text-white font-bold py-2.5 px-8 rounded-md text-sm uppercase hover:bg-red-800 transition-colors shadow-sm mb-4 w-auto"
          >
            Buy Now
          </button>
          
          {/* Dots for carousel */}
          <div className="flex justify-center gap-1.5 mt-auto pt-2">
            {dealProducts.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-colors ${idx === currentDealIndex ? 'bg-[#990000]' : 'bg-gray-300'}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Main Content - Latest Products Grid */}
      <div className="flex-1">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5 pb-1">
           <h2 className="text-xl font-bold text-[#1e293b]">Latest Products</h2>
           <button 
             onClick={onViewAll}
             className="text-[#990000] text-sm font-medium flex items-center gap-1 hover:text-red-800 transition-colors"
           >
             View All <ChevronRight size={16} />
           </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
           {latestProducts.map((product) => (
             <div 
               key={product.id} 
               className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col relative h-full"
               onClick={() => onProductClick(product)}
             >
               {/* Image Container */}
               <div className="relative aspect-square bg-white border-b border-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                  />
                  
                  {/* Custom Design Overlay */}
                  {product.brand === 'Custom Design' && (
                     <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-2 text-center z-10">
                        <span className="text-white text-xl font-bold leading-tight tracking-wide">Custom<br/>Design</span>
                     </div>
                  )}

                  {/* Out Of Stock Bar */}
                  {product.inStock === false && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-[10px] py-1.5 text-center font-normal uppercase tracking-wider z-20">
                      Out Of Stock
                    </div>
                  )}
                  
                  {/* Hover Eye */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                      <div className="bg-white p-2.5 rounded-full shadow-md text-[#990000] transform scale-0 group-hover:scale-100 transition-transform duration-200">
                        <Eye size={20} />
                      </div>
                  </div>
               </div>

               {/* Info Section */}
               <div className="p-3 text-center flex flex-col flex-1 justify-between">
                 <h3 
                   className="text-[13px] font-normal text-gray-700 mb-2 line-clamp-2 leading-tight min-h-[32px]" 
                   title={product.name}
                 >
                   {product.name}
                 </h3>
                 
                 <div className="font-bold text-[#1e3a8a] text-[15px]">
                   ₹{(product.price * 83).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                 </div>
               </div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default DealSection;