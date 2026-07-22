import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Placeholder — replaced with real cart persistence/logic in a later phase.
  const [items] = useState([]);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return <CartContext.Provider value={{ items, count }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
