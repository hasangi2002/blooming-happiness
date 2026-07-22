import { createContext, useContext, useState } from 'react';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [items] = useState([]);
  const count = items.length;

  return <WishlistContext.Provider value={{ items, count }}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
