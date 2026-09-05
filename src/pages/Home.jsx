import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, Tag, ShieldCheck, Award } from 'lucide-react';
import { products, categories, categoryThumbnails } from '../data/demo';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const featuredProducts = products.filter(p => p.rating >= 4.8).slice(0, 8);
  const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
          alt="Luxury Store Hero"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 sm:py-28 lg:py-36 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold w-fit mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Autumn / Winter Luxury Collection 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-3xl leading-[1.1]">
            Elevate Your <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent">Everyday Style</span>
          </h1>

          <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            Explore 50+ curated premium fashion pieces, high-tech electronics, luxury watches, and lifestyle essentials with instant express delivery.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg shadow-indigo-600/30 transition-all hover:gap-3"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/products?sort=popularity"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-semibold text-sm px-6 py-3.5 rounded-full border border-white/20 transition-all"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Best Sellers</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Popular Categories
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.filter(c => c !== 'All').map((cat) => {
            const itemCount = products.filter(p => p.category === cat).length;
            const bgImage = categoryThumbnails[cat] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80";

            return (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="group relative h-48 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-5"
              >
                <img
                  src={bgImage}
                  alt={cat}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {cat}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    {itemCount} Products Available
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">
              Handpicked Essentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Top Rated Products
            </h2>
          </div>
          <Link
            to="/products?sort=rating"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition"
          >
            <span>See More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* PROMOTIONAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg space-y-4 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
              <Tag className="w-3.5 h-3.5" />
              <span>LIMITED TIME FESTIVE DEAL</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Get Up To <span className="text-amber-400">40% OFF</span> On Luxury Timepieces & Electronics
            </h3>

            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              Upgrade your wardrobe & workspace with our top-selling automatic skeleton watches, noise-cancelling headphones, and full-grain leather bags.
            </p>

            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg transition"
              >
                <span>Shop Sale Items</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative z-10 shrink-0 max-w-xs">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
              alt="Promo Watch"
              className="rounded-2xl shadow-2xl border-4 border-white/10 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* BEST SELLERS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest block mb-1">
              Trending Now
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Best Selling Favorites
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* TRUST REASSURANCE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Authenticity Guarantee</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every item in our catalog is 100% genuine and sourced directly from certified master artisans & authorized brands.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Premium Quality Assurance</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Crafted from top-grade materials, tested for long-lasting durability and superior craftsmanship.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">VIP Member Perks</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enjoy exclusive seasonal discount drops, priority customer support, and instant size replacement options.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
