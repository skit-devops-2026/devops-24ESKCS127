import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast = () => {
  const { toastMessage, setToastMessage } = useCart();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, setToastMessage]);

  if (!toastMessage) return null;

  const { msg, type } = toastMessage;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-800 animate-fade-in max-w-sm">
      {type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
      {type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
      {type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
      <span className="text-sm font-medium leading-snug">{msg}</span>
      <button
        onClick={() => setToastMessage(null)}
        className="ml-auto text-slate-400 hover:text-white p-1 rounded-lg transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
