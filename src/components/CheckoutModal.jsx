import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutModal = ({ isOpen, onClose }) => {
  const { grandTotal, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    payment: 'cod',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);
    setIsSubmitted(true);
    clearCart();
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>{isSubmitted ? 'Order Confirmed' : 'Checkout'}</span>
          </h3>
          <button
            onClick={handleModalClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                name="name"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                name="phone"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Delivery Address</label>
              <textarea
                required
                name="address"
                rows={2}
                placeholder="Street address, building, flat no."
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:border-indigo-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">City</label>
              <input
                type="text"
                required
                name="city"
                placeholder="e.g. Mumbai"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:border-indigo-500 outline-none"
              />
            </div>

            {/* Payment Mode */}
            <div>
              <label className="block font-medium text-slate-700 mb-1.5">Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, payment: 'cod' })}
                  className={`p-2.5 rounded-lg border text-center font-medium transition flex items-center justify-center gap-1.5 ${
                    formData.payment === 'cod'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Cash on Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, payment: 'card' })}
                  className={`p-2.5 rounded-lg border text-center font-medium transition flex items-center justify-center gap-1.5 ${
                    formData.payment === 'card'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Online / Card</span>
                </button>
              </div>
            </div>

            {/* Total Amount & Submit */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 block">Total to Pay</span>
                <span className="text-base font-bold text-slate-900">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-lg transition shadow-sm"
              >
                Place Order
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h4 className="text-base font-bold text-slate-900">
              Order Placed Successfully!
            </h4>

            <p className="text-xs text-slate-500">
              Order ID: <strong className="text-slate-800">{orderId}</strong>
            </p>

            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Thank you for ordering with us. Your items will be dispatched shortly to <strong>{formData.address}</strong>.
            </p>

            <div className="pt-3">
              <button
                onClick={handleModalClose}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg text-xs transition"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
