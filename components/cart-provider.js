"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { allProducts, getProductById } from "@/lib/products";

const CART_STORAGE_KEY = "hearth-cart";
const CartContext = createContext(null);

function sanitizeItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => ({
      productId: item?.productId,
      quantity: Math.floor(Number(item?.quantity || 0))
    }))
    .filter((item) => getProductById(item.productId) && item.quantity > 0);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      setItems(sanitizeItems(saved ? JSON.parse(saved) : []));
    } catch {
      setItems([]);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [hasHydrated, items]);

  const value = useMemo(() => {
    const addItem = (productId, quantity = 1) => {
      const safeQuantity = Math.max(1, Math.floor(Number(quantity) || 1));

      setItems((currentItems) => {
        const existingItem = currentItems.find((entry) => entry.productId === productId);

        if (!existingItem) {
          return [...currentItems, { productId, quantity: safeQuantity }];
        }

        return currentItems.map((entry) =>
          entry.productId === productId
            ? { ...entry, quantity: entry.quantity + safeQuantity }
            : entry
        );
      });
    };

    const setQuantity = (productId, quantity) => {
      const safeQuantity = Math.floor(Number(quantity) || 0);

      setItems((currentItems) =>
        currentItems
          .map((entry) =>
            entry.productId === productId ? { ...entry, quantity: safeQuantity } : entry
          )
          .filter((entry) => entry.quantity > 0)
      );
    };

    const removeItem = (productId) => {
      setItems((currentItems) => currentItems.filter((entry) => entry.productId !== productId));
    };

    const clearCart = () => {
      setItems([]);
    };

    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => {
      const product = getProductById(item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    return {
      items,
      hasHydrated,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      count,
      subtotal,
      availableProducts: allProducts
    };
  }, [hasHydrated, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return value;
}
