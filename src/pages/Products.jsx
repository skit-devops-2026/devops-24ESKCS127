import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RotateCcw, X } from 'lucide-react';
import { products, categories } from '../data/demo';
import { ProductCard } from '../components/ProductCard';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State initialization from URL query parameters
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'All'
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [priceRange, setPriceRange] = useState(
    Number(searchParams.get('maxPrice')) || 15000
  );
  const [minRating, setMinRating] = useState(
    Number(searchParams.get('minRating')) || 0
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get('sort') || 'popularity'
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state with URL parameter changes
  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('search');
    const sort = searchParams.get('sort');
    if (cat !== null) setSelectedCategory(cat);
    if (q !== null) setSearchQuery(q);
    if (sort !== null) setSortBy(sort);
  }, [searchParams]);

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }
        // Search query filter
        if (
          searchQuery.trim() !== '' &&
          !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        // Price filter
        if (product.price > priceRange) {
          return false;
        }
        // Rating filter
        if (minRating > 0 && product.rating < minRating) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discount - a.discount;
        // Default: popularity by review count
        return b.reviews - a.reviews;
      });
  }, [selectedCategory, searchQuery, priceRange, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange(15000);
    setMinRating(0);
    setSortBy('popularity');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore All Products
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> of {products.length} total products
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs hover:bg-slate-50"
          >
            <Filter className="w-4 h-4 text-indigo-600" />
            <span>Filters</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs shadow-xs">
            <span className="text-slate-400 font-medium whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-slate-800 outline-none cursor-pointer"
            >
              <option value="popularity">Most Popular (Reviews)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block space-y-6 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm h-fit sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              <span>Filters & Refine</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Search Keywords
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Category
            </label>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left text-xs px-3 py-2 rounded-xl transition flex items-center justify-between font-medium ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {cat === 'All'
                      ? products.length
                      : products.filter((p) => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Max Price
              </label>
              <span className="text-xs font-extrabold text-indigo-600">
                ₹{priceRange.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>₹1,000</span>
              <span>₹15,000</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Minimum Rating
            </label>
            <div className="space-y-1.5">
              {[
                { label: 'All Ratings', value: 0 },
                { label: '4.5★ & Above', value: 4.5 },
                { label: '4.0★ & Above', value: 4.0 },
              ].map((r) => (
                <label
                  key={r.value}
                  className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer"
                >
                  <input
                    type="radio"
                    name="ratingFilter"
                    checked={minRating === r.value}
                    onChange={() => setMinRating(r.value)}
                    className="accent-indigo-600"
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* PRODUCT GRID SECTION */}
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No Products Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find any products matching your current search or filter options. Try adjusting or resetting your filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </main>

      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
              />
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800">Category</label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left text-xs p-2 rounded-lg ${
                      selectedCategory === cat ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit mobile filter */}
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold shadow-md"
            >
              Apply Filters ({filteredProducts.length} items)
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
