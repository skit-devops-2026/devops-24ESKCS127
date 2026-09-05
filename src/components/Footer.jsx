import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, ShieldCheck, RefreshCw, Headset, Send, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { setToastMessage } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setToastMessage({
        msg: "Thank you for subscribing to LuxeCart VIP Club!",
        type: "success",
        id: Date.now(),
      });
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Features Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Free Shipping</h4>
              <p className="text-xs text-slate-400">On all orders above ₹2,000</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Easy 30-Day Returns</h4>
              <p className="text-xs text-slate-400">No questions asked refund</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Secure Checkout</h4>
              <p className="text-xs text-slate-400">Encrypted payment gateway</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <Headset className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-400">Call or chat anytime</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                LUXE<span className="text-indigo-400">CART</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Discover curated luxury essentials across fashion, electronics, footwear, and lifestyle products. Handpicked quality guaranteed.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
              <label className="text-xs font-semibold text-slate-200 block mb-2">
                Subscribe to unlock 15% OFF your first order
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 rounded-xl px-4 py-2.5 flex-1 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Shop Categories</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/products?category=Men's%20Clothing" className="hover:text-white transition">Men's Fashion</Link>
              </li>
              <li>
                <Link to="/products?category=Women's%20Clothing" className="hover:text-white transition">Women's Fashion</Link>
              </li>
              <li>
                <Link to="/products?category=Shoes" className="hover:text-white transition">Footwear</Link>
              </li>
              <li>
                <Link to="/products?category=Watches" className="hover:text-white transition">Luxury Watches</Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="hover:text-white transition">Electronics</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/cart" className="hover:text-white transition">Order Tracking</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition">My Wishlist</Link></li>
              <li><span className="hover:text-white cursor-pointer transition">Shipping Policy</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Returns & Exchanges</span></li>
              <li><span className="hover:text-white cursor-pointer transition">FAQs & Help Center</span></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Store Location</h4>
            <div className="text-xs space-y-2 text-slate-400">
              <p>📍 742 Evergreen Terrace, Tech Park, Cityville</p>
              <p>📞 +91 (800) 123-4567</p>
              <p>✉️ support@luxecart.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LuxeCart Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
