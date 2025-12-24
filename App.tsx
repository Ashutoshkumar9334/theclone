

import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import AiStylist from './components/AiStylist';
import SellWithFabrima from './components/SellWithFabrima';
import VendorLogin from './components/VendorLogin';
import UserLogin from './components/UserLogin';
import SignUp from './components/SignUp';
import Contact from './components/Contact';
import CategorySection from './components/CategorySection';
import DealSection from './components/DealSection';
import FeaturedCarousel from './components/FeaturedCarousel';

// Import Data
import { 
  PRODUCTS, 
  CATEGORIES, 
  DEAL_PRODUCTS, 
  LATEST_PRODUCTS, 
  NEW_ARRIVALS, 
  CALENDAR_PRODUCTS, 
  BAGS_TEXTILE_PRODUCTS, 
  STOCK_CLEARANCE_PRODUCTS, 
  AUTOMOBILE_TEXTILES_PRODUCTS, 
  MEDICAL_TEXTILE_PRODUCTS, 
  HOME_FURNISHING_PRODUCTS,
  PRINTED_TEXTILE_PRODUCTS,
  INDUSTRIAL_TEXTILE_PRODUCTS,
  LUGGAGE_AND_BAG_TEXTILE_PRODUCTS
} from './services/mockData';

// Types
import { PageView, Product, CartItem } from './types';
import { ChevronRight, Search, ChevronDown, ListFilter } from 'lucide-react';
import Toast, { ToastMessage } from './components/Toast';

// --- LAZY LOAD COMPONENTS FOR PERFORMANCE ---
// These components will only load when they are about to be needed or in a deferred manner
const NewArrivalsSection = lazy(() => import('./components/NewArrivalsSection'));
const BestSellingTopRated = lazy(() => import('./components/BestSellingTopRated'));
const CalendarLaminationSection = lazy(() => import('./components/CalendarLaminationSection'));
const BagsTextileSection = lazy(() => import('./components/BagsTextileSection'));
const StockClearanceSection = lazy(() => import('./components/StockClearanceSection'));
const AutomobileTextilesSection = lazy(() => import('./components/AutomobileTextilesSection'));
const MedicalTextileSection = lazy(() => import('./components/MedicalTextileSection'));
const HomeFurnishingSection = lazy(() => import('./components/HomeFurnishingSection'));
const PrintedTextileSection = lazy(() => import('./components/PrintedTextileSection'));
const IndustrialTextileSection = lazy(() => import('./components/IndustrialTextileSection'));
const LuggageBagTextileSection = lazy(() => import('./components/LuggageBagTextileSection'));
const FeaturesSection = lazy(() => import('./components/FeaturesSection'));

// Simplified backend simulation using local storage
const loadCart = (): CartItem[] => {
  const saved = localStorage.getItem('fabrima_cart');
  return saved ? JSON.parse(saved) : [];
};

const saveCart = (cart: CartItem[]) => {
  localStorage.setItem('fabrima_cart', JSON.stringify(cart));
};

