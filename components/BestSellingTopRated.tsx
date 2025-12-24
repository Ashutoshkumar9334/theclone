import React from 'react';
import { Trophy, Medal, ChevronRight, Star } from 'lucide-react';
import { Product } from '../types';

interface SectionProps {
  bestSellers: Product[];
  topRated: Product[];
  onProductClick: (product: Product) => void;
  onViewAll: () => void;
}

const BestSellingTopRated: React.FC<SectionProps> = ({ bestSellers, topRated, onProductClick, onViewAll }) => {
  
  const renderStars = (rating: number = 0, reviews: number = 0) => {
    return (
      <div className="flex items-center gap-1">
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
        <span className="text-[10px] text-gray-500">({reviews})</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* Best Sellings (Best Sellers) */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
         <div className="flex items-center justify-between mb-5 border-b border-gray-50 pb-2">
            <div className="flex items-center gap-2">
                <Trophy className="text-orange-400" size={20} />
                <h2 className="text-base font-bold text-[#1e293b]">Best sellings</h2>
            </div>
            <button onClick={onViewAll} className="text-[#990000] text-xs font-medium flex items-center gap-1 hover:text-red-800">
                View All <ChevronRight size={14} />
            </button>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {bestSellers.map(product => (
                 <div 
                   key={product.id} 
                   className="flex items-start gap-3 group cursor-pointer"
                   onClick={() => onProductClick(product)}
                 >
                    <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden shrink-0 border border-gray-100">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex flex-col gap-1 py-1">
                        <h3 className="text-[13px] text-gray-700 font-normal leading-tight line-clamp-2" title={product.name}>
                            {product.name}
                        </h3>
                        <div className="text-[15px] font-bold text-[#1e293b]">
                            ₹{(product.price * 83).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                 </div>
             ))}
         </div>
      </div>

      {/* Top Rated */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
         <div className="flex items-center justify-between mb-5 border-b border-gray-50 pb-2">
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Medal className="text-red-400" size={20} />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full border border-white"></div>
                </div>
                <h2 className="text-base font-bold text-[#1e293b]">Top rated</h2>
            </div>
            <button onClick={onViewAll} className="text-[#990000] text-xs font-medium flex items-center gap-1 hover:text-red-800">
                View All <ChevronRight size={14} />
            </button>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {topRated.map(product => {
                 const finalPrice = product.price * 83 * (1 - (product.discount || 0)/100);
                 return (
                    <div 
                        key={product.id} 
                        className="flex items-start gap-3 group cursor-pointer"
                        onClick={() => onProductClick(product)}
                    >
                        <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden shrink-0 border border-gray-100 relative">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            {product.discount && (
                                <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-br-sm font-medium">
                                    -{product.discount}%
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 py-1">
                            <h3 className="text-[13px] text-gray-700 font-normal leading-tight line-clamp-2" title={product.name}>
                                {product.name}
                            </h3>
                            {renderStars(product.rating, product.reviews)}
                            <div className="flex items-center gap-2">
                                {product.discount && (
                                    <span className="text-xs text-gray-400 line-through">
                                        ₹{(product.price * 83).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                    </span>
                                )}
                                <div className="text-[15px] font-bold text-[#1e293b]">
                                    ₹{finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                            </div>
                        </div>
                    </div>
                 );
             })}
         </div>
      </div>

    </div>
  );
};

export default BestSellingTopRated;