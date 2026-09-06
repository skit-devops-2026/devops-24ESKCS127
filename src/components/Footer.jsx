import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <ShoppingBag className="w-5 h-5 text-indigo-400" />
          <span>Simple<span className="text-indigo-400">Shop</span></span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/products" className="hover:text-white transition">Products</Link>
          <Link to="/cart" className="hover:text-white transition">Cart</Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} SimpleShop. All rights reserved.
        </p>

      </div>
    </footer>
  );
};
