import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, User, Search, Menu, ChevronDown, Grid, LogIn, UserPlus, X, ChevronRight, Phone, ShoppingBag, Plus } from 'lucide-react';
import { PageView, Product } from '../types';
import { PRODUCTS, CATEGORIES, MEGA_MENU_DATA, MegaMenuContent } from '../services/mockData';

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
      // Show sticky header after scrolling past the main header area (approx 150px)
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter suggestions based on search term
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

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
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

  // Render Flyout Content
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

  // Main Dropdown Render
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

            {/* Flyout Submenu */}
            {activeCategory === cat && MEGA_MENU_DATA[cat] && renderFlyoutContent(cat)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar / Drawer */}
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
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
             {/* Logo in Drawer */}
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

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto py-2">
             <div className="flex flex-col text-[15px] font-medium text-gray-700">
               
               {/* Home */}
               <button onClick={() => navigateAndClose(PageView.HOME)} className="w-full text-left px-5 py-3 hover:bg-gray-50 flex items-center justify-between">
                 Home
               </button>

               {/* Categories Accordion */}
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
                      <button 
                        key={idx}
                        onClick={() => {
                          navigateAndClose(PageView.SHOP);
                        }}
                        className="w-full text-left px-8 py-2.5 text-sm text-gray-600 hover:text-[#990000] border-l-2 border-transparent hover:border-[#990000]"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
               </div>

               {/* Discounted Products */}
               <button onClick={() => navigateAndClose(PageView.SHOP)} className="w-full text-left px-5 py-3 hover:bg-gray-50 flex items-center justify-between">
                 Discounted Products
               </button>

               <div className="border-t border-b border-gray-100 my-2 py-2">
                  {/* Sign In */}
                  <button onClick={() => navigateAndClose(PageView.USER_LOGIN)} className="w-full text-left px-5 py-3 hover:bg-gray-50 flex items-center gap-3 text-gray-800">
                    <LogIn size={18} className="text-gray-500" /> 
                    <span>Sign in</span>
                  </button>
                  
                  {/* Sign Up */}
                  <button onClick={() => navigateAndClose(PageView.SIGN_UP)} className="w-full text-left px-5 py-3 hover:bg-gray-50 flex items-center gap-3 text-gray-800">
                    <div className="relative">
                       <User size={18} className="text-gray-500" />
                       <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                    </div>
                    <span>Sign up</span>
                  </button>
               </div>

               {/* Vendor Zone Accordion */}
               <div>
                  <button 
                    onClick={() => setExpandedVendorZone(!expandedVendorZone)}
                    className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50"
                  >
                    <span>Vendor Zone</span>
                    <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 ${expandedVendorZone ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 ${expandedVendorZone ? 'max-h-[150px]' : 'max-h-0'}`}>
                     <button onClick={() => navigateAndClose(PageView.SELL_WITH_FABRIMA)} className="w-full text-left px-8 py-2.5 text-sm text-gray-600 hover:text-[#990000]">
                       Sell With Us
                     </button>
                     <button onClick={() => navigateAndClose(PageView.VENDOR_LOGIN)} className="w-full text-left px-8 py-2.5 text-sm text-gray-600 hover:text-[#990000]">
                       Vendor Login
                     </button>
                  </div>
               </div>

               {/* Contact Us */}
               <button onClick={() => navigateAndClose(PageView.CONTACT)} className="w-full text-left px-5 py-3 hover:bg-gray-50 flex items-center justify-between">
                 Contact Us
               </button>

             </div>
          </div>
        </div>
      </div>

      {/* Main Navbar Wrapper - Static on Desktop */}
      <div className="w-full flex flex-col font-sans bg-white relative z-40">
        
        {/* Top Strip - Visible on Mobile too based on screenshot */}
        <div className="bg-white border-b border-gray-100 block">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex justify-end items-center h-8 md:h-9">
            <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-gray-700 font-medium">
               <div className="flex items-center gap-1 cursor-pointer hover:text-[#990000] transition-colors">
                  <span>INR ₹</span> <ChevronDown size={12} className="md:w-3.5 md:h-3.5" />
               </div>
               <div className="flex items-center gap-1 cursor-pointer hover:text-[#990000] transition-colors">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" 
                    alt="US Flag" 
                    className="w-4 h-3 md:w-5 md:h-3.5 object-cover shadow-sm" 
                  />
                  <span>English</span> <ChevronDown size={12} className="md:w-3.5 md:h-3.5" />
               </div>
            </div>
          </div>
        </div>

        {/* Main Header Row */}
        <div className="bg-white py-2 md:py-4 relative z-50">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between gap-2 md:gap-8">
              
              {/* Left: Logo & Menu */}
              <div className="flex items-center gap-2 md:gap-3">
                  {/* Hamburger (Mobile) */}
                  <button 
                    className="md:hidden p-1 -ml-1 text-gray-700"
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <Menu size={24} strokeWidth={1.5} />
                  </button>

                  <div 
                    className="flex items-center gap-1.5 md:gap-2 cursor-pointer shrink-0"
                    onClick={() => onNavigate(PageView.HOME)}
                  >
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

              {/* Center: Search Bar (Hidden on mobile) */}
              <div className="hidden md:block flex-1 max-w-3xl relative z-[60]" ref={searchRef}>
                <div className="flex w-full relative group">
                  <input 
                    type="text" 
                    placeholder="Search for items..." 
                    className="w-full bg-white border border-gray-200 rounded-l-md px-5 py-2.5 focus:outline-none focus:border-[#990000] text-gray-700 placeholder-gray-400 text-sm h-[44px] transition-colors relative z-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => searchTerm.trim().length > 0 && setShowSuggestions(true)}
                  />
                  {searchTerm && (
                    <button 
                      className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 z-20"
                      onClick={() => setSearchTerm('')}
                    >
                      <X size={18} />
                    </button>
                  )}
                  <button className="bg-[#990000] text-white px-7 rounded-r-md hover:bg-[#7a0000] transition-colors flex items-center justify-center h-[44px] z-10">
                    <Search size={22} />
                  </button>
                </div>
                {/* Suggestions Dropdown */}
                {showSuggestions && (
                  <div className="absolute top-[48px] left-0 right-0 bg-white shadow-xl rounded-b-md border border-gray-100 z-[100] max-h-[400px] overflow-y-auto">
                    {suggestions.length > 0 ? (
                      <ul className="py-1">
                        {suggestions.map((product) => (
                          <li 
                            key={product.id}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 flex items-center gap-4 transition-colors group"
                            onClick={() => handleSearchSelect(product)}
                          >
                             <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded bg-gray-100" />
                             <div className="flex-1">
                               <div className="text-sm font-medium text-gray-800 group-hover:text-[#990000]">{product.name}</div>
                             </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">No results found</div>
                    )}
                  </div>
                )}
              </div>

              {/* Right: Icons (Mobile & Desktop) */}
              <div className="flex items-center gap-3 md:gap-6 shrink-0">
                 
                 {/* Search Toggle (Mobile) */}
                 <button 
                    className="md:hidden text-gray-600 p-1"
                    onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                 >
                    <Search size={22} strokeWidth={2} />
                 </button>

                 {/* Wishlist (Desktop Only) */}
                 <button 
                   className="hidden md:flex relative p-1 text-[#990000] hover:scale-105 transition-transform"
                   onClick={onWishlistClick || (() => onNavigate(PageView.USER_LOGIN))}
                   title="Wishlist"
                 >
                   <Heart size={26} strokeWidth={2} />
                   <span className="absolute -top-1 -right-1 bg-[#990000] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">0</span>
                 </button>
                 
                 {/* Profile - Visible on Mobile (Blue circle) */}
                 <div 
                   className="relative group"
                   onMouseEnter={() => setIsProfileHovered(true)}
                   onMouseLeave={() => setIsProfileHovered(false)}
                 >
                   <button 
                    onClick={() => onNavigate(PageView.USER_LOGIN)}
                    className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                   >
                      <User size={18} fill="currentColor" className="text-blue-500 md:w-[22px] md:h-[22px]" />
                   </button>

                   {/* Desktop Profile Dropdown */}
                   {isProfileHovered && (
                     <div className="hidden md:block absolute right-0 top-full mt-2 w-56 bg-white shadow-xl border border-gray-100 py-2 z-50 rounded-lg animate-in fade-in zoom-in-95 duration-200">
                       <div className="px-4 py-2 border-b border-gray-100 mb-1">
                          <p className="text-xs text-gray-500">Welcome</p>
                          <p className="text-sm font-bold text-gray-800">Guest User</p>
                       </div>
                       <button onClick={() => { setIsProfileHovered(false); onNavigate(PageView.USER_LOGIN); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                         <LogIn size={16} /> Sign in
                       </button>
                       <button onClick={() => { setIsProfileHovered(false); onNavigate(PageView.SIGN_UP); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                         <UserPlus size={16} /> Sign up
                       </button>
                     </div>
                   )}
                 </div>

                 {/* Cart Area */}
                 <div 
                   className="relative z-50"
                   onMouseEnter={() => setIsCartHovered(true)}
                   onMouseLeave={() => setIsCartHovered(false)}
                 >
                   <button 
                     onClick={onOpenCart}
                     className="flex items-center gap-3 group h-full"
                   >
                     <div className="relative text-[#990000]">
                        <ShoppingCart size={24} strokeWidth={2} className="md:w-[26px] md:h-[26px]" />
                        <span className="absolute -top-1.5 -right-1.5 md:-top-1 md:-right-1 bg-[#990000] text-white text-[9px] md:text-[10px] w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">
                          {cartCount}
                        </span>
                     </div>
                     <div className="hidden xl:flex flex-col text-left leading-none gap-1">
                       <span className="text-[12px] text-gray-500">My cart</span>
                       <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-gray-900">₹0.00</span>
                          <ChevronDown size={10} className="text-gray-500" />
                       </div>
                     </div>
                   </button>

                   {/* Mini Cart Hover Dropdown */}
                   {isCartHovered && (
                     <div className="absolute top-full right-0 w-[300px] bg-white shadow-[0_5px_15px_rgba(0,0,0,0.1)] rounded-b-md z-[100] border-t border-gray-100 animate-in fade-in slide-in-from-top-1 duration-150">
                        {/* Header */}
                        <div className="bg-[#f0f8ff] p-3 flex items-center gap-2 border-b border-blue-50">
                             <ShoppingCart size={16} className="text-[#0056b3]" fill="currentColor" />
                             <span className="text-[#0056b3] font-medium text-sm">Shopping Cart</span>
                        </div>
                        {/* Body */}
                        <div className="p-8 flex flex-col items-center justify-center">
                            {cartCount === 0 ? (
                                <>
                                    <div className="relative mb-3">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                           <ShoppingBag size={40} className="text-gray-300" fill="#e5e7eb" />
                                        </div>
                                        <div className="absolute top-0 right-0 bg-gray-300 rounded-full p-0.5 border-2 border-white">
                                           <Plus size={10} className="text-white" />
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm">Your Cart Is Empty!</p>
                                </>
                            ) : (
                                 <div className="text-center w-full">
                                    <p className="text-gray-600 mb-4">{cartCount} Item(s)</p>
                                    <button 
                                      onClick={() => onOpenCart()}
                                      className="bg-[#990000] text-white px-4 py-2 rounded-sm text-xs font-bold uppercase w-full hover:bg-red-800 transition-colors"
                                    >
                                      View Cart
                                    </button>
                                 </div>
                            )}
                        </div>
                     </div>
                   )}
                 </div>

              </div>

            </div>
          </div>

          {/* Mobile Search Bar (Expandable) */}
          {isMobileSearchOpen && (
            <div className="md:hidden px-4 pb-3 mt-2 animate-in slide-in-from-top-2 duration-200">
              <div className="flex w-full relative">
                  <input 
                    type="text" 
                    placeholder="Search for items..." 
                    className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-gray-700 text-sm h-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-[#990000]" onClick={() => {/* trigger search */}}>
                    <Search size={18} />
                  </button>
              </div>
              {/* Suggestions (Mobile) */}
              {searchTerm && suggestions.length > 0 && (
                  <div className="mt-1 bg-white shadow-lg rounded border border-gray-100 max-h-[300px] overflow-y-auto">
                    {suggestions.map((product) => (
                      <div 
                        key={product.id}
                        className="px-4 py-3 border-b border-gray-50 last:border-0 flex items-center gap-3"
                        onClick={() => handleSearchSelect(product)}
                      >
                         <img src={product.image} className="w-8 h-8 rounded object-cover" />
                         <span className="text-sm text-gray-700 truncate">{product.name}</span>
                      </div>
                    ))}
                  </div>
              )}
            </div>
          )}
        </div>

        {/* Red Navigation Bar - NO LONGER STICKY */}
        <div className="hidden md:block bg-[#990000] text-white shadow-md z-40">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-[52px] flex items-center justify-between">
            
            {/* Categories Button with DROPDOWN */}
            <div 
              className="h-[52px] flex items-center relative group/categories"
              onMouseEnter={() => setIsCategoryMenuOpen(true)}
              onMouseLeave={() => { setIsCategoryMenuOpen(false); setActiveCategory(null); }}
            >
              <div className="bg-white text-[#990000] h-[40px] px-5 flex items-center gap-3 font-bold text-sm tracking-wide cursor-pointer rounded-sm relative z-50">
                <Grid size={18} />
                <span className="uppercase">Categories</span>
                <ChevronDown size={16} className="ml-4 transition-transform group-hover/categories:rotate-180" />
              </div>
              
              {/* DROPDOWN MENU */}
              {isCategoryMenuOpen && renderCategoryDropdown()}
            </div>

            {/* Nav Links */}
            <div className="flex-1 flex items-center justify-start pl-6 gap-2">
              <button onClick={() => onNavigate(PageView.HOME)} className="px-4 py-2 hover:bg-white/10 rounded transition-colors text-[14px] font-medium whitespace-nowrap">Home</button>
              <button onClick={() => onNavigate(PageView.SHOP)} className="px-4 py-2 hover:bg-white/10 rounded transition-colors text-[14px] font-medium whitespace-nowrap">Discounted Products</button>
              
              <div className="relative group">
                <button className="px-4 py-2 hover:bg-white/10 rounded transition-colors text-[14px] font-medium whitespace-nowrap flex items-center gap-1 group-hover:text-white">
                  Vendor Zone <ChevronDown size={14} className="opacity-80" />
                </button>
                <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-b-md hidden group-hover:block z-50 py-2 border-t-4 border-[#990000] animate-in fade-in slide-in-from-top-2 duration-200">
                   <button onClick={() => onNavigate(PageView.SELL_WITH_FABRIMA)} className="block w-full text-left px-5 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#990000] transition-colors border-b border-gray-50">Sell With TheFabrima</button>
                   <button onClick={() => onNavigate(PageView.VENDOR_LOGIN)} className="block w-full text-left px-5 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#990000] transition-colors">Vendor Login</button>
                </div>
              </div>

              <button onClick={() => onNavigate(PageView.CONTACT)} className="px-4 py-2 hover:bg-white/10 rounded transition-colors text-[14px] font-medium whitespace-nowrap">Contact Us</button>
            </div>
            
            {/* Right Side Support (Optional based on space) */}
            <div className="hidden lg:flex items-center gap-6 text-xs font-medium text-white/90">
                <div className="flex items-center gap-2">
                    <Phone size={14} /> <span>+91 93551 00885</span>
                </div>
            </div>

          </div>
        </div>
      </div>

      {/* STICKY WHITE HEADER (On Scroll) */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-white shadow-md z-[100] transition-transform duration-300 ease-in-out hidden md:block ${
          isSticky ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-2 flex items-center justify-between gap-4 h-[65px]">
           {/* Logo (Small) */}
           <div 
             className="flex items-center gap-2 cursor-pointer shrink-0"
             onClick={() => onNavigate(PageView.HOME)}
           >
              <div className="w-7 h-5 relative">
                 <div className="absolute inset-0 bg-[#990000] rounded-tl-lg rounded-br-lg transform skew-x-[-10deg]"></div>
                 <div className="absolute inset-0 flex items-center justify-center text-white font-serif font-bold text-base italic pr-0.5">F</div>
              </div>
              <div className="flex flex-col -space-y-0.5">
                 <span className="text-lg font-bold text-gray-900 tracking-tight font-serif">
                   The Fabrima<span className="text-xs font-sans font-normal text-gray-500">.com</span>
                 </span>
                 <span className="text-[8px] text-gray-500 tracking-widest uppercase font-semibold ml-0.5">e-Marketplace</span>
              </div>
           </div>

           {/* Search + Hamburger */}
           <div className="flex-1 max-w-2xl flex items-center gap-3">
              <div className="flex w-full relative group shadow-sm">
                  <input 
                    type="text" 
                    placeholder="Search for items..." 
                    className="w-full bg-white border border-gray-200 rounded-l-md px-4 py-2 focus:outline-none focus:border-[#990000] text-gray-700 placeholder-gray-400 text-sm h-[40px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="bg-[#990000] text-white px-6 rounded-r-md hover:bg-[#7a0000] transition-colors flex items-center justify-center h-[40px]">
                    <Search size={20} />
                  </button>
              </div>
              {/* Mobile Drawer Trigger (Used as Categories/Menu in sticky mode) */}
              <button 
                className="text-[#990000] hover:text-[#7a0000] transition-colors p-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={28} strokeWidth={2.5} />
              </button>
           </div>

           {/* Icons */}
           <div className="flex items-center gap-5">
               <button 
                   className="relative p-1 text-[#990000] hover:scale-105 transition-transform"
                   onClick={onWishlistClick || (() => onNavigate(PageView.USER_LOGIN))}
                 >
                   <Heart size={26} strokeWidth={2} />
                   <span className="absolute -top-1 -right-1 bg-[#990000] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white font-bold">0</span>
               </button>

               <button 
                    onClick={() => onNavigate(PageView.USER_LOGIN)}
                    className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                   >
                      <User size={20} fill="currentColor" className="text-blue-500" />
               </button>

               <button 
                   onClick={onOpenCart} // Click goes to cart in sticky mode
                   className="flex items-center gap-3 group"
                 >
                   <div className="relative text-[#990000]">
                      <ShoppingCart size={26} strokeWidth={2} />
                      <span className="absolute -top-1 -right-1 bg-[#990000] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white font-bold">
                        {cartCount}
                      </span>
                   </div>
                   <div className="flex flex-col text-left leading-none gap-0.5">
                     <span className="text-[11px] text-gray-500">My cart</span>
                     <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-gray-900">₹0.00</span>
                        <ChevronDown size={10} className="text-gray-500" />
                     </div>
                   </div>
                 </button>
           </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;