const LoadingFallback = () => (
  <div className="w-full h-48 bg-gray-50 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-gray-300 font-medium">Loading content...</div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    setCartItems(loadCart());
  }, []);

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    handleNavigate(PageView.SHOP);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    handleNavigate(PageView.PRODUCT);
  };

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleWishlistClick = () => {
    addToast("Login first for next steps");
    handleNavigate(PageView.USER_LOGIN);
  };

  // Filter Products for specific sections to match screenshot
  const bestSellers = [
    NEW_ARRIVALS[3], // URI Rexine
    NEW_ARRIVALS[5], // Silver Foil
    NEW_ARRIVALS[6], // Bajra Tricot
    NEW_ARRIVALS[7], // Heavy Twill (Rose)
    NEW_ARRIVALS[2], // Unicorn
    NEW_ARRIVALS[1], // Science
  ].filter(Boolean); // Safety check

  const topRated = [
    NEW_ARRIVALS[4], // PU Coated Blue (-10%)
    NEW_ARRIVALS[1], // Science Pattern
    NEW_ARRIVALS[0], // Abstract
    NEW_ARRIVALS[2], // Unicorn
  ].filter(Boolean);

  // Featured products (using a subset of products)
  const featuredProducts = PRODUCTS.slice(0, 10);

  const renderHome = () => (
    <>
      <div className="pt-6">
        <Hero 
           onShopNow={() => handleNavigate(PageView.SHOP)} 
           onCategorySelect={handleCategorySelect}
        />
      </div>

      {/* Featured Products Section - Keep Eager for Above Fold */}
      <section className="pt-8 px-4 md:px-6 max-w-[1400px] mx-auto">
        <FeaturedCarousel 
           products={featuredProducts} 
           onProductClick={handleProductSelect}
           onViewAll={() => handleNavigate(PageView.SHOP)}
        />
      </section>

      {/* Categories Section - Keep Eager */}
      <section className="pt-8 px-4 md:px-6 max-w-[1400px] mx-auto">
        <CategorySection 
          onCategorySelect={handleCategorySelect}
          onViewAll={() => handleNavigate(PageView.SHOP)}
        />
      </section>

      {/* Deal of the Day & Latest Products Section - Keep Eager */}
      <section className="py-6 px-4 md:px-6 max-w-[1400px] mx-auto">
        <DealSection 
           dealProducts={DEAL_PRODUCTS}
           latestProducts={LATEST_PRODUCTS}
           onProductClick={handleProductSelect}
           onViewAll={() => handleNavigate(PageView.SHOP)}
        />
      </section>

      {/* Lazy Loaded Sections Below Fold */}
      <Suspense fallback={<div className="max-w-[1400px] mx-auto px-4 py-8"><LoadingFallback /></div>}>
        
        {/* New Arrivals Section */}
        <section className="pb-6 px-4 md:px-6 max-w-[1400px] mx-auto">
          <NewArrivalsSection 
             products={NEW_ARRIVALS}
             onProductClick={handleProductSelect}
          />
        </section>

        {/* Best Sellings & Top Rated Section */}
        <section className="pb-6 px-4 md:px-6 max-w-[1400px] mx-auto">
          <BestSellingTopRated 
             bestSellers={bestSellers}
             topRated={topRated}
             onProductClick={handleProductSelect}
             onViewAll={() => handleNavigate(PageView.SHOP)}
          />
        </section>

        {/* Calendar & Lamination Section */}
        <section className="pb-6 px-4 md:px-6 max-w-[1400px] mx-auto">
          <CalendarLaminationSection 
             products={CALENDAR_PRODUCTS}
             onProductClick={handleProductSelect}
             onViewAll={() => handleNavigate(PageView.SHOP)}
          />
        </section>

        {/* Bags Textile Section */}
        <section className="pb-6 px-4 md:px-6 max-w-[1400px] mx-auto">
          <BagsTextileSection 
             products={BAGS_TEXTILE_PRODUCTS}
             onProductClick={handleProductSelect}
             onViewAll={() => handleNavigate(PageView.SHOP)}
          />
        </section>

        {/* Stock Clearance Section */}
        <section className="pb-6 px-4 md:px-6 max-w-[1400px] mx-auto">
          <StockClearanceSection 
             products={STOCK_CLEARANCE_PRODUCTS}
             onProductClick={handleProductSelect}
             onViewAll={() => handleNavigate(PageView.SHOP)}
          />
        </section>

        {/* Automobile Textiles Section */}
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto">
          <AutomobileTextilesSection 
             products={AUTOMOBILE_TEXTILES_PRODUCTS}
             onProductClick={handleProductSelect}
             onViewAll={() => handleNavigate(PageView.SHOP)}
          />
        </section>

        {/* Medical Textile Section */}
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto">
          <MedicalTextileSection 
             products={MEDICAL_TEXTILE_PRODUCTS}
             onProductClick={handleProductSelect}
             onViewAll={() => handleNavigate(PageView.SHOP)}
          />
        </section>

        {/* Home Furnishing Textile Section */}
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto">
          <HomeFurnishingSection 
             products={HOME_FURNISHING_PRODUCTS}
             onProductClick={handleProductSelect}
             onViewAll={() => handleNavigate(PageView.SHOP)}
          />
        </section>

        {/* Printed Textile Section */}
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto">
          <PrintedTextileSection 
             products={PRINTED_TEXTILE_PRODUCTS}
             onProductClick={handleProductSelect}
             onViewAll={() => handleNavigate(PageView.SHOP)}
          />
        </section>

        {/* Industrial Textile Section */}
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto">
          <IndustrialTextileSection 
             products={INDUSTRIAL_TEXTILE_PRODUCTS}
             onProductClick={handleProductSelect}
             onViewAll={() => handleNavigate(PageView.SHOP)}
          />
        </section>

        {/* Luggage & Bag Textile Section */}
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto">
          <LuggageBagTextileSection 
             products={LUGGAGE_AND_BAG_TEXTILE_PRODUCTS}
             onProductClick={handleProductSelect}
             onViewAll={() => handleNavigate(PageView.SHOP)}
          />
        </section>

        {/* Features Section (New) */}
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto">
          <FeaturesSection />
        </section>

      </Suspense>
    </>
  );

  const renderShop = () => {
    const filteredProducts = PRODUCTS.filter(p => selectedCategory === 'All' || p.category === selectedCategory);
    
    return (
      <div className="py-8 px-4 md:px-6 max-w-[1400px] mx-auto min-h-screen bg-[#f9f9f9]">
        
        {/* Page Header */}
        <div className="bg-white p-4 border border-gray-200 rounded-sm mb-6 flex flex-col md:flex-row justify-between items-center shadow-sm">
           <div className="mb-4 md:mb-0 w-full md:w-auto">
             <h1 className="text-xl font-bold text-gray-800">Discounted Products</h1>
             <span className="text-sm text-gray-500">{filteredProducts.length} Items found</span>
           </div>
           
           <div className="flex items-center gap-2 w-full md:w-auto justify-end">
             <div className="relative border border-gray-200 rounded-sm bg-white px-3 py-1.5 flex items-center gap-2 min-w-[200px] justify-between">
                <div className="flex items-center gap-2">
                    <ListFilter size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-500">Sort by</span>
                </div>
                <select className="border-none bg-transparent font-medium text-gray-700 focus:outline-none text-sm cursor-pointer appearance-none pr-6 text-right">
                  <option>Latest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <ChevronDown size={14} className="text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
             </div>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-[270px] shrink-0 space-y-6">
             
             {/* Filter Box */}
             <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm">
                <h3 className="font-bold text-center text-gray-800 mb-2 text-[15px] relative">
                    Filter
                    <div className="w-8 h-[2px] bg-gray-200 mx-auto mt-2"></div>
                </h3>
                
                {/* Choose Dropdown */}
                <div className="mb-6 mt-6">
                   <div className="relative">
                      <select className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-[#990000] appearance-none bg-white">
                        <option>Choose</option>
                      </select>
                      <ChevronDown size={16} className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                   </div>
                </div>

                {/* Price Filter */}
                <div className="mb-8">
                  <h4 className="text-center text-sm font-bold text-gray-800 mb-4">Price</h4>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="0" className="w-full border border-blue-200 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:border-blue-400 text-gray-600" />
                    <span className="text-gray-500 text-xs">To</span>
                    <input type="number" placeholder="100" className="w-full border border-blue-200 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:border-blue-400 text-gray-600" />
                    <button className="bg-[#2563eb] text-white p-2 rounded hover:bg-blue-700 transition-colors shrink-0 flex items-center justify-center w-8 h-8">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h4 className="text-center text-sm font-bold text-gray-800 mb-4">Brands</h4>
                  <div className="relative mb-4">
                    <input 
                      type="text" 
                      placeholder="Search by brands" 
                      className="w-full border border-blue-200 rounded px-3 py-2.5 pl-3 pr-8 text-sm focus:outline-none focus:border-blue-400 placeholder:text-gray-400"
                    />
                    <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  
                  <div className="max-h-40 overflow-y-auto custom-scrollbar">
                      <div className="flex justify-between items-center text-sm text-gray-600 hover:text-[#990000] cursor-pointer py-1 group">
                        <span className="group-hover:text-[#990000] transition-colors">The Fabrima</span>
                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs font-medium group-hover:bg-red-50 group-hover:text-[#990000] transition-colors">1103</span>
                      </div>
                  </div>
                </div>
             </div>

             {/* Categories Box */}
             <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm">
                <h3 className="font-bold text-center text-gray-800 mb-6 text-[15px]">Categories</h3>
                <div className="flex flex-col space-y-1">
                   <div 
                        className={`text-sm cursor-pointer transition-colors flex items-center justify-between px-2 py-2.5 rounded-sm ${selectedCategory === 'All' ? 'bg-red-50 text-[#990000] font-medium' : 'text-gray-600 hover:text-[#990000] hover:bg-gray-50'}`}
                        onClick={() => setSelectedCategory('All')}
                      >
                        <span>All Categories</span>
                   </div>
                   {CATEGORIES.map(c => (
                      <div 
                        key={c}
                        className={`text-sm cursor-pointer transition-colors flex items-center justify-between px-2 py-2.5 rounded-sm border-b border-gray-50 last:border-0 ${selectedCategory === c ? 'bg-red-50 text-[#990000] font-medium' : 'text-gray-600 hover:text-[#990000] hover:bg-gray-50'}`}
                        onClick={() => setSelectedCategory(c)}
                      >
                        <span>{c}</span>
                        <ChevronRight size={14} className="text-gray-400" />
                      </div>
                   ))}
                </div>
             </div>

          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                    onClick={handleProductSelect}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProduct = () => {
    if (!selectedProduct) return renderShop();
    
    return (
      <div className="py-8 px-4 md:px-6 max-w-[1400px] mx-auto min-h-screen">
         <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
           <span className="cursor-pointer hover:text-primary" onClick={() => handleNavigate(PageView.HOME)}>Home</span>
           <ChevronRight size={12} />
           <span className="cursor-pointer hover:text-primary" onClick={() => handleNavigate(PageView.SHOP)}>Shop</span>
           <ChevronRight size={12} />
           <span className="text-gray-800">{selectedProduct.name}</span>
         </div>
         
         <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {/* Image */}
             <div className="aspect-square bg-gray-50 border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-8">
               <img 
                 src={selectedProduct.image} 
                 alt={selectedProduct.name} 
                 className="w-full h-full object-contain mix-blend-multiply"
               />
             </div>

             {/* Info */}
             <div className="flex flex-col">
               <div className="mb-2 text-primary font-medium text-sm">{selectedProduct.category}</div>
               <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
               <div className="text-sm text-gray-500 mb-4">Brand: <span className="text-blue-600">{selectedProduct.brand}</span></div>
               
               <div className="flex items-center gap-4 mb-6">
                 {selectedProduct.discount && (
                   <span className="bg-red-100 text-[#990000] px-2 py-1 rounded text-xs font-bold">-{selectedProduct.discount}% Off</span>
                 )}
                 <span className="text-3xl font-bold text-primary">
                    ₹{(selectedProduct.price * 83 * (1 - (selectedProduct.discount || 0)/100)).toFixed(2)}
                 </span>
                 {selectedProduct.discount && (
                   <span className="text-lg text-gray-400 line-through">₹{(selectedProduct.price * 83).toFixed(2)}</span>
                 )}
               </div>
               
               <div className="prose prose-sm text-gray-600 mb-8">
                 <p>{selectedProduct.description}</p>
                 <ul className="mt-4 space-y-2">
                    <li><strong>Material:</strong> {selectedProduct.material}</li>
                    <li><strong>MOQ:</strong> 100 Meters</li>
                    <li><strong>Availability:</strong> Immediate Dispatch</li>
                 </ul>
               </div>

               <div className="flex gap-4 mt-auto">
                 <div className="w-24 border border-gray-300 rounded flex items-center justify-center">
                    <input type="number" defaultValue="1" min="1" className="w-full h-full text-center focus:outline-none" />
                 </div>
                 <button 
                   onClick={() => addToCart(selectedProduct)}
                   className="flex-1 bg-primary text-white py-4 rounded font-bold hover:bg-red-800 transition-colors uppercase tracking-wide"
                 >
                   Add to Cart
                 </button>
               </div>
             </div>
           </div>
         </div>
      </div>
    );
  };

  return (
    <div className="font-sans antialiased text-gray-800 selection:bg-red-100 relative">
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        onProductSelect={handleProductSelect}
        onWishlistClick={handleWishlistClick}
      />
      
      <main className="bg-[#f8f9fa] min-h-screen">
        {currentPage === PageView.HOME && renderHome()}
        {currentPage === PageView.SHOP && renderShop()}
        {currentPage === PageView.PRODUCT && renderProduct()}
        {currentPage === PageView.CONTACT && <Contact />}
        {currentPage === PageView.ABOUT && <Contact />} 
        {currentPage === PageView.SELL_WITH_FABRIMA && <SellWithFabrima onNavigate={handleNavigate} />}
        {currentPage === PageView.VENDOR_LOGIN && <VendorLogin />}
        {currentPage === PageView.USER_LOGIN && <UserLogin />}
        {currentPage === PageView.SIGN_UP && <SignUp onNavigate={handleNavigate} />}
      </main>

      <Footer />
      
      <Toast toasts={toasts} />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-24 right-8 z-40 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
           <path d="M12.0316 0C5.39673 0 0 5.38555 0 12.0044C0 14.2373 0.60623 16.3268 1.66031 18.1256L0.09375 24L6.18281 22.3888C7.90781 23.3828 9.91406 23.9109 12.0295 23.9109H12.0342C18.6691 23.9109 24.0658 18.5253 24.0658 11.9064C24.0658 8.72504 22.8316 5.73352 20.5898 3.48312C18.3481 1.23271 15.352 0 12.0316 0ZM12.0342 21.8953C10.2248 21.8953 8.45531 21.4086 6.90656 20.4883L6.53859 20.2694L2.925 21.2238L3.89062 17.6894L3.65156 17.3082C2.65172 15.7145 2.12484 13.8864 2.12484 12.0069C2.12484 6.5492 6.57047 2.10984 12.0394 2.10984C14.6855 2.10984 17.1722 3.13961 19.043 5.0182C20.9138 6.89679 21.9436 9.38953 21.941 12.0356C21.941 17.4933 17.4954 21.8953 12.0342 21.8953ZM17.4778 15.0211C17.1797 14.8722 15.7148 14.1511 15.4411 14.0514C15.1673 13.9517 14.9681 13.9019 14.7694 14.2007C14.5706 14.4994 14.0002 15.1706 13.8263 15.3698C13.6523 15.5691 13.4784 15.594 13.1803 15.4446C12.8822 15.2952 11.9217 14.9813 10.7831 13.965C9.89766 13.1752 9.29953 12.1993 9.12562 11.9006C8.95172 11.6019 9.10688 11.4406 9.25641 11.2917C9.39094 11.1578 9.55594 10.9415 9.705 10.7673C9.85406 10.5931 9.90375 10.4687 10.0031 10.2694C10.1025 10.0702 10.0528 9.89602 9.97828 9.74664C9.90375 9.59727 9.3075 8.12871 9.05859 7.53117C8.81859 6.95355 8.57531 7.03066 8.39641 7.0223L7.82484 7.01992C7.62609 7.01992 7.30313 7.09457 7.02938 7.39332C6.75563 7.69207 5.98547 8.41406 5.98547 9.88293C5.98547 11.3518 7.05422 12.771 7.20328 12.9702C7.35234 13.1694 9.26766 16.1243 12.2006 17.3916C12.8986 17.693 13.4433 17.8724 13.8694 18.0076C14.5678 18.2295 15.2077 18.1973 15.7134 18.1216C16.2759 18.0374 17.4431 17.4146 17.6916 16.7176C17.94 16.0205 17.94 15.4231 17.8655 15.2987C17.7909 15.1743 17.5922 15.1207 17.2941 14.9713H17.4778Z"/>
        </svg>
      </a>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <AiStylist />
    </div>
  );
};

export default App;
