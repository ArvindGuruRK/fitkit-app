'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type Dispatch,
  type ReactNode,
} from 'react';
import type { CartState, CartAction, CartItem } from '@/lib/shop/types';
import { itemKey } from '@/lib/shop/cart-utils';

const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<CartAction>;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = itemKey(action.product.id, action.variant?.id);
      const existing = state.items.find(
        (i) => itemKey(i.product.id, i.selectedVariant?.id) === key
      );
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            itemKey(i.product.id, i.selectedVariant?.id) === key
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [
          ...state.items,
          { product: action.product, quantity: 1, selectedVariant: action.variant },
        ],
      };
    }
    case 'REMOVE_ITEM': {
      const key = itemKey(action.productId, action.variantId);
      return {
        ...state,
        items: state.items.filter(
          (i) => itemKey(i.product.id, i.selectedVariant?.id) !== key
        ),
      };
    }
    case 'UPDATE_QUANTITY': {
      const key = itemKey(action.productId, action.variantId);
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => itemKey(i.product.id, i.selectedVariant?.id) !== key
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          itemKey(i.product.id, i.selectedVariant?.id) === key
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'HYDRATE':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

const STORAGE_KEY = 'fitkits-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const items: CartItem[] = JSON.parse(saved);
        if (Array.isArray(items) && items.length > 0) {
          dispatch({ type: 'HYDRATE', items });
        }
      }
    } catch {
      // ignore malformed localStorage data
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore quota errors
    }
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
