import React, { createContext, useContext, useReducer, useState } from 'react';

// Cart item: { id, productId, name, price, image, size, color, quantity }

const CartContext = createContext();

const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 10;

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // action.payload: { product, size, color, quantity }
      const existing = state.items.find(
        (item) =>
          item.productId === action.payload.product.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.payload.product.id &&
            item.size === action.payload.size &&
            item.color === action.payload.color
              ? { ...item, quantity: Math.min(item.quantity + action.payload.quantity, 10) }
              : item
          ),
        };
      }
      const newItem = {
        id: `${action.payload.product.id}-${action.payload.size}-${action.payload.color}-${Date.now()}`,
        productId: action.payload.product.id,
        name: action.payload.product.name,
        price: action.payload.product.price,
        image: action.payload.product.images[0],
        size: action.payload.size,
        color: action.payload.color,
        quantity: action.payload.quantity,
      };
      return { ...state, items: [...state.items, newItem] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, Math.min(10, action.payload.quantity)) }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'APPLY_PROMO': {
      const promoCodes = { SAVE10: 0.1, LUXE15: 0.15, WELCOME20: 0.2 };
      const discount = promoCodes[action.payload.toUpperCase()];
      if (discount) {
        return { ...state, promoCode: action.payload.toUpperCase(), discount };
      }
      return { ...state, promoCodeError: 'Invalid promo code' };
    }
    case 'REMOVE_PROMO':
      return { ...state, promoCode: null, discount: 0, promoCodeError: null };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  promoCode: null,
  discount: 0,
  promoCodeError: null,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * state.discount;
  const discountedSubtotal = subtotal - discountAmount;
  const shipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + shipping + tax;
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product, size, color, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, size, color, quantity } });
    setSidebarOpen(true);
    setTimeout(() => setSidebarOpen(false), 3000);
  };

  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const applyPromo = (code) => dispatch({ type: 'APPLY_PROMO', payload: code });
  const removePromo = () => dispatch({ type: 'REMOVE_PROMO' });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        subtotal,
        discountAmount,
        discountedSubtotal,
        shipping,
        tax,
        total,
        itemCount,
        promoCode: state.promoCode,
        discount: state.discount,
        promoCodeError: state.promoCodeError,
        sidebarOpen,
        setSidebarOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromo,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export default CartContext;
