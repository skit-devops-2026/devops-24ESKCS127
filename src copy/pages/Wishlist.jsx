import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { StarRating } from '../components/StarRating';

export const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, moveToCart } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800">Your Wishlist is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Save your favorite products here to buy them later or keep track of sales and discount price drops!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full text-xs font-bold shadow-lg hover:bg-indigo-700 transition"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Saved Wishlist</h1>
        <p className="text-xs text-slate-500 mt-1">
          You have <strong className="text-slate-800">{wishlistItems.length}</strong> product(s) saved in your personal wishlist
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full text-slate-600 hover:text-rose-500 transition shadow-sm"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {product.discount > 0 && (
                <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                  {product.category}
                </span>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 hover:text-indigo-600 transition">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-1">
                  <StarRating rating={product.rating} reviews={product.reviews} />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-sm font-extrabold text-slate-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-[11px] text-slate-400 line-through block">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => moveToCart(product)}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
