import React from 'react';
import { ChevronRight, Briefcase, Printer, Armchair, Plus, Car, ShoppingBag, Scroll, Percent, Calendar, Scissors } from 'lucide-react';

const CATEGORIES_DATA = [
  { id: '1', name: 'Luggage & Bag Textile', icon: Briefcase },
  { id: '2', name: 'Printed Textile', icon: Printer },
  { id: '3', name: 'Home Furnishing', icon: Armchair },
  { id: '4', name: 'Medical Textile', icon: Plus },
  { id: '5', name: 'Automobile Textile', icon: Car },
  { id: '6', name: 'Bags Textile', icon: ShoppingBag },
  { id: '7', name: 'PVC Vinyl Flooring', icon: Scroll },
  { id: '8', name: 'Stock Clearance', icon: Percent },
  { id: '9', name: 'Calendar & Diary', icon: Calendar },
  { id: '10', name: 'Sewing Machine', icon: Scissors },
];

interface CategorySectionProps {
  onCategorySelect: (category: string) => void;
  onViewAll: () => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ onCategorySelect, onViewAll }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Categories</h2>
        <button 
          onClick={onViewAll}
          className="text-sm font-medium text-[#990000] hover:text-red-800 flex items-center gap-1 transition-colors"
        >
          View All <ChevronRight size={16} />
        </button>
      </div>

      <div 
        className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide px-2 snap-x" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORIES_DATA.map((cat) => (
          <div 
            key={cat.id} 
            className="flex flex-col items-center gap-3 min-w-[100px] cursor-pointer group snap-start"
            onClick={() => onCategorySelect(cat.name)}
          >
            <div className="w-24 h-24 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm group-hover:border-red-100 group-hover:shadow-md transition-all duration-300">
              <cat.icon size={36} strokeWidth={1.5} className="text-[#990000] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span 
              className="text-xs font-medium text-gray-700 text-center w-28 truncate group-hover:text-[#990000] transition-colors"
              title={cat.name}
            >
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;