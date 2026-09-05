import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutModal } from '../components/CheckoutModal';

export const Cart = () => {
  const {
    cartItems,
    subtotal,
    originalTotal,
    totalDiscount,
    deliveryFee,
    grandTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    setToastMessage,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LUXE15' || promoCode.trim().toUpperCase() === 'FESTIVE') {
      const discount = Math.round(subtotal * 0.15);
      setPromoDiscount(discount);
      setToastMessage({
        msg: "Promo code applied! 15% EXTRA discount added.",
        type: "success",
        id: Date.now(),
      });
    } else {
      setToastMessage({
        msg: "Invalid Promo Code. Try 'LUXE15' or 'FESTIVE'",
        type: "error",
        id: Date.now(),
      });
    }
  };

  const finalPayable = Math.max(0, grandTotal - promoDiscount);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our curated categories and find something extraordinary!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full text-xs font-bold shadow-lg hover:bg-indigo-700 transition"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Shopping Cart</h1>
          <p className="text-xs text-slate-500 mt-1">
            You have <strong className="text-slate-800">{cartItems.length}</strong> unique item(s) in your cart
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT: CART ITEMS LIST */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const { product, quantity, selectedColor, selectedSize } = item;
            return (
              <div
                key={`${product.id}-${selectedColor}-${selectedSize}`}
                className="bg-white border border-slate-100 rounded-3xl p-4 sm:p-5 shadow-sm flex gap-4 sm:gap-6 items-center"
              >
                {/* Thumbnail */}
                <Link
                  to={`/product/${product.id}`}
                  className="w-20 h-24 sm:w-24 sm:h-28 bg-slate-100 rounded-2xl overflow-hidden shrink-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 space-y-1.5 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {product.category}
                  </span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800 truncate hover:text-indigo-600 transition">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                    <span>Color: <strong className="text-slate-700">{selectedColor}</strong></span>
                    <span>•</span>
                    <span>Size: <strong className="text-slate-700">{selectedSize}</strong></span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm sm:text-base font-extrabold text-slate-900">
                        ₹{(product.price * quantity).toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{(product.originalPrice * quantity).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Controls: Quantity & Remove */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <button
                    onClick={() => removeFromCart(product.id, selectedColor, selectedSize)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition rounded-lg"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, selectedColor, selectedSize, quantity - 1)
                      }
                      className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white text-slate-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(product.id, selectedColor, selectedSize, quantity + 1)
                      }
                      className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white text-slate-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6 sticky top-24">
          <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-4">
            Order Summary
          </h3>

          {/* Promo Form */}
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-600" />
              <span>Promo Code (Try "LUXE15")</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs uppercase text-slate-800 flex-1 focus:bg-white focus:border-indigo-500 outline-none"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
              >
                Apply
              </button>
            </div>
          </form>

          {/* Breakdown List */}
          <div className="space-y-3 text-xs border-t border-slate-100 pt-4">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {totalDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Product Discount</span>
                <span>-₹{totalDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            {promoDiscount > 0 && (
              <div className="flex justify-between text-indigo-600 font-semibold">
                <span>Coupon Discount (15%)</span>
                <span>-₹{promoDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee</span>
              <span>
                {deliveryFee === 0 ? (
                  <strong className="text-emerald-600 font-bold uppercase">FREE</strong>
                ) : (
                  `₹${deliveryFee}`
                )}
              </span>
            </div>
          </div>

          {/* Total Payable */}
          <div className="border-t border-slate-100 pt-4 flex items-baseline justify-between">
            <div>
              <span className="text-sm font-extrabold text-slate-900 block">Grand Total</span>
              <span className="text-[10px] text-slate-400">Inclusive of all taxes</span>
            </div>
            <span className="text-2xl font-black text-indigo-600">
              ₹{finalPayable.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-bold text-xs shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Guaranteed 256-bit Encrypted Checkout</span>
          </div>
        </div>

      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

    </div>
  );
};
