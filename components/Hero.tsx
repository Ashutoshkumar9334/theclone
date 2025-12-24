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
    // Red silky fabric background for "Versatile"
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
    // Tent/Outdoor background for "Rugged"
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
    // Floral pattern background for "New Arrival"
    bgImage: 'https://images.unsplash.com/photo-1572584683823-3b603d1eb3f1?q=80&w=1974&auto=format&fit=crop',
    preTitle: 'Digital Foil Prints',
    title: 'NEW\nARRIVAL',
    subtitle: 'Experience the latest in floral designs',
    description: [], // No list for this slide in video
    buttonText: 'Shop Now'
  }
];

const Hero: React.FC<HeroProps> = ({ onShopNow, onCategorySelect }) => {
  // Clone first and last slides for infinite loop illusion
  // [3, 1, 2, 3, 1]
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
    
    // Check for loop points
    if (currentIndex === 0) {
      // We are at Clone 3 (visual 3), jump to Real 3
      setCurrentIndex(slides.length - 2);
    } else if (currentIndex === slides.length - 1) {
      // We are at Clone 1 (visual 1), jump to Real 1
      setCurrentIndex(1);
    }
  };

  const handleMouseEnter = () => stopSlideTimer();
  const handleMouseLeave = () => startSlideTimer();

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-auto md:h-[450px]">
      <div className="flex flex-col md:flex-row h-full gap-6">
        
        {/* Sidebar Menu - Desktop */}
        <aside className="hidden md:block w-64 bg-white border border-gray-200 h-full overflow-y-auto shrink-0 shadow-sm relative z-10">
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
          className="flex-1 h-full py-0 md:py-0 relative group overflow-hidden bg-gray-100 rounded-lg shadow-sm border border-gray-100"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Slider Track */}
          <div 
             className="flex h-full w-full"
             style={{ 
               transform: `translateX(-${currentIndex * 100}%)`,
               transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
             }}
             onTransitionEnd={handleTransitionEnd}
          >
             {/* Slides */}
             {slides.map((slide, index) => (
               <div 
                 key={index}
                 className="min-w-full h-full relative"
               >
                 {/* Background Image */}
                 <div 
                   className="absolute inset-0 bg-cover bg-center"
                   style={{ 
                     backgroundImage: `url("${slide.bgImage}")`,
                   }}
                 />
                 
                 {/* Gradient Overlay for text readability */}
                 <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />

                 {/* Content */}
                 <div className="relative z-20 h-full flex flex-col justify-center pl-6 md:pl-16 max-w-[95%] md:max-w-xl">
                   {slide.preTitle && (
                     <h3 className="text-[#990000] font-bold tracking-wider mb-1 md:mb-2 uppercase text-[10px] md:text-sm animate-in slide-in-from-left-4 fade-in duration-700 delay-100">
                       {slide.preTitle}
                     </h3>
                   )}
                   
                   <h1 className="text-3xl md:text-6xl font-serif text-gray-900 mb-2 md:mb-4 leading-none tracking-tight animate-in slide-in-from-left-8 fade-in duration-700 delay-200">
                     <span className="text-[#990000]">{slide.title.split('\n')[0]}</span>
                     {slide.title.split('\n')[1] && <><br /><span className="text-gray-800">{slide.title.split('\n')[1]}</span></>}
                   </h1>
                   
                   {slide.subtitle && (
                     <h2 className="text-sm md:text-xl text-gray-700 font-medium mb-3 md:mb-6 max-w-[80%] md:max-w-full animate-in slide-in-from-left-10 fade-in duration-700 delay-300">
                       {slide.subtitle}
                     </h2>
                   )}
                   
                   {slide.description.length > 0 && (
                     <ul className="list-disc pl-5 text-gray-600 text-sm font-normal mb-6 space-y-1 hidden lg:block animate-in slide-in-from-left-12 fade-in duration-700 delay-500">
                        {slide.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                     </ul>
                   )}

                   <button 
                     onClick={onShopNow}
                     className="w-max bg-[#990000] text-white px-5 py-2 md:px-8 md:py-3 rounded-full font-bold shadow-lg hover:bg-red-800 hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-xs md:text-sm uppercase tracking-wider animate-in zoom-in fade-in duration-700 delay-700"
                   >
                     {slide.buttonText}
                   </button>
                 </div>
               </div>
             ))}
          </div>

          {/* Navigation Controls */}
          <button 
            onClick={(e) => { e.stopPropagation(); moveSlide('prev'); }}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full items-center justify-center text-gray-700 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); moveSlide('next'); }}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full items-center justify-center text-gray-700 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {SLIDES_DATA.map((_, index) => {
              // Calculate active state considering the clones
              // real index is currentIndex - 1
              // But currentIndex can be 0 or N+1
              let active = false;
              if (currentIndex === index + 1) active = true; // Normal case
              if (currentIndex === 0 && index === SLIDES_DATA.length - 1) active = true; // Clone Last
              if (currentIndex === slides.length - 1 && index === 0) active = true; // Clone First

              return (
                <button
                  key={index}
                  onClick={() => {
                    if (isTransitioning) return;
                    setIsTransitioning(true);
                    setCurrentIndex(index + 1);
                  }}
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-300 shadow-sm ${
                    active ? 'bg-[#990000] w-6 md:w-8' : 'bg-gray-300 w-1.5 md:w-2 hover:bg-gray-400'
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