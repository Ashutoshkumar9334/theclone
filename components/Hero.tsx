import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CATEGORIES } from '../services/mockData';

interface HeroProps {
  onShopNow: () => void;
  onCategorySelect: (category: string) => void;
}

const SLIDES_DATA = [
  {
    id: 1,
    bgImage: 'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=2047&auto=format&fit=crop',
    preTitle: 'New Arrivals',
    title: 'VERSATILE\nFABRICS',
    subtitle: 'For Fashion, Home & Industrial',
    description: [
      'Digital Printed Fabrics, Narrow Woven Fabrics',
      'Belts & Elastics for garments & sportswear',
      'Non-Woven & Printed Carpets, PVC Films',
      'Medical & Geo Textiles for specialized applications'
    ],
    buttonText: 'Shop Now'
  },
  {
    id: 2,
    bgImage: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop', 
    preTitle: 'Heavy Duty',
    title: 'RUGGED\nFABRICS',
    subtitle: 'For Outdoor & Heavy-Duty Applications',
    description: [
      'Tents, Tarpaulins & Non-Woven Materials',
      'Geo Textile Membranes for construction',
      'Durable Synthetic Fabrics for multiple industries'
    ],
    buttonText: 'Shop Now'
  },
  {
    id: 3,
    bgImage: 'https://images.unsplash.com/photo-1572584683823-3b603d1eb3f1?q=80&w=1974&auto=format&fit=crop',
    preTitle: 'Digital Foil Prints',
    title: 'NEW\nARRIVAL',
    subtitle: 'Experience the latest in floral designs',
    description: [],
    buttonText: 'Shop Now'
  }
];

const Hero: React.FC<HeroProps> = ({ onShopNow, onCategorySelect }) => {
  const slides = [SLIDES_DATA[SLIDES_DATA.length - 1], ...SLIDES_DATA, SLIDES_DATA[0]];
  
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const startSlideTimer = () => {
    stopSlideTimer();
    slideInterval.current = setInterval(() => {
       moveSlide('next');
    }, 5000);
  };

  const stopSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  useEffect(() => {
    startSlideTimer();
    return () => stopSlideTimer();
  }, []);

  const moveSlide = (direction: 'next' | 'prev') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    if (direction === 'next') {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === 0) {
      setCurrentIndex(slides.length - 2);
    } else if (currentIndex === slides.length - 1) {
      setCurrentIndex(1);
    }
  };

  const handleMouseEnter = () => stopSlideTimer();
  const handleMouseLeave = () => startSlideTimer();

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-auto md:h-[500px] lg:h-[450px]">
      <div className="flex flex-col md:flex-row h-full gap-6">
        
        {/* Sidebar Menu - Desktop */}
        <aside className="hidden md:block w-64 bg-white border border-gray-200 h-full overflow-y-auto shrink-0 shadow-sm relative z-10 rounded-lg">
          <ul>
            {CATEGORIES.map((category, index) => (
              <li 
                key={index}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onCategorySelect(category)}
              >
                <div className="flex items-center justify-between px-4 py-3.5 text-sm text-gray-700 hover:text-primary">
                  <span>{category}</span>
                  <ChevronRight size={14} className="text-gray-400" />
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Hero Slider */}
        <main 
          className="flex-1 min-h-[400px] md:h-full relative group overflow-hidden bg-gray-100 rounded-lg shadow-sm border border-gray-100"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
             className="flex h-full w-full"
             style={{ 
               transform: `translateX(-${currentIndex * 100}%)`,
               transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
             }}
             onTransitionEnd={handleTransitionEnd}
          >
             {slides.map((slide, index) => (
               <div key={index} className="min-w-full h-full relative">
                 {/* Background Image - Proper visibility using object-cover */}
                 <div 
                   className="absolute inset-0 bg-cover bg-center md:bg-right lg:bg-center"
                   style={{ backgroundImage: `url("${slide.bgImage}")` }}
                 />
                 
                 {/* Gradient Overlay for high contrast on all devices */}
                 <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 md:via-white/80 to-transparent" />

                 {/* Content - Fully Responsive Font Sizes */}
                 <div className="relative z-20 h-full flex flex-col justify-center px-6 md:pl-16 lg:pl-20 max-w-[90%] md:max-w-xl">
                   {slide.preTitle && (
                     <h3 className="text-primary font-bold tracking-widest mb-2 uppercase text-[10px] md:text-xs lg:text-sm animate-in slide-in-from-left-4 fade-in duration-700 delay-100">
                       {slide.preTitle}
                     </h3>
                   )}
                   
                   <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-3 md:mb-4 leading-[1.1] tracking-tight animate-in slide-in-from-left-8 fade-in duration-700 delay-200">
                     <span className="text-primary">{slide.title.split('\n')[0]}</span>
                     {slide.title.split('\n')[1] && <><br /><span className="text-gray-800">{slide.title.split('\n')[1]}</span></>}
                   </h1>
                   
                   {slide.subtitle && (
                     <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-medium mb-4 md:mb-6 max-w-full animate-in slide-in-from-left-10 fade-in duration-700 delay-300">
                       {slide.subtitle}
                     </h2>
                   )}
                   
                   {slide.description.length > 0 && (
                     <ul className="list-disc pl-5 text-gray-600 text-xs md:text-sm font-normal mb-8 space-y-1.5 hidden lg:block animate-in slide-in-from-left-12 fade-in duration-700 delay-500">
                        {slide.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                     </ul>
                   )}

                   <button 
                     onClick={onShopNow}
                     className="w-max bg-primary text-white px-6 py-3 md:px-10 md:py-4 rounded-full font-bold shadow-xl hover:bg-red-800 transition-all transform hover:scale-105 active:scale-95 text-xs md:text-sm uppercase tracking-widest animate-in zoom-in fade-in duration-700 delay-700"
                   >
                     {slide.buttonText}
                   </button>
                 </div>
               </div>
             ))}
          </div>

          {/* Navigation Controls - Proper spacing and visibility */}
          <button 
            onClick={(e) => { e.stopPropagation(); moveSlide('prev'); }}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 hover:bg-white border border-gray-200 rounded-full items-center justify-center text-gray-700 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); moveSlide('next'); }}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 hover:bg-white border border-gray-200 rounded-full items-center justify-center text-gray-700 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Improved Dots Indicator for better accessibility */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
            {SLIDES_DATA.map((_, index) => {
              let active = false;
              if (currentIndex === index + 1) active = true;
              if (currentIndex === 0 && index === SLIDES_DATA.length - 1) active = true;
              if (currentIndex === slides.length - 1 && index === 0) active = true;

              return (
                <button
                  key={index}
                  onClick={() => {
                    if (isTransitioning) return;
                    setIsTransitioning(true);
                    setCurrentIndex(index + 1);
                  }}
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-500 shadow-md ${
                    active ? 'bg-primary w-8 md:w-12' : 'bg-gray-300/80 w-1.5 md:w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;