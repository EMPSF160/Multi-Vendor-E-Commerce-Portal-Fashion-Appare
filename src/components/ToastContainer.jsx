import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#0f0f0f] text-white p-3.5 rounded-xs shadow-2xl border border-[#2b2b2b] flex items-center justify-between gap-3 animate-fadeIn text-xs"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <CheckCircle2 size={16} className="text-[#c5a059] shrink-0" />}
            {toast.type === 'error' && <AlertCircle size={16} className="text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info size={16} className="text-blue-400 shrink-0" />}
            <span className="leading-snug">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-white shrink-0 p-1"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
