
import React from 'react';
import { MapPin, Phone, Mail, ChevronUp, Linkedin, Instagram, Facebook, User } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1f2937] text-white pt-16 relative font-sans text-sm border-t border-gray-700">
      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-24 right-8 z-40 bg-[#990000] p-2.5 rounded shadow-lg hover:bg-red-800 transition-colors hidden md:flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} className="text-white" />
      </button>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        
        {/* Top Grid: Links and Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-6 mb-12">
          
          {/* Column 1: Brand & App */}
          <div className="space-y-6">
            <div className="bg-white w-max p-3 rounded-sm shadow-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-6 bg-[#990000] rounded-tl-lg rounded-br-lg"></div>
                  <div className="flex flex-col -space-y-1">
                    <span className="text-gray-900 font-bold text-lg font-serif tracking-tight">The Fabrima</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest text-right">e-Marketplace</span>
                  </div>
                </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">DELIVERY MAN APP</h4>
              <button className="bg-black border border-gray-600 rounded-md flex items-center gap-3 px-4 py-2 hover:bg-gray-900 transition-colors group">
                <div className="text-[#a4c639] group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M17.523 15.3414C17.523 15.3414 17.5606 15.3414 17.5606 15.3414C17.5606 15.3414 17.5606 15.3414 17.523 15.3414ZM16.0355 12.3785L17.7019 9.50745C17.7876 9.35985 17.7385 9.17175 17.5913 9.08595C17.4441 9.00015 17.2556 9.04925 17.1699 9.19645L15.466 12.131C14.3941 11.642 13.2323 11.3651 12.0002 11.3651C10.7681 11.3651 9.60633 11.642 8.53443 12.131L6.83057 9.19645C6.74483 9.04925 6.55633 9.00015 6.40913 9.08595C6.26193 9.17175 6.21283 9.35985 6.29857 9.50745L7.96497 12.3785C4.30503 14.3403 1.8335 18.1585 1.8335 22.5976H22.1669C22.1669 18.1585 19.6954 14.3403 16.0355 12.3785ZM6.3335 19.3879C5.7812 19.3879 5.3335 18.9402 5.3335 18.3879C5.3335 17.8356 5.7812 17.3879 6.3335 17.3879C6.8858 17.3879 7.3335 17.8356 7.3335 18.3879C7.3335 18.9402 6.8858 19.3879 6.3335 19.3879ZM17.6669 19.3879C17.1146 19.3879 16.6669 18.9402 16.6669 18.3879C16.6669 17.8356 17.1146 17.3879 17.6669 17.3879C18.2192 17.3879 18.6669 17.8356 18.6669 18.3879C18.6669 18.9402 18.2192 19.3879 17.6669 19.3879Z"></path>
                  </svg>
                </div>
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-gray-400 font-medium uppercase">Download</div>
                  <div className="text-xs font-bold text-white">APK Android APK</div>
                </div>
              </button>
            </div>
          </div>

          {/* Column 2: SPECIAL */}
          <div>
            <h4 className="font-bold text-white mb-5 uppercase text-sm tracking-wide">SPECIAL</h4>
            <ul className="space-y-2.5 text-gray-300 text-[13px]">
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Featured Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Latest Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Best Selling Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Top Rated Products</a></li>
            </ul>
          </div>

          {/* Column 3: ACCOUNT & SHIPPING INFO */}
          <div>
            <h4 className="font-bold text-white mb-5 uppercase text-sm tracking-wide">ACCOUNT & SHIPPING INFO</h4>
            <ul className="space-y-2.5 text-gray-300 text-[13px]">
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Profile Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Wish List</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Vendor Return And Refund Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Customer Return And Refund Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: COMPANY INFO */}
          <div>
            <h4 className="font-bold text-white mb-5 uppercase text-sm tracking-wide">COMPANY INFO</h4>
            <ul className="space-y-2.5 text-gray-300 text-[13px]">
              <li><a href="#" className="hover:text-white transition-colors hover:underline">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Blog</a></li>
            </ul>
          </div>

          {/* Column 5: ADDRESS */}
          <div>
            <h4 className="font-bold text-white mb-5 uppercase text-sm tracking-wide">ADDRESS</h4>
            <div className="flex gap-3 text-gray-300 items-start">
              <MapPin size={18} className="shrink-0 text-white mt-0.5 fill-white text-transparent" stroke="none" />
              <p className="leading-relaxed text-[13px]">
                10680, SINGHARA CHOWK, JHANDEWALAN ROAD,
                NABI KARIM, DELHI, INDIA, 11005510680,
                SINGHARA CHOWK, JHANDEWALAN ROAD, NABI
                KARIM, DELHI, INDIA, 110055 =
              </p>
            </div>
          </div>

        </div>

        {/* Middle Section: Contact & Newsletter */}
        <div className="border-t border-gray-700/60 pt-8 pb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          
          <div className="flex-1 w-full">
            <h4 className="font-bold text-white mb-4 text-sm">Start A Conversation</h4>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 flex-wrap">
              <div className="flex items-center gap-3 text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                <Phone size={18} className="text-white" />
                <span>+91 93551 00885</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                <Mail size={18} className="text-white" />
                <span>support@thefabrima.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                <User size={18} className="text-white" />
                <span>Support Ticket</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <h4 className="font-bold text-white mb-4 text-sm">Newsletter</h4>
            <div className="flex bg-[#374151] rounded p-1 w-full md:w-[400px]">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="bg-transparent text-white px-4 py-2 outline-none flex-1 placeholder-gray-400 min-w-0 text-sm" 
              />
              <button className="bg-white text-gray-900 px-6 py-2 rounded-sm font-bold text-sm hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="border-t border-gray-700/60 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="text-center md:text-left">
              CopyRight Fabrima Ventures Private Limited@2025 Designed by <a href="https://www.ejswebserve.com" className="text-white hover:underline">www.ejswebserve.com</a>
            </div>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-[#374151] flex items-center justify-center text-white hover:bg-[#990000] transition-colors">
                <span className="font-bold text-sm font-serif">𝕏</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#374151] flex items-center justify-center text-white hover:bg-[#990000] transition-colors">
                <Linkedin size={14} fill="currentColor" className="text-white" strokeWidth={0} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#374151] flex items-center justify-center text-white hover:bg-[#990000] transition-colors">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#374151] flex items-center justify-center text-white hover:bg-[#990000] transition-colors">
                <Facebook size={14} fill="currentColor" className="text-white" strokeWidth={0} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
