import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Headphones } from 'lucide-react';
import { products, categories } from '../data/demo';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

      {/* Hero Banner */}
      <section className="bg-indigo-600 rounded-2xl text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <div className="space-y-4 max-w-lg text-center md:text-left">
          <span className="inline-block bg-indigo-500 text-indigo-100 text-xs font-semibold px-3 py-1 rounded-full">
            Welcome to SimpleShop
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Discover Quality Products Everyday
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base">
            Explore our curated range of fashion, electronics, and lifestyle products with great discounts and fast shipping.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-slate-100 font-bold text-sm px-6 py-3 rounded-lg shadow-sm transition"
            >
              <span>Shop All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="max-w-xs shrink-0">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
            alt="Hero Product"
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Category Pills */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Browse by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={cat === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat)}`}
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Featured Products</h2>
          <Link
            to="/products"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Simple Benefits Bar */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-800 text-sm">Free Delivery</h3>
          <p className="text-xs text-slate-500">Free shipping on all orders over ₹2,000</p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-800 text-sm">Quality Guarantee</h3>
          <p className="text-xs text-slate-500">100% genuine and verified products</p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Headphones className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-800 text-sm">Help & Support</h3>
          <p className="text-xs text-slate-500">Friendly customer service whenever you need</p>
        </div>
      </section>

    </div>
  );
};
