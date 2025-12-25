
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, User, Search, Menu, ChevronDown, Grid, LogIn, UserPlus, X, ChevronRight, Phone, ShoppingBag, Plus, Star } from 'lucide-react';
import { PageView, Product } from '../types';
import { PRODUCTS, CATEGORIES, MEGA_MENU_DATA } from '../services/mockData';

interface NavbarProps {
  cartCount: number;
  onNavigate: (page: PageView) => void;
  onOpenCart: () => void;
  onProductSelect: (product: Product) => void;
  onWishlistClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onNavigate, onOpenCart, onProductSelect, onWishlistClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Category Menu State
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  // Cart Hover State
  const [isCartHovered, setIsCartHovered] = useState(false);
  
  // Mobile specific states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(false);
  const [expandedVendorZone, setExpandedVendorZone] = useState(false);

  // Sticky Header State
  const [isSticky, setIsSticky] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Handle Scroll for Sticky Header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter suggestions
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleSearchSelect = (product: Product) => {
    onProductSelect(product);
    setSearchTerm('');
    setShowSuggestions(false);
    setIsMobileSearchOpen(false);
  };

  const navigateAndClose = (page: PageView) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  }

  const renderFlyoutContent = (category: string) => {
    const content = MEGA_MENU_DATA[category];
    if (!content) return null;

    return (
      <div 
        className="absolute left-[100%] top-0 w-[700px] min-h-[400px] bg-white border border-gray-200 shadow-2xl z-[70] animate-in fade-in slide-in-from-left-2 duration-150 cursor-default"
        style={{ marginTop: '-1px' }}
      >
         {content.type === 'banner' ? (
            <div className="w-full h-full min-h-[400px] relative group">
               <div 
                 className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                 style={{ backgroundImage: `url("${content.image}")` }}
               />
               <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
               <div className="relative z-10 p-10 h-full flex flex-col justify-center max-w-md">
                   <h3 className="text-4xl font-serif text-[#990000] mb-2 leading-tight drop-shadow-sm">{content.title}</h3>
                   <h4 className="text-lg font-medium text-gray-800 mb-4">{content.subtitle}</h4>
                   {content.description && (
                     <ul className="space-y-2 mb-6">
                       {content.description.map((desc, i) => (
                         <li key={i} className="text-sm text-gray-700 flex items-start gap-2 font-medium">
                           <span className="w-1.5 h-1.5 bg-[#990000] rounded-full mt-1.5 shrink-0" />
                           {desc}
                         </li>
                       ))}
                     </ul>
                   )}
                   <button 
                     onClick={() => navigateAndClose(PageView.SHOP)}
                     className="bg-[#990000] text-white px-8 py-3 rounded-full text-sm font-bold w-max shadow-lg hover:bg-red-800 transition-all transform hover:-translate-y-1"
                   >
                     Explore Collection
                   </button>
               </div>
            </div>
         ) : (
            <div className="p-8 h-full bg-white">
               <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                  {content.sections.map((section, idx) => (
                    <div key={idx} className="break-inside-avoid">
                      <h4 className="font-bold text-[#990000] text-sm mb-4 uppercase tracking-wider border-b border-gray-100 pb-2">{section.title}</h4>
                      <ul className="space-y-2.5">
                        {section.items.map((item, i) => (
                          <li key={i}>
                            <a 
                              href="#" 
                              onClick={(e) => { e.preventDefault(); navigateAndClose(PageView.SHOP); }}
                              className="text-[13px] text-gray-600 hover:text-[#990000] hover:translate-x-1 transition-all block font-medium"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
               </div>
            </div>
         )}
      </div>
    );
  };

  const renderCategoryDropdown = () => (
    <div 
      className="absolute top-full left-0 bg-white shadow-xl z-[60] w-[270px] py-1 rounded-b-sm font-sans border border-gray-100 border-t-0"
    >
      <div className="flex flex-col">
        {CATEGORIES.map((cat) => (
          <div 
            key={cat}
            className={`group/item relative px-5 py-3.5 text-[13px] font-medium cursor-pointer flex items-center justify-between border-b border-gray-50 last:border-0 transition-colors
              ${activeCategory === cat ? 'bg-gray-50 text-[#990000]' : 'text-gray-700 hover:text-[#990000]'}
            `}
            onMouseEnter={() => setActiveCategory(cat)}
            onClick={() => navigateAndClose(PageView.SHOP)}
          >
            <span>{cat}</span>
            <ChevronRight size={14} className={`text-gray-400 ${activeCategory === cat ? 'text-[#990000]' : ''}`} />
            {activeCategory === cat && MEGA_MENU_DATA[cat] && renderFlyoutContent(cat)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div 
        className={`fixed inset-0 z-[100] bg-black/50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 left-0 w-[85%] max-w-[300px] h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
             <div className="flex items-center gap-1">
                <div className="w-8 h-6 bg-[#990000] rounded-tl-lg rounded-br-lg"></div>
                <div className="text-lg font-bold tracking-tight text-gray-800 font-serif">
                  The Fabrima<span className="text-[10px] font-sans font-normal text-gray-400">.com</span>
                </div>
             </div>
             <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-800 p-1">
               <X size={24} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
             <div className="flex flex-col text-[15px] font-medium text-gray-700">
               <button onClick={() => navigateAndClose(PageView.HOME)} className="w-full text-left px-5 py-3 hover:bg-gray-50 flex items-center justify-between">
                 Home
               </button>

               <div>
                  <button 
                    onClick={() => setExpandedMobileCategory(!expandedMobileCategory)}
                    className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50"
                  >
                    <span>Categories</span>
                    <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 ${expandedMobileCategory ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 ${expandedMobileCategory ? 'max-h-[500px]' : 'max-h-0'}`}>
                    {CATEGORIES.map((cat, idx) => (
                      <button key={idx} onClick={() => navigateAndClose(PageView.SHOP)} className="w-full text-left px-8 py-2.5 text-sm text-gray-600 hover:text-[#990000]">
                        {cat}
                      </button>
                    ))}
                  </div>
               </div>

               <button onClick={() => navigateAndClose(PageView.SHOP)} className="w-full text-left px-5 py-3 hover:bg-gray-50">
                 Discounted Products
               </button>

               <div>
                  <button 
                    onClick={() => setExpandedVendorZone(!expandedVendorZone)}
                    className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50"
                  >
                    <span>Vendor Zone</span>
                    <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 ${expandedVendorZone ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 ${expandedVendorZone ? 'max-h-[250px]' : 'max-h-0'}`}>
                     <button onClick={() => navigateAndClose(PageView.ZOMATO_PARTNER)} className="w-full text-left px-8 py-2.5 text-sm text-primary font-bold flex items-center gap-2">
                       <Star size={14} fill="currentColor" /> Zomato Special Platform
                     </button>
                     <button onClick={() => navigateAndClose(PageView.SELL_WITH_FABRIMA)} className="w-full text-left px-8 py-2.5 text-sm text-gray-600">
                       Sell With Us
                     </button>
                     <button onClick={() => navigateAndClose(PageView.VENDOR_LOGIN)} className="w-full text-left px-8 py-2.5 text-sm text-gray-600">
                       Vendor Login
                     </button>
                  </div>
               </div>

               <button onClick={() => navigateAndClose(PageView.CONTACT)} className="w-full text-left px-5 py-3 hover:bg-gray-50">
                 Contact Us
               </button>
             </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col font-sans bg-white relative z-40">
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex justify-end items-center h-8 md:h-9">
            <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-gray-700 font-medium">
               <div className="flex items-center gap-1 cursor-pointer hover:text-[#990000] transition-colors">
                  <span>INR ₹</span> <ChevronDown size={12} className="md:w-3.5 md:h-3.5" />
               </div>
               <div className="flex items-center gap-1 cursor-pointer hover:text-[#990000] transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="US" className="w-4 h-3 md:w-5 md:h-3.5 object-cover" />
                  <span>English</span> <ChevronDown size={12} className="md:w-3.5 md:h-3.5" />
               </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-2 md:py-4 relative z-50">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between gap-2 md:gap-8">
              <div className="flex items-center gap-2 md:gap-3">
                  <button className="md:hidden p-1 -ml-1 text-gray-700" onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu size={24} strokeWidth={1.5} />
                  </button>
                  <div className="flex items-center gap-1.5 md:gap-2 cursor-pointer shrink-0" onClick={() => onNavigate(PageView.HOME)}>
                     <div className="w-7 h-6 md:w-11 md:h-9 relative">
                        <div className="absolute inset-0 bg-[#990000] rounded-tl-xl md:rounded-tl-3xl rounded-br-xl md:rounded-br-3xl transform skew-x-[-10deg]"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white font-serif font-bold text-base md:text-2xl italic pr-0.5">F</div>
                     </div>
                     <div className="flex flex-col -space-y-0.5 md:-space-y-1">
                        <span className="text-lg md:text-2xl font-bold text-gray-900 tracking-tight font-serif">
                          The Fabrima<span className="text-[10px] md:text-sm font-sans font-normal text-gray-500 hidden lg:inline">.com</span>
                        </span>
                        <span className="text-[8px] md:text-[10px] text-gray-500 tracking-widest uppercase font-semibold ml-0.5 hidden md:block">e-Marketplace</span>
                     </div>
                  </div>
              </div>

              <div className="hidden md:block flex-1 max-w-3xl relative z-[60]" ref={searchRef}>
                <div className="flex w-full relative">
                  <input 
                    type="text" 
                    placeholder="Search for items..." 
                    className="w-full bg-white border border-gray-200 rounded-l-md px-5 py-2.5 focus:outline-none focus:border-[#990000] text-gray-700 text-sm h-[44px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="bg-[#990000] text-white px-7 rounded-r-md hover:bg-[#7a0000] transition-colors flex items-center justify-center h-[44px]">
                    <Search size={22} />
                  </button>
                </div>
                {showSuggestions && (
                  <div className="absolute top-[48px] left-0 right-0 bg-white shadow-xl rounded-b-md border border-gray-100 z-[100] max-h-[400px] overflow-y-auto">
                    {suggestions.length > 0 ? (
                      <ul className="py-1">
                        {suggestions.map((product) => (
                          <li key={product.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-4" onClick={() => handleSearchSelect(product)}>
                             <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                             <span className="text-sm font-medium text-gray-800">{product.name}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">No results found</div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 md:gap-6 shrink-0">
                 <button className="md:hidden text-gray-600 p-1" onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}>
                    <Search size={22} />
                 </button>
                 <button className="hidden md:flex relative p-1 text-[#990000]" onClick={onWishlistClick || (() => onNavigate(PageView.USER_LOGIN))}>
                   <Heart size={26} strokeWidth={2} />
                   <span className="absolute -top-1 -right-1 bg-[#990000] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">0</span>
                 </button>
                 <button onClick={() => onNavigate(PageView.USER_LOGIN)} className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <User size={18} fill="currentColor" className="text-blue-500 md:w-[22px] md:h-[22px]" />
                 </button>
                 <div className="relative z-50" onMouseEnter={() => setIsCartHovered(true)} onMouseLeave={() => setIsCartHovered(false)}>
                   <button onClick={onOpenCart} className="flex items-center gap-3 group h-full">
                     <div className="relative text-[#990000]">
                        <ShoppingCart size={24} strokeWidth={2} />
                        <span className="absolute -top-1.5 -right-1.5 bg-[#990000] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white font-bold">{cartCount}</span>
                     </div>
                     <div className="hidden xl:flex flex-col text-left leading-none gap-1">
                       <span className="text-[12px] text-gray-500">My cart</span>
                       <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-gray-900">₹0.00</span>
                          <ChevronDown size={10} />
                       </div>
                     </div>
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block bg-[#990000] text-white shadow-md z-40">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-[52px] flex items-center justify-between">
            <div className="h-[52px] flex items-center relative group/categories" onMouseEnter={() => setIsCategoryMenuOpen(true)} onMouseLeave={() => { setIsCategoryMenuOpen(false); setActiveCategory(null); }}>
              <div className="bg-white text-[#990000] h-[40px] px-5 flex items-center gap-3 font-bold text-sm uppercase cursor-pointer rounded-sm relative z-50">
                <Grid size={18} />
                <span>Categories</span>
                <ChevronDown size={16} className="ml-4" />
              </div>
              {isCategoryMenuOpen && renderCategoryDropdown()}
            </div>

            <div className="flex-1 flex items-center justify-start pl-6 gap-2">
              <button onClick={() => onNavigate(PageView.HOME)} className="px-4 py-2 hover:bg-white/10 rounded text-[14px] font-medium">Home</button>
              <button onClick={() => onNavigate(PageView.SHOP)} className="px-4 py-2 hover:bg-white/10 rounded text-[14px] font-medium">Discounted Products</button>
              <div className="relative group">
                <button className="px-4 py-2 hover:bg-white/10 rounded text-[14px] font-medium flex items-center gap-1">
                  Vendor Zone <ChevronDown size={14} className="opacity-80" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-md hidden group-hover:block z-50 py-2 border-t-4 border-[#990000]">
                   <button onClick={() => onNavigate(PageView.ZOMATO_PARTNER)} className="block w-full text-left px-5 py-3 text-sm font-bold text-primary hover:bg-red-50 flex items-center gap-2 border-b border-gray-50">
                     <Star size={14} fill="currentColor" /> Zomato Special Platform
                   </button>
                   <button onClick={() => onNavigate(PageView.SELL_WITH_FABRIMA)} className="block w-full text-left px-5 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 border-b border-gray-50">Sell With Us</button>
                   <button onClick={() => onNavigate(PageView.VENDOR_LOGIN)} className="block w-full text-left px-5 py-3 text-sm font-medium text-gray-700 hover:bg-red-50">Vendor Login</button>
                </div>
              </div>
              <button onClick={() => onNavigate(PageView.CONTACT)} className="px-4 py-2 hover:bg-white/10 rounded text-[14px] font-medium">Contact Us</button>
            </div>
            
            <div className="hidden lg:flex items-center gap-6 text-xs font-medium text-white/90">
                <div className="flex items-center gap-2">
                    <Phone size={14} /> <span>+91 93551 00885</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed top-0 left-0 right-0 bg-white shadow-md z-[100] transition-transform duration-300 hidden md:block ${isSticky ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-2 flex items-center justify-between h-[65px]">
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(PageView.HOME)}>
              <div className="w-7 h-5 bg-[#990000] rounded-tl-lg rounded-br-lg relative">
                 <span className="absolute inset-0 flex items-center justify-center text-white font-serif font-bold italic">F</span>
              </div>
              <span className="text-lg font-bold text-gray-900 font-serif">The Fabrima</span>
           </div>
           <div className="flex-1 max-w-2xl flex items-center gap-3">
              <input type="text" placeholder="Search..." className="w-full bg-white border border-gray-200 rounded-l-md px-4 py-2 text-sm h-[40px]" />
              <button className="bg-[#990000] text-white px-6 rounded-r-md h-[40px]"><Search size={20} /></button>
           </div>
           <div className="flex items-center gap-5">
               <button onClick={onOpenCart} className="relative text-[#990000]"><ShoppingCart size={26} /><span className="absolute -top-1 -right-1 bg-[#990000] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span></button>
               <button onClick={() => setIsMobileMenuOpen(true)} className="text-primary"><Menu size={28} /></button>
           </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
