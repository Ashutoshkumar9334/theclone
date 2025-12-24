
import React, { useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Eye } from 'lucide-react';
import { Product } from '../types';

interface FeaturedCarouselProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onViewAll: () => void;
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ products, onProductClick, onViewAll }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Duplicate products 6 times for seamless infinite scrolling
  const allProducts = [...products, ...products, ...products, ...products, ...products, ...products];
  
  // Card dimensions logic to set initial scroll position
  // Mobile: 160px width + 12px (gap-3) = 172px
  // Desktop: 240px width + 24px (gap-6) = 264px
  const getCardWidth = () => window.innerWidth < 768 ? 172 : 264;

  useEffect(() => {
    // Initialize scroll position to the middle (Start of Set 2)
    if (scrollRef.current) {
      const cardWidth = getCardWidth();
      scrollRef.current.scrollLeft = products.length * cardWidth * 2;
    }
  }, [products]);

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      scroll('right');
    }, 3000);
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = getCardWidth();
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = getCardWidth();
      const singleSetWidth = products.length * cardWidth;

      // Infinite scroll logic: jump silently when reaching ends of buffer
      
      // If we scroll too far left (into Set 0 or beginning of Set 1)
      if (container.scrollLeft < singleSetWidth * 1.5) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft += singleSetWidth * 2;
        requestAnimationFrame(() => {
           container.style.scrollBehavior = 'smooth';
        });
      } 
      // If we scroll too far right (into Set 4 or Set 5)
      else if (container.scrollLeft > singleSetWidth * 4) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft -= singleSetWidth * 2;
        requestAnimationFrame(() => {
           container.style.scrollBehavior = 'smooth';
        });
      }
    }
  };

  return (
    <div 
      className="bg-white pt-6 pb-2 md:p-6 rounded-lg shadow-sm border border-gray-100 relative group/section"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      {/* Header */}
      <div className="relative flex flex-col md:flex-row items-center justify-center mb-4 md:mb-8 px-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#990000] text-center uppercase">Featured Products</h2>
        <button 
          onClick={onViewAll}
          className="hidden md:flex absolute right-0 text-sm font-medium text-[#990000] hover:text-red-800 items-center gap-1 transition-colors"
        >
          View All <ChevronRight size={16} />
        </button>
      </div>

      {/* Carousel Container */}
      <div className="relative px-0 md:px-2">
        {/* Navigation Buttons */}
        <button 
          onClick={(e) => { e.stopPropagation(); scroll('left'); }}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-[#990000] rounded-full items-center justify-center text-white shadow-lg opacity-0 group-hover/section:opacity-100 transition-opacity disabled:opacity-0 hover:bg-red-800 hover:scale-110 duration-200 border-2 border-white"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} />
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); scroll('right'); }}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-[#990000] rounded-full items-center justify-center text-white shadow-lg opacity-0 group-hover/section:opacity-100 transition-opacity hover:bg-red-800 hover:scale-110 duration-200 border-2 border-white"
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} />
        </button>

        {/* Scrollable List */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-3 md:gap-6 pb-4 scrollbar-hide px-4 md:px-0"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth' 
          }}
        >
          {allProducts.map((product, index) => (
            <div 
              key={`${product.id}-${index}`} 
              className="min-w-[160px] w-[160px] md:min-w-[240px] md:w-[240px] shrink-0 cursor-pointer group"
              onClick={() => onProductClick(product)}
            >
              {/* Image Card */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm mb-3">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                
                {product.inStock === false && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-center text-[10px] md:text-xs py-1.5 md:py-2 font-medium">
                    Out Of Stock
                  </div>
                )}

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-white/90 p-2 md:p-3 rounded-full text-gray-800 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:text-[#990000]">
                      <Eye size={20} />
                   </div>
                </div>
              </div>

              {/* Info */}
              <div className="px-1 text-center md:text-left">
                <h3 className="text-gray-900 font-medium text-xs md:text-sm leading-tight mb-1 line-clamp-2 h-8 md:h-10">
                  {product.name}
                </h3>
                <div className="text-gray-800 font-bold text-sm md:text-base">
                   ₹{(product.price * 83).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-2 mb-2 flex justify-center md:hidden">
            <button 
              onClick={onViewAll}
              className="text-sm font-medium text-[#990000] flex items-center gap-1 hover:text-red-800 transition-colors"
            >
              View All <ChevronRight size={16} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
