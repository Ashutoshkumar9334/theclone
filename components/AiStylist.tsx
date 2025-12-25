
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, User, Bot } from 'lucide-react';
import { getStylingAdvice } from '../services/geminiService';

const AiStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: 'Hello! I am Fabri, your personal styling assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    const response = await getStylingAdvice(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button - MOVED UP to bottom-24 */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-40 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 ${isOpen ? 'hidden' : 'flex'} items-center gap-2 border-2 border-white/10`}
      >
        <Sparkles size={20} className="text-yellow-200" />
        <span className="font-medium text-sm hidden md:block">AI Stylist</span>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 h-[500px]' : 'scale-90 opacity-0 h-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-black text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/10 rounded-lg">
                <Sparkles size={16} className="text-yellow-200" />
            </div>
            <div>
                <h3 className="font-serif font-medium">Fabri</h3>
                <p className="text-[10px] text-gray-300 uppercase tracking-wider">AI Style Expert</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-gray-200' : 'bg-black text-white'
                }`}
              >
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-white shadow-sm text-gray-800 rounded-tr-sm' 
                    : 'bg-white shadow-sm text-gray-800 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Bot size={14} />
               </div>
               <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm">
                 <div className="flex space-x-1">
                   <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                   <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about fabrics or style..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 px-5 pr-12 text-sm focus:outline-none focus:border-black transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiStylist;
