import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutModal } from '../components/CheckoutModal';

export const Cart = () => {
  const {
    cartItems,
    subtotal,
    deliveryFee,
    grandTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          You haven't added any products to your cart yet.
        </p>
        <div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Shopping Cart</h1>
          <p className="text-xs text-slate-500 mt-1">
            {cartItems.length} item(s) in your cart
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT: CART ITEMS */}
        <div className="lg:col-span-2 space-y-3">
          {cartItems.map((item) => {
            const { product, quantity, selectedColor, selectedSize } = item;
            return (
              <div
                key={`${product.id}-${selectedColor}-${selectedSize}`}
                className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 items-center"
              >
                {/* Thumbnail */}
                <Link
                  to={`/product/${product.id}`}
                  className="w-16 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {product.category}
                  </span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold text-slate-800 truncate hover:text-indigo-600 transition">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    ₹{(product.price * quantity).toLocaleString('en-IN')}
                  </p>
                </div>

                {/* Quantity & Remove */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, selectedColor, selectedSize, quantity - 1)
                      }
                      className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-slate-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(product.id, selectedColor, selectedSize, quantity + 1)
                      }
                      className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-slate-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id, selectedColor, selectedSize)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 sticky top-24">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Order Summary
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Delivery</span>
              <span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `₹${deliveryFee}`
                )}
              </span>
            </div>

            <div className="border-t border-slate-200 pt-3 flex items-baseline justify-between text-sm">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-bold text-lg text-indigo-600">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
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
