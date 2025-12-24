import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingCart, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-[480px] bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full font-sans">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-[#eff6ff] border-b border-blue-50">
            <div className="flex items-center gap-2 text-[#1e3a8a] text-lg font-normal">
              <ShoppingCart size={20} fill="currentColor" className="text-[#1e3a8a]" />
              <span>Shopping Cart</span>
            </div>
            {/* Close button is implied by UI norms, though not explicitly in screenshot header, keeping for usability */}
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center -mt-10">
                <div className="relative mb-6">
                    {/* Background Circle */}
                    <div className="w-36 h-36 bg-gray-50 rounded-full flex items-center justify-center relative">
                        {/* Bag Icon */}
                        <ShoppingBag size={80} className="text-gray-300 fill-gray-200/50" strokeWidth={1.5} />
                        
                        {/* Plus Badge */}
                        <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-1.5 border-[3px] border-white">
                           <Plus size={16} className="text-white" strokeWidth={3} />
                        </div>
                    </div>
                </div>
                <p className="text-[#4b5563] text-xl font-normal tracking-wide">Your Cart Is Empty!</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
                  <div className="w-20 h-24 bg-gray-50 overflow-hidden shrink-0 rounded-sm border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-800 text-sm line-clamp-2">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.material}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-sm">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 px-2 hover:bg-gray-50 text-gray-500"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-gray-700">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 px-2 hover:bg-gray-50 text-gray-500"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-bold text-gray-900">₹{(item.price * 83 * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600 font-medium">Subtotal</span>
                <span className="text-xl font-bold text-[#990000]">₹{(total * 83).toFixed(2)}</span>
              </div>
              <button className="w-full bg-[#990000] text-white py-3.5 font-bold uppercase tracking-wide text-sm hover:bg-[#7a0000] transition-colors rounded-sm shadow-sm">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;