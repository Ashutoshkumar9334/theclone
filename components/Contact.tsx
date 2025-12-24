import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="py-12 px-4 md:px-6 max-w-[1400px] mx-auto min-h-screen font-sans">
       <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
       </div>

       <div className="bg-white border border-gray-100 rounded-xl p-8 md:p-12 shadow-sm max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        
        {/* Left Side: Illustration */}
        <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740&t=st=1709999999~exp=1710000599~hmac=abcdef" 
              alt="Contact Us Team" 
              className="max-w-full h-auto object-cover rounded-lg"
            />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-medium text-gray-800 mb-6">Send us a message</h2>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <input 
                  type="text" 
                  placeholder="Your name" 
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-[#990000] text-sm transition-colors" 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-[#990000] text-sm transition-colors" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <input 
                  type="text" 
                  placeholder="Your phone" 
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-[#990000] text-sm transition-colors" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-[#990000] text-sm transition-colors" 
                />
              </div>
            </div>

            <div>
              <textarea 
                rows={4} 
                placeholder="Message" 
                className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 focus:outline-none focus:border-[#990000] text-sm transition-colors resize-none" 
              />
            </div>

            <div className="pt-2">
              <button className="bg-[#990000] text-white px-8 py-3 rounded font-bold hover:bg-red-800 transition-colors shadow-md text-sm tracking-wide">
                Send
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;