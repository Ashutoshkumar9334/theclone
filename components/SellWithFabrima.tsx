import React, { useState } from 'react';
import { Eye, EyeOff, UserPlus, UploadCloud, Rocket, ChevronDown, ChevronUp } from 'lucide-react';
import { PageView } from '../types';

interface SellWithFabrimaProps {
  onNavigate: (page: PageView) => void;
}

const FAQ_DATA = [
  {
    question: "How do I register as a vendor?",
    answer: "Click on the 'Get Registered' button, fill in your details such as email, phone number, and password. Once verified, you can start listing products."
  },
  {
    question: "What are the fees for selling?",
    answer: "We charge a small commission on each successful sale. Listing products is free. Check our terms and conditions for detailed fee structures."
  },
  {
    question: "How do I upload products?",
    answer: "After logging in to your vendor portal, go to the 'Products' tab and click 'Add New Product'. Upload images and descriptions to get started."
  },
  {
    question: "When will I get paid?",
    answer: "Payments are processed weekly for all orders delivered in the previous week, directly to your registered bank account."
  }
];

const SellWithFabrima: React.FC<SellWithFabrimaProps> = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="font-sans text-gray-800">
       {/* Section 1: Registration Form */}
       <div className="bg-[#f0f4f9] py-8 md:py-12 px-4">
         <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
            {/* Left Side - Image/Graphic */}
            <div className="w-full md:w-5/12 bg-[#f0f8ff] p-6 md:p-8 flex flex-col items-center justify-center text-center relative border-r border-gray-100 min-h-[300px] md:min-h-[500px]">
                <div className="absolute top-6 left-6 md:top-8 md:left-8 text-left z-10">
                    <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">Vendor Registration</h2>
                    <p className="text-sm text-gray-600">
                      Create your own store. 
                      <span 
                        onClick={() => onNavigate(PageView.VENDOR_LOGIN)}
                        className="text-[#990000] font-bold cursor-pointer hover:underline ml-1"
                      >
                        Login
                      </span>
                    </p>
                </div>
                
                {/* Graphic simulation based on video */}
                <div className="mt-12 md:mt-10 flex flex-col items-center justify-center flex-1 w-full">
                    <div className="relative group cursor-pointer transition-transform hover:scale-105 duration-300 w-full max-w-[280px]">
                        {/* Red Border Box */}
                        <div className="border-4 border-[#990000] rounded-2xl px-8 py-6 md:px-10 md:py-6 bg-white text-[#990000] font-black text-xl md:text-2xl shadow-xl text-center leading-tight">
                            VENDOR<br/>REGISTRATION
                        </div>
                        
                        {/* Hand icon simulation - pointing to the box */}
                         <div className="absolute -bottom-12 md:-bottom-16 left-1/2 -translate-x-1/2">
                             <img 
                               src="https://cdn-icons-png.flaticon.com/512/833/833453.png" 
                               className="w-20 h-20 md:w-24 md:h-24 drop-shadow-xl -rotate-12" 
                               alt="Click Here" 
                             />
                         </div>
                    </div>
                </div>
            </div>
            
            {/* Right Side - Form */}
            <div className="w-full md:w-7/12 p-6 md:p-12">
                <h3 className="text-lg md:text-xl font-medium mb-6 md:mb-8 text-gray-800 border-b pb-2 inline-block">Create An Account</h3>
                <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Email <span className="text-red-500">*</span></label>
                            <input type="email" placeholder="Ex: example@gmail.com" className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#990000] transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Phone <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="Enter phone number" className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#990000] transition-colors" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="relative">
                            <label className="block text-sm text-gray-500 mb-1">Password</label>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Minimum 8 characters long" 
                                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#990000] transition-colors" 
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-400 hover:text-gray-600">
                                {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                            </button>
                        </div>
                        <div className="relative">
                            <label className="block text-sm text-gray-500 mb-1">Confirm Password</label>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder="Confirm password" 
                                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#990000] transition-colors" 
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9 text-gray-400 hover:text-gray-600">
                                {showConfirmPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6 md:mt-8">
                        <button className="bg-[#990000] text-white px-8 py-3 rounded font-bold text-sm hover:bg-red-800 transition-colors shadow-md w-full md:w-auto">
                            Proceed To Next
                        </button>
                    </div>
                </form>
            </div>
         </div>
       </div>

       {/* Section 2: Why Sell With Us */}
       <div className="py-12 md:py-20 px-4 text-center bg-white">
           <h2 className="text-2xl md:text-3xl font-medium mb-4 md:mb-6 text-[#1e293b]">Why Sell With Us</h2>
           <p className="text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed text-sm md:text-base">
               Boost your sales! Join us for a seamless, profitable experience with vast buyer reach and top-notch support. Sell smarter today!
           </p>
           <div className="flex justify-center">
               <div className="flex items-center gap-3 scale-100 md:scale-110">
                   {/* Logo Reconstruction */}
                   <div className="w-10 h-8 md:w-12 md:h-10 bg-[#990000] rounded-tl-2xl rounded-br-2xl shadow-sm"></div>
                   <div className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight text-left font-serif">
                       The Fabrima<span className="text-sm font-sans font-normal text-gray-500 ml-1">.com</span>
                       <div className="text-[10px] md:text-xs font-sans font-normal text-gray-500 -mt-1 tracking-wider uppercase">e-Marketplace</div>
                   </div>
               </div>
           </div>
       </div>

       {/* Section 3: 3 Easy Steps (Dark Blue) */}
       <div className="bg-[#0b1120] text-white py-16 md:py-24 px-4 relative overflow-hidden">
           <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="text-2xl md:text-3xl font-medium text-center mb-4 md:mb-6">3 Easy Steps To Start Selling</h2>
                <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12 md:mb-20 text-sm leading-relaxed">
                    Start selling quickly! Register, upload your products with detailed info and images, and reach millions of buyers instantly.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Dotted Line (hidden on mobile) */}
                    <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] border-t-2 border-dashed border-gray-600/50 -z-10"></div>

                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-20 h-20 bg-red-600/90 rounded-full flex items-center justify-center mb-6 md:mb-8 relative z-10 shadow-[0_0_20px_rgba(220,38,38,0.3)] group-hover:scale-110 transition-transform duration-300">
                            <UserPlus size={36} className="text-white" />
                            <div className="absolute bottom-0 right-0 bg-red-800 rounded-full p-1 border-2 border-[#0b1120]">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                        </div>
                        <h3 className="text-xl font-medium mb-3 md:mb-4">Get Registered</h3>
                        <p className="text-gray-400 text-sm leading-relaxed px-6">
                            Sign up easily and create your seller account in just a few minutes. It fast and simple to get started.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-20 h-20 bg-red-600/90 rounded-full flex items-center justify-center mb-6 md:mb-8 relative z-10 shadow-[0_0_20px_rgba(220,38,38,0.3)] group-hover:scale-110 transition-transform duration-300">
                             <div className="relative">
                                <UploadCloud size={36} className="text-white" />
                                <div className="absolute -top-2 -right-2 text-red-200">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 3.5L18.5 20H5.5L12 5.5z"/></svg>
                                </div>
                             </div>
                        </div>
                        <h3 className="text-xl font-medium mb-3 md:mb-4">Upload Products</h3>
                        <p className="text-gray-400 text-sm leading-relaxed px-6">
                            List your products with detailed descriptions and high-quality images to attract more buyers effortlessly.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-20 h-20 bg-red-600/90 rounded-full flex items-center justify-center mb-6 md:mb-8 relative z-10 shadow-[0_0_20px_rgba(220,38,38,0.3)] group-hover:scale-110 transition-transform duration-300">
                            <Rocket size={36} className="text-white" />
                        </div>
                        <h3 className="text-xl font-medium mb-3 md:mb-4">Start Selling</h3>
                        <p className="text-gray-400 text-sm leading-relaxed px-6">
                            Go live and start reaching millions of potential buyers immediately. Watch your sales grow with our vast audience.
                        </p>
                    </div>
                </div>
           </div>
       </div>

       {/* Section 4: App Download */}
       <div className="bg-[#eaf4fc] py-12 md:py-20 px-4">
           <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
               <div className="space-y-4 shrink-0 flex flex-col items-center md:items-start">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-[50px] md:h-[60px] cursor-pointer hover:opacity-90 transition-opacity" alt="Google Play" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-[38px] md:h-[45px] cursor-pointer hover:opacity-90 transition-opacity" alt="App Store" />
               </div>
               <div className="text-center md:text-left flex-1">
                   <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-3 md:mb-4">The Fabrima Seller App – Coming Soon!</h2>
                   <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                       Manage your textile business on-the-go. Upload products, track orders, and connect with customers—all from your smartphone.
                   </p>
               </div>
           </div>
       </div>
       
       {/* Section 5: FAQ */}
       <div className="py-12 md:py-20 px-4 bg-white">
           <div className="max-w-4xl mx-auto">
               <div className="text-center mb-8 md:mb-12">
                   <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Frequently Asked Questions</h2>
                   <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        Got questions about becoming a vendor? Explore our vendor FAQ section for answers to any queries you may have about joining our platform as a vendor
                   </p>
               </div>

               <div className="space-y-4">
                   {FAQ_DATA.map((faq, index) => (
                       <div key={index} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300">
                           <button 
                             onClick={() => toggleFaq(index)}
                             className={`w-full flex items-center justify-between p-4 md:p-5 text-left font-medium transition-colors text-sm md:text-base ${openFaqIndex === index ? 'bg-gray-50 text-[#990000]' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
                           >
                               {faq.question}
                               {openFaqIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                           </button>
                           <div 
                             className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${
                               openFaqIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                             }`}
                           >
                               <div className="p-4 md:p-5 pt-0 text-gray-600 text-sm leading-relaxed">
                                   {faq.answer}
                               </div>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
       </div>

    </div>
  );
}

export default SellWithFabrima;