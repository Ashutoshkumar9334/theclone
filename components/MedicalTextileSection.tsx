
import React, { useRef, useEffect } from 'react';
import { ChevronRight, Eye } from 'lucide-react';
import { Product } from '../types';

interface MedicalTextileSectionProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onViewAll: () => void;
}

const MedicalTextileSection: React.FC<MedicalTextileSectionProps> = ({ products, onProductClick, onViewAll }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Duplicate products for infinite scroll effect
  const allProducts = [...products, ...products, ...products];
  const CARD_WIDTH = 196; // 180px width + 16px gap

  useEffect(() => {
    // Initialize scroll position to the middle set
    if (scrollRef.current) {
      const initialScroll = products.length * CARD_WIDTH;
      scrollRef.current.scrollLeft = initialScroll;
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
      const setWidth = container.scrollWidth / 3;

      // Infinite scroll logic: jump silently when reaching ends of buffer
      if (container.scrollLeft < setWidth * 0.5) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft += setWidth;
        // Restore smooth scroll in next frame
        requestAnimationFrame(() => {
            container.style.scrollBehavior = 'smooth';
        });
      } else if (container.scrollLeft > setWidth * 2.5) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft -= setWidth;
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
        <h2 className="text-xl font-bold text-[#1e293b] uppercase">MEDICAL TEXTILE</h2>
        <button 
          onClick={onViewAll}
          className="text-[#990000] text-sm font-medium flex items-center gap-1 hover:text-red-800 transition-colors"
        >
          View All <ChevronRight size={16} />
        </button>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        
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

export default MedicalTextileSection;
