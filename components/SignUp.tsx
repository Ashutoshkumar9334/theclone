import React, { useState } from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { PageView } from '../types';

interface SignUpProps {
  onNavigate: (page: PageView) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full py-12 px-4 font-sans text-gray-800 flex justify-center">
      <div className="bg-white w-full max-w-4xl p-8 md:p-12 rounded-lg shadow-sm border border-gray-100">
        
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">Sign Up</h1>
        
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Ex: Jhone" className="w-full border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600" />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Ex: Doe" className="w-full border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
              <input type="email" placeholder="Enter email address" className="w-full border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600" />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Enter phone number" className="w-full border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600" />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Minimum 8 characters long" 
                  className="w-full border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600 pr-10" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Minimum 8 characters long" 
                  className="w-full border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600 pr-10" 
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Company Name */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
            <input type="text" placeholder="Enter company name" className="w-full border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6">
             {/* GST */}
             <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">GST</label>
               <input type="text" placeholder="Enter GST No" className="w-full border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600" />
             </div>

             {/* GST Certificate */}
             <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">GST Certificate</label>
               <div className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 bg-white flex items-center">
                 <input type="file" className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-1 file:px-2
                    file:rounded file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-100 file:text-gray-700
                    hover:file:bg-gray-200" 
                 />
               </div>
             </div>

             {/* PAN Card */}
             <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">Pan Card <span className="text-red-500">*</span></label>
               <input type="text" placeholder="Enter PAN No" className="w-full border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600" />
             </div>

             {/* PAN Attachment */}
             <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Card Attachment</label>
               <div className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 bg-white flex items-center">
                 <input type="file" className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-1 file:px-2
                    file:rounded file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-100 file:text-gray-700
                    hover:file:bg-gray-200" 
                 />
               </div>
             </div>
          </div>

          {/* IBR Code (Captcha) */}
          <div className="mt-6">
             <label className="block text-sm font-semibold text-gray-700 mb-2">IBR Code</label>
             <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
               <input type="text" placeholder="Code" className="w-full md:w-1/3 border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600" />
               
               <input type="text" placeholder="Enter captcha value" className="w-full md:w-1/3 border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600" />
               
               <div className="flex items-center gap-3">
                  <div className="bg-[#d1d5db] px-4 py-2 rounded text-lg font-serif font-bold text-gray-700 tracking-widest select-none bg-opacity-50 relative overflow-hidden w-28 text-center" style={{ fontFamily: 'cursive' }}>
                     THVZ
                     <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
                  </div>
                  <button type="button" className="text-gray-700 hover:rotate-180 transition-transform duration-500 p-1">
                     <RefreshCw size={18} />
                  </button>
               </div>
             </div>
          </div>

          {/* Terms */}
          <div className="mt-8 flex items-center">
             <input type="checkbox" id="terms" className="w-4 h-4 border-gray-300 rounded text-[#990000] focus:ring-[#990000]" />
             <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
               I agree to Your <a href="#" className="text-[#990000] hover:underline">Terms and conditions</a>
             </label>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
             <button className="bg-[#b95d5d] hover:bg-[#990000] text-white font-medium py-3 px-16 rounded transition-colors text-sm w-full md:w-auto min-w-[200px]">
               Sign up
             </button>
          </div>

          {/* Footer Link */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have account ? <button onClick={() => onNavigate(PageView.VENDOR_LOGIN)} className="text-[#990000] hover:underline font-medium">Sign in</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignUp;