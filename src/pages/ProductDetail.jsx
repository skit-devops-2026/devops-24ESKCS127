import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Check, Truck, ShieldCheck, RefreshCw, Star, Minus, Plus, ArrowLeft } from 'lucide-react';
import { products } from '../data/demo';
import { StarRating } from '../components/StarRating';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors ? product.colors[0] : '');
      setSelectedSize(product.sizes ? product.sizes[0] : '');
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-xs text-slate-500">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb & Back Link */}
      <div className="flex items-center justify-between">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
        <span className="text-xs text-slate-400">
          Home / {product.category} / <strong className="text-slate-700">{product.name}</strong>
        </span>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        
        {/* Left: Product Image Gallery */}
        <div className="space-y-4 sticky top-24">
          <div className="relative aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden shadow-lg border border-slate-100 group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                {product.discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Right: Product Details & Controls */}
        <div className="space-y-6">
          
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-4">
              <StarRating rating={product.rating} reviews={product.reviews} size="md" />
              <span className="text-xs text-slate-300">|</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                In Stock ({product.stock} items available)
              </span>
            </div>
          </div>

          {/* Pricing Block */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-base text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">
                Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Color Option: <span className="text-indigo-600">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`text-xs px-3.5 py-2 rounded-xl border transition font-medium ${
                      selectedColor === color
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold ring-2 ring-indigo-100'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Select Size: <span className="text-indigo-600">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[42px] text-xs px-3 py-2 rounded-xl border transition font-medium ${
                      selectedSize === size
                        ? 'border-indigo-600 bg-indigo-600 text-white font-bold shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions Bar */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-4">
              {/* Quantity Counter */}
              <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-slate-700 transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-extrabold text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-slate-700 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add To Cart */}
              <button
                onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-6 rounded-2xl font-bold text-xs shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition ${
                  isLiked
                    ? 'border-rose-500 bg-rose-500 text-white shadow-md'
                    : 'border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-500'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
            <div className="p-3 rounded-xl bg-slate-50 space-y-1">
              <Truck className="w-5 h-5 text-indigo-600 mx-auto" />
              <span className="text-[11px] font-semibold text-slate-700 block">Express Delivery</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 space-y-1">
              <RefreshCw className="w-5 h-5 text-indigo-600 mx-auto" />
              <span className="text-[11px] font-semibold text-slate-700 block">30-Day Returns</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 space-y-1">
              <ShieldCheck className="w-5 h-5 text-indigo-600 mx-auto" />
              <span className="text-[11px] font-semibold text-slate-700 block">Original Warranty</span>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-slate-200">
          <div className="mb-8">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">
              Similar Choices
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">Related Products</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
