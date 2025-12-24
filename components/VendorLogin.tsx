import React, { useState } from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';

const VendorLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full py-20 px-4 font-sans text-gray-800 flex justify-center bg-[#f8f9fa] min-h-[calc(100vh-200px)]">
      <div className="bg-white w-full max-w-[500px] p-8 md:p-10 rounded-lg shadow-sm border border-gray-200">
        
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
               {/* Small Logo Icon */}
               <div className="flex items-center gap-1 justify-center">
                   <div className="w-6 h-5 bg-[#990000] rounded-tl-lg rounded-br-lg"></div>
                   <div className="text-lg font-bold tracking-tight text-gray-800">
                     The Fabrima<span className="text-[10px] font-normal text-gray-400">.com</span>
                   </div>
               </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h1>
          <p className="text-gray-500 text-sm">Welcome back to vendor login</p>
        </div>
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Email</label>
            <input 
              type="email" 
              placeholder="email@address.com" 
              className="w-full border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600 placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="8+ characters required" 
                className="w-full border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600 placeholder:text-gray-400 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between mt-1">
             <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 border-gray-300 rounded text-[#990000] focus:ring-[#990000] accent-[#990000]" 
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer">Remember Me</label>
             </div>
             <a href="#" className="text-sm text-[#990000] hover:underline">Forgot Password</a>
          </div>

          {/* Captcha */}
          <div className="flex items-center gap-3 mt-4">
             <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Enter captcha value" 
                  className="w-full border border-gray-300 rounded px-4 py-2.5 focus:outline-none focus:border-[#990000] text-sm text-gray-600"
                />
             </div>
             <div className="flex items-center gap-2 shrink-0">
                <div className="bg-[#f0f0f0] border border-gray-200 px-3 py-2 rounded text-lg font-bold text-gray-700 tracking-widest select-none w-24 text-center italic" style={{ fontFamily: 'serif' }}>
                   mwmq
                </div>
                <button type="button" className="text-gray-500 hover:text-gray-800 p-1">
                   <RefreshCw size={18} />
                </button>
             </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-2">
             <button className="w-full bg-[#990000] hover:bg-[#7a0000] text-white font-bold py-3 rounded transition-colors text-sm shadow-md">
               Sign in
             </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default VendorLogin;