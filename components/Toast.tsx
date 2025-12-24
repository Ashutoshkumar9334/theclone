import React from 'react';

export interface ToastMessage {
  id: number;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
}

const Toast: React.FC<ToastProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-10 left-10 z-[100] flex flex-col gap-3 font-sans">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className="bg-[#5bc0de] text-white pl-4 pr-6 py-4 rounded shadow-md flex items-center gap-4 min-w-[280px] animate-in slide-in-from-left-10 fade-in duration-300"
        >
          {/* Custom Info Bubble Icon */}
          <div className="relative w-8 h-8 shrink-0">
             <div className="absolute inset-0 bg-white rounded-full rounded-bl-none"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#5bc0de] font-serif font-bold text-lg italic pt-0.5 pr-0.5">i</span>
             </div>
          </div>
          
          <span className="font-normal text-[15px] tracking-wide">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Toast;