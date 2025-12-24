import React, { useState } from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';

const UserLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full py-16 px-4 font-sans text-gray-800 flex justify-center bg-white min-h-[600px] items-center">
      <div className="w-full max-w-[800px] bg-white rounded-xl shadow-sm border border-gray-100 p-12">
        
        <h1 className="text-2xl font-bold text-center mb-8 text-black">Sign In</h1>
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6 max-w-lg mx-auto">
          
          {/* Email / Phone */}
          <div>
            <label className="block text-[14px] font-medium text-gray-900 mb-2">Email / Phone</label>
            <input 
              type="text" 
              placeholder="Enter email or phone" 
              className="w-full border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-blue-300 focus:shadow-[0_0_0_3px_rgba(66,153,225,0.15)] text-sm text-gray-600 placeholder:text-gray-400 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[14px] font-medium text-gray-900 mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter password" 
                className="w-full border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-blue-300 focus:shadow-[0_0_0_3px_rgba(66,153,225,0.15)] text-sm text-gray-600 placeholder:text-gray-400 pr-10 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between mt-2">
             <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 border-gray-300 rounded text-[#990000] focus:ring-[#990000] accent-[#990000] cursor-pointer" 
                />
                <label htmlFor="remember" className="ml-2 text-sm text-[#990000] cursor-pointer hover:text-red-800">Remember me</label>
             </div>
             <a href="#" className="text-sm text-[#990000] hover:text-red-800 underline underline-offset-1 decoration-[#990000] transition-colors">Forgot password?</a>
          </div>

          {/* Captcha */}
          <div className="flex items-center gap-4 mt-2">
             <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Enter captcha value" 
                  className="w-full border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-blue-300 focus:shadow-[0_0_0_3px_rgba(66,153,225,0.15)] text-sm text-gray-600 placeholder:text-gray-400"
                />
             </div>
             <div className="flex items-center gap-3">
                <div className="bg-[#d8d0e3] px-4 py-2 rounded text-2xl font-bold text-[#3d5a36] tracking-widest select-none w-32 text-center" style={{ fontFamily: 'cursive', fontStyle: 'italic' }}>
                   UKGd
                </div>
                <button type="button" className="text-black hover:rotate-180 transition-transform duration-500 p-1">
                   <RefreshCw size={20} strokeWidth={2.5} />
                </button>
             </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-2">
             <button className="w-full bg-[#990000] hover:bg-[#7a0000] text-white font-medium py-3 rounded transition-colors text-base shadow-sm">
               Sign in
             </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UserLogin;