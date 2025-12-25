
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import AiStylist from './components/AiStylist';
import WhatsAppIcon from './components/WhatsAppIcon';
import SellWithFabrima from './components/SellWithFabrima';
import VendorLogin from './components/VendorLogin';
import UserLogin from './components/UserLogin';
import SignUp from './components/SignUp';
import Contact from './components/Contact';
import CategorySection from './components/CategorySection';
import DealSection from './components/DealSection';
import FeaturedCarousel from './components/FeaturedCarousel';
import Toast, { ToastMessage } from './components/Toast';
import ZomatoPartner from './components/ZomatoPartner';

// Import Data
import { 
  PRODUCTS, 
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

// LAZY COMPONENTS
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

const loadCart = (): CartItem[] => {
  const saved = localStorage.getItem('fabrima_cart');
  return saved ? JSON.parse(saved) : [];
};

const saveCart = (cart: CartItem[]) => {
  localStorage.setItem('fabrima_cart', JSON.stringify(cart));
};

const LuxuryPreloader = () => (
  <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center animate-out fade-out duration-1000 fill-mode-forwards">
    <div className="w-24 h-20 relative mb-4">
      <div className="absolute inset-0 bg-[#990000] rounded-tl-3xl rounded-br-3xl transform skew-x-[-10deg] animate-pulse"></div>
      <div className="absolute inset-0 flex items-center justify-center text-white font-serif font-bold text-4xl italic">F</div>
    </div>
    <div className="h-0.5 w-48 bg-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#990000] animate-progress-indefinite"></div>
    </div>
    <style>{`
      @keyframes progress-indefinite {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .animate-progress-indefinite {
        animation: progress-indefinite 1.5s infinite linear;
      }
    `}</style>
  </div>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    setCartItems(loadCart());
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
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
    addToast(`${product.name.substring(0, 20)}... added to cart`);
  };

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    handleNavigate(PageView.PRODUCT);
  };

  const featuredProducts = PRODUCTS.slice(0, 10);
  const bestSellers = NEW_ARRIVALS.slice(0, 6);
  const topRated = NEW_ARRIVALS.slice(4, 8);

  const renderHome = () => (
    <>
      <div className="pt-6">
        <Hero 
           onShopNow={() => handleNavigate(PageView.SHOP)} 
           onCategorySelect={(cat) => { setSelectedCategory(cat); handleNavigate(PageView.SHOP); }}
        />
      </div>

      <section className="pt-8 px-4 md:px-6 max-w-[1400px] mx-auto">
        <FeaturedCarousel products={featuredProducts} onProductClick={handleProductSelect} onViewAll={() => handleNavigate(PageView.SHOP)} />
      </section>

      <section className="pt-8 px-4 md:px-6 max-w-[1400px] mx-auto">
        <CategorySection onCategorySelect={(cat) => { setSelectedCategory(cat); handleNavigate(PageView.SHOP); }} onViewAll={() => handleNavigate(PageView.SHOP)} />
      </section>

      <section className="py-6 px-4 md:px-6 max-w-[1400px] mx-auto">
        <DealSection dealProducts={DEAL_PRODUCTS} latestProducts={LATEST_PRODUCTS} onProductClick={handleProductSelect} onViewAll={() => handleNavigate(PageView.SHOP)} />
      </section>

      <Suspense fallback={<div className="h-48 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-xs">Unfolding Excellence...</div>}>
        <section className="pb-6 px-4 md:px-6 max-w-[1400px] mx-auto"><NewArrivalsSection products={NEW_ARRIVALS} onProductClick={handleProductSelect} /></section>
        <section className="pb-6 px-4 md:px-6 max-w-[1400px] mx-auto"><BestSellingTopRated bestSellers={bestSellers} topRated={topRated} onProductClick={handleProductSelect} onViewAll={() => handleNavigate(PageView.SHOP)} /></section>
        <section className="pb-6 px-4 md:px-6 max-w-[1400px] mx-auto"><CalendarLaminationSection products={CALENDAR_PRODUCTS} onProductClick={handleProductSelect} onViewAll={() => handleNavigate(PageView.SHOP)} /></section>
        <section className="pb-6 px-4 md:px-6 max-w-[1400px] mx-auto"><BagsTextileSection products={BAGS_TEXTILE_PRODUCTS} onProductClick={handleProductSelect} onViewAll={() => handleNavigate(PageView.SHOP)} /></section>
        <section className="pb-6 px-4 md:px-6 max-w-[1400px] mx-auto"><StockClearanceSection products={STOCK_CLEARANCE_PRODUCTS} onProductClick={handleProductSelect} onViewAll={() => handleNavigate(PageView.SHOP)} /></section>
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto"><AutomobileTextilesSection products={AUTOMOBILE_TEXTILES_PRODUCTS} onProductClick={handleProductSelect} onViewAll={() => handleNavigate(PageView.SHOP)} /></section>
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto"><MedicalTextileSection products={MEDICAL_TEXTILE_PRODUCTS} onProductClick={handleProductSelect} onViewAll={() => handleNavigate(PageView.SHOP)} /></section>
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto"><HomeFurnishingSection products={HOME_FURNISHING_PRODUCTS} onProductClick={handleProductSelect} onViewAll={() => handleNavigate(PageView.SHOP)} /></section>
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto"><PrintedTextileSection products={PRINTED_TEXTILE_PRODUCTS} onProductClick={handleProductSelect} onViewAll={() => handleNavigate(PageView.SHOP)} /></section>
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto"><IndustrialTextileSection products={INDUSTRIAL_TEXTILE_PRODUCTS} onProductClick={handleProductSelect} onViewAll={() => handleNavigate(PageView.SHOP)} /></section>
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto"><LuggageBagTextileSection products={LUGGAGE_AND_BAG_TEXTILE_PRODUCTS} onProductClick={handleProductSelect} onViewAll={() => handleNavigate(PageView.SHOP)} /></section>
        <section className="pb-8 px-4 md:px-6 max-w-[1400px] mx-auto"><FeaturesSection /></section>
      </Suspense>
    </>
  );

  return (
    <div className="font-sans antialiased text-gray-800 selection:bg-red-100 relative bg-[#f9f9f9]">
      {isLoading && <LuxuryPreloader />}
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        onProductSelect={handleProductSelect}
      />
      <main className="min-h-screen">
        {currentPage === PageView.HOME && renderHome()}
        {currentPage === PageView.SHOP && (
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading Shop...</div>}>
            <div className="py-8 px-4 md:px-6 max-w-[1400px] mx-auto min-h-screen">
               <div className="bg-white p-4 border border-gray-200 rounded-sm mb-6 flex flex-col md:flex-row justify-between items-center shadow-sm">
                  <h1 className="text-xl font-bold text-gray-800">Shop Fashion & Fabrics</h1>
                  <span className="text-sm text-gray-500">Browsing: {selectedCategory}</span>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {PRODUCTS.filter(p => selectedCategory === 'All' || p.category === selectedCategory).map(p => (
                   <ProductCard key={p.id} product={p} onAddToCart={addToCart} onClick={handleProductSelect} />
                 ))}
               </div>
            </div>
          </Suspense>
        )}
        {currentPage === PageView.PRODUCT && selectedProduct && (
          <div className="py-12 px-4 max-w-[1400px] mx-auto">
             <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col md:flex-row gap-12">
               <div className="w-full md:w-1/2 aspect-square bg-gray-50 flex items-center justify-center p-8 border border-gray-100">
                  <img src={selectedProduct.image} className="max-w-full max-h-full object-contain mix-blend-multiply" />
               </div>
               <div className="flex-1">
                  <span className="text-primary font-bold uppercase tracking-widest text-xs">{selectedProduct.category}</span>
                  <h1 className="text-4xl font-serif text-gray-900 mt-2 mb-4">{selectedProduct.name}</h1>
                  <div className="text-2xl font-bold text-gray-900 mb-6">₹{(selectedProduct.price * 83).toFixed(2)}</div>
                  <p className="text-gray-600 leading-relaxed mb-8">{selectedProduct.description}</p>
                  <button onClick={() => addToCart(selectedProduct)} className="bg-primary text-white px-12 py-4 rounded-full font-bold hover:bg-red-800 transition-all uppercase tracking-widest">Add to Cart</button>
               </div>
             </div>
          </div>
        )}
        {currentPage === PageView.ZOMATO_PARTNER && <ZomatoPartner />}
        {currentPage === PageView.SELL_WITH_FABRIMA && <SellWithFabrima onNavigate={handleNavigate} />}
        {currentPage === PageView.VENDOR_LOGIN && <VendorLogin />}
        {currentPage === PageView.USER_LOGIN && <UserLogin />}
        {currentPage === PageView.SIGN_UP && <SignUp onNavigate={handleNavigate} />}
        {currentPage === PageView.CONTACT && <Contact />}
      </main>
      <Footer />
      <Toast toasts={toasts} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} onUpdateQuantity={(id, d) => setCartItems(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + d)} : i))} onRemove={id => setCartItems(prev => prev.filter(i => i.id !== id))} />
      <AiStylist />
      <WhatsAppIcon />
    </div>
  );
};

export default App;
