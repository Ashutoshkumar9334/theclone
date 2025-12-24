import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Star } from 'lucide-react';
import { Product } from '../types';

interface NewArrivalsSectionProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({ products, onProductClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Create 3 sets of products for seamless infinite scrolling
  const allProducts = [...products, ...products, ...products];
  const CARD_WIDTH = 336; // 320px width + 16px gap (approx)

  // Initialize scroll position to the middle set
  useEffect(() => {
    if (scrollRef.current) {
      const initialScroll = products.length * CARD_WIDTH;
      scrollRef.current.scrollLeft = initialScroll;
    }
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = CARD_WIDTH;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const totalWidth = container.scrollWidth;
      const setWidth = totalWidth / 3;

      // If we scroll into the first set (too far left), jump to the second set
      if (container.scrollLeft < setWidth * 0.5) {
         container.style.scrollBehavior = 'auto'; // Disable smooth for instant jump
         container.scrollLeft += setWidth;
         container.style.scrollBehavior = 'smooth'; // Re-enable
      }
      // If we scroll into the third set (too far right), jump to the second set
      else if (container.scrollLeft > setWidth * 2.5) {
         container.style.scrollBehavior = 'auto';
         container.scrollLeft -= setWidth;
         container.style.scrollBehavior = 'smooth';
      }
    }
  };

  const renderStars = (rating: number = 0) => {
    return (
      <div className="flex text-orange-400 gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={10} 
            fill={i < Math.floor(rating || 0) ? "currentColor" : "none"} 
            className={i < Math.floor(rating || 0) ? "text-orange-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="relative group/section"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">New Arrivals</h2>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[#990000] rounded-full flex items-center justify-center text-white shadow-md opacity-0 group-hover/section:opacity-100 transition-opacity hover:bg-red-800 duration-200 border-2 border-white"
        >
          <ChevronLeft size={20} />
        </button>

        <button 
          onClick={() => scroll('right')}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[#990000] rounded-full flex items-center justify-center text-white shadow-md opacity-0 group-hover/section:opacity-100 transition-opacity hover:bg-red-800 duration-200 border-2 border-white"
        >
          <ChevronRight size={20} />
        </button>

        {/* Horizontal Scroll List */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-4 scrollbar-hide pb-2"
          style={{ 
             scrollbarWidth: 'none', 
             msOverflowStyle: 'none',
             scrollBehavior: 'smooth'
          }}
        >
          {allProducts.map((product, index) => (
            <div 
              key={`${product.id}-${index}`} 
              className="min-w-[320px] w-[320px] bg-white border border-gray-100 rounded-lg p-2 flex gap-3 cursor-pointer hover:shadow-md transition-shadow shrink-0 group/card"
              onClick={() => onProductClick(product)}
            >
              {/* Image */}
              <div className="w-24 h-24 bg-gray-50 shrink-0 rounded overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" 
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center flex-1 py-1">
                 <h3 className="text-sm font-medium text-blue-500 mb-1.5 line-clamp-2 leading-tight hover:text-blue-700 transition-colors" title={product.name}>
                   {product.name}
                 </h3>
                 
                 <div className="flex items-center gap-2 mb-1.5">
                   {renderStars(product.rating)}
                   {product.rating ? <span className="text-[10px] text-gray-400">({1})</span> : null}
                 </div>

                 <div className="font-bold text-gray-900 text-sm">
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

export default NewArrivalsSection;