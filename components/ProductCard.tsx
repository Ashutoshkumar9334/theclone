
import React from 'react';
import { Product } from '../types';
import { Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick }) => {
  const originalPrice = product.price * 83; // Converting approx to INR for display match
  const finalPrice = product.discount 
    ? originalPrice - (originalPrice * (product.discount / 100)) 
    : originalPrice;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={12} 
            fill={i < Math.floor(rating || 5) ? "#f97316" : "#e5e7eb"} 
            className={i < Math.floor(rating || 5) ? "text-orange-500" : "text-gray-200"}
            strokeWidth={0}
          />
        ))}
        {/* Add numeric count like in screenshot (1) */}
        <span className="text-xs text-gray-500 ml-1">({product.reviews || 1})</span>
      </div>
    );
  };

  return (
    <div 
      className="bg-white border border-gray-100 rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col relative"
      onClick={() => onClick(product)}
    >
      {/* Discount Badge - Flag Style */}
      {product.discount && product.discount > 0 && (
        <div className="absolute top-2 left-0 z-10 bg-[#990000] text-white text-[11px] font-bold px-2 py-1 rounded-r-sm shadow-sm">
          -{product.discount}%
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#f8f9fa] p-4 border-b border-gray-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <button 
             className="bg-white p-2.5 rounded-full text-gray-700 hover:text-[#990000] shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
             onClick={(e) => {
                e.stopPropagation();
                onClick(product);
             }}
           >
             <Eye size={18} />
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 text-center flex flex-col items-center">
        
        {/* Stars */}
        <div className="mb-2">
           {renderStars(product.rating || 5)}
        </div>
        
        {/* Title */}
        <h3 className="text-[13px] font-normal text-gray-700 mb-2 line-clamp-2 min-h-[40px] leading-tight hover:text-[#990000] transition-colors" title={product.name}>
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-center gap-2">
           {product.discount && product.discount > 0 && (
             <span className="text-xs text-gray-400 line-through decoration-gray-400">
               ₹{originalPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
             </span>
           )}
           <span className="text-[15px] font-bold text-[#1e293b]">
             ₹{finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
           </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
