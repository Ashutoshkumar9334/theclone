
import React, { useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Eye } from 'lucide-react';
import { Product } from '../types';

interface IndustrialTextileSectionProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onViewAll: () => void;
}

const IndustrialTextileSection: React.FC<IndustrialTextileSectionProps> = ({ products, onProductClick, onViewAll }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Duplicate products 6 times to ensure the scrollable area is much larger than any viewport
  // This prevents "running out" of buffer on large screens when the product list is short
  const allProducts = [...products, ...products, ...products, ...products, ...products, ...products];
  const CARD_WIDTH = 196; // 180px width + 16px gap

  useEffect(() => {
    // Initialize scroll position to the middle (Start of Set 2, index 0-5)
    // We want to be in the middle of the range [0, 1, 2, 3, 4, 5]
    if (scrollRef.current) {
      const singleSetWidth = products.length * CARD_WIDTH;
      // Position at the start of the 3rd set (index 2)
      scrollRef.current.scrollLeft = singleSetWidth * 2;
    }
  }, [products]);

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      scroll('right', 1);
    }, 3000); // 3 seconds interval
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const scroll = (direction: 'left' | 'right', multiplier: number = 1) => {
    if (scrollRef.current) {
      const scrollAmount = CARD_WIDTH * multiplier;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const singleSetWidth = (products.length * CARD_WIDTH);
      
      // We have 6 sets: [0, 1, 2, 3, 4, 5]
      // Ideal operating zone is Set 2 and Set 3.
      
      // If we scroll too far left (into Set 0 or beginning of Set 1)
      if (container.scrollLeft < singleSetWidth * 1.5) {
        container.style.scrollBehavior = 'auto'; // Disable smooth scroll for instant jump
        // Jump forward by 2 sets (to Set 3)
        container.scrollLeft += singleSetWidth * 2; 
        
        // Restore smooth scroll in next frame
        requestAnimationFrame(() => {
            container.style.scrollBehavior = 'smooth';
        });
      } 
      // If we scroll too far right (into Set 4 or Set 5)
      else if (container.scrollLeft > singleSetWidth * 4) {
        container.style.scrollBehavior = 'auto';
        // Jump backward by 2 sets (to Set 2)
        container.scrollLeft -= singleSetWidth * 2;
        
        requestAnimationFrame(() => {
            container.style.scrollBehavior = 'smooth';
        });
      }
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-100 relative group/section p-6"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#1e293b] uppercase">INDUSTRIAL TEXTILE</h2>
        <button 
          onClick={onViewAll}
          className="text-[#990000] text-sm font-medium flex items-center gap-1 hover:text-red-800 transition-colors"
        >
          View All <ChevronRight size={16} />
        </button>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons - Z-Index 50 to stay above product overlays */}
        <button 
          onClick={(e) => { e.stopPropagation(); scroll('left', 2); }}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-50 w-9 h-9 bg-[#990000] rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover/section:opacity-100 transition-opacity hover:bg-red-800 duration-200 border-2 border-white"
        >
          <ChevronLeft size={22} />
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); scroll('right', 2); }}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-50 w-9 h-9 bg-[#990000] rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover/section:opacity-100 transition-opacity hover:bg-red-800 duration-200 border-2 border-white"
        >
          <ChevronRight size={22} />
        </button>

        {/* Scrollable List */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth' 
          }}
        >
          {allProducts.map((product, index) => (
            <div 
              key={`${product.id}-${index}`} 
              className="min-w-[180px] w-[180px] shrink-0 cursor-pointer group"
              onClick={() => onProductClick(product)}
            >
              {/* Image Card */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shadow-sm mb-3">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* Out Of Stock Overlay */}
                {product.inStock === false && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center text-[10px] py-1.5 font-medium z-20">
                    Out Of Stock
                  </div>
                )}

                {/* Hover Eye Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-30">
                    <div className="bg-white p-2.5 rounded-full text-gray-800 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:text-[#990000]">
                       <Eye size={20} />
                    </div>
                </div>
              </div>

              {/* Info */}
              <div className="px-0.5">
                <h3 className="text-gray-900 font-medium text-sm leading-tight mb-1 truncate" title={product.name}>
                  {product.name}
                </h3>
                <div className="text-[#1e293b] font-bold text-base">
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

export default IndustrialTextileSection;
