import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ecom_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { addToCart, setToastMessage } = useCart();

  useEffect(() => {
    try {
      localStorage.setItem('ecom_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistItems]);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
      if (setToastMessage) {
        setToastMessage({
          msg: `Removed "${product.name}" from Wishlist`,
          type: 'info',
          id: Date.now(),
        });
      }
    } else {
      setWishlistItems((prev) => [...prev, product]);
      if (setToastMessage) {
        setToastMessage({
          msg: `Saved "${product.name}" to Wishlist!`,
          type: 'success',
          id: Date.now(),
        });
      }
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const moveToCart = (product, color = null, size = null) => {
    addToCart(product, 1, color, size);
    removeFromWishlist(product.id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        moveToCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
