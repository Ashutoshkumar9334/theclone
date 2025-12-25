
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
      
      {/* Sidebar - Deal of the Day - Responsive Centering */}
      <div className="w-full lg:w-[300px] shrink-0">
        <div className="bg-[#f0f8ff] border border-blue-100 rounded-lg p-6 md:p-8 flex flex-col items-center text-center h-full shadow-sm">
          
          <h3 className="text-primary font-bold text-sm md:text-base tracking-widest mb-6 md:mb-8 uppercase">
            DEAL OF THE DAY
          </h3>

          <div className="bg-white p-2 w-full max-w-[240px] md:max-w-full rounded-md shadow-sm mb-6 border border-gray-100 overflow-hidden">
             <div 
               className="w-full aspect-square bg-white cursor-pointer relative group overflow-hidden flex items-center justify-center"
               onClick={() => onProductClick(activeDeal)}
             >
                <img 
                  src={activeDeal.image} 
                  alt={activeDeal.name} 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  key={activeDeal.id}
                />
             </div>
          </div>

          <h4 
            className="text-sm md:text-[15px] font-medium text-gray-800 mb-4 line-clamp-2 leading-snug px-2" 
            title={activeDeal.name}
          >
            {activeDeal.name}
          </h4>

          <div className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            ₹{(activeDeal.price * 83).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>

          <button 
             onClick={() => onProductClick(activeDeal)}
             className="bg-primary text-white font-bold py-3 px-10 rounded-full text-sm uppercase hover:bg-red-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 w-max"
          >
            Buy Now
          </button>
          
          {/* Enhanced Dots for better touch targets */}
          <div className="flex justify-center gap-2 mt-8 md:mt-auto pt-4">
            {dealProducts.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentDealIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentDealIndex ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Main Content - Latest Products Responsive Grid */}
      <div className="flex-1">
        
        {/* Header - Centered on mobile */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
           <h2 className="text-xl md:text-2xl font-bold text-gray-900">Latest Products</h2>
           <button 
             onClick={onViewAll}
             className="text-primary text-sm font-semibold flex items-center gap-1 hover:text-red-800 transition-colors bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm sm:shadow-none sm:border-0 sm:px-0 sm:py-0"
           >
             View All <ChevronRight size={18} />
           </button>
        </div>

        {/* Improved Grid for all sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
           {latestProducts.map((product) => (
             <div 
               key={product.id} 
               className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col relative h-full"
               onClick={() => onProductClick(product)}
             >
               {/* Image Container - Proper padding and fit */}
               <div className="relative aspect-square bg-white border-b border-gray-50 p-4 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                  />
                  
                  {/* Custom Design Overlay - Improved visibility */}
                  {product.brand === 'Custom Design' && (
                     <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center z-10">
                        <span className="text-white text-lg md:text-xl font-black leading-tight tracking-wider uppercase">Custom<br/>Design</span>
                     </div>
                  )}

                  {/* Out Of Stock Bar - Better prominence */}
                  {product.inStock === false && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-[10px] md:text-xs py-2 text-center font-bold uppercase tracking-widest z-20">
                      Out Of Stock
                    </div>
                  )}
                  
                  {/* Hover Eye - Larger for mobile visibility if touched */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                      <div className="bg-white/90 p-3 rounded-full shadow-xl text-primary transform scale-0 group-hover:scale-100 transition-transform duration-300 backdrop-blur-sm">
                        <Eye size={24} />
                      </div>
                  </div>
               </div>

               {/* Info Section - Balanced spacing */}
               <div className="p-4 text-center flex flex-col flex-1 justify-between gap-2">
                 <h3 
                   className="text-sm font-medium text-gray-700 line-clamp-2 leading-tight min-h-[40px] group-hover:text-primary transition-colors" 
                   title={product.name}
                 >
                   {product.name}
                 </h3>
                 
                 <div className="font-bold text-gray-900 text-base md:text-lg">
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
