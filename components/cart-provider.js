"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getFumiProductById } from "@/lib/fumisterie";
import { allProducts, getProductById } from "@/lib/products";

const CART_STORAGE_KEY = "hearth-cart";
const CartContext = createContext(null);

function sanitizeItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      const product = getProductById(item?.productId) ?? getFumiProductById(item?.productId);
      if (!product) return null;
      const quantity = Math.floor(Number(item?.quantity || 0));
      if (quantity <= 0) return null;
      return {
        productId: item.productId,
        quantity,
        unitPrice: product.price,
        configLabel: typeof item.configLabel === "string" ? item.configLabel : undefined,
        isAccessory: Boolean(item.isAccessory)
      };
    })
    .filter(Boolean);
}

function getItemPrice(item) {
  const product = getProductById(item.productId) ?? getFumiProductById(item.productId);
  return product?.price ?? 0;
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
    if (!hasHydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [hasHydrated, items]);

  const value = useMemo(() => {
    const addItem = (productId, quantity = 1, options = {}) => {
      const safeQuantity = Math.max(1, Math.floor(Number(quantity) || 1));

      setItems((currentItems) => {
        const key = options.configLabel
          ? `${productId}::${options.configLabel}`
          : productId;
        const existingItem = currentItems.find(
          (e) => (e.configLabel ? `${e.productId}::${e.configLabel}` : e.productId) === key
        );

        const newEntry = {
          productId,
          quantity: safeQuantity,
          ...(options.unitPrice !== undefined && { unitPrice: options.unitPrice }),
          ...(options.configLabel && { configLabel: options.configLabel }),
          ...(options.isAccessory && { isAccessory: true })
        };

        if (!existingItem) {
          return [...currentItems, newEntry];
        }

        return currentItems.map((entry) => {
          const entryKey = entry.configLabel
            ? `${entry.productId}::${entry.configLabel}`
            : entry.productId;
          return entryKey === key
            ? { ...entry, quantity: entry.quantity + safeQuantity }
            : entry;
        });
      });
    };

    const setQuantity = (productId, quantity, configLabel) => {
      const safeQuantity = Math.floor(Number(quantity) || 0);
      setItems((currentItems) =>
        currentItems
          .map((entry) => {
            const matches = entry.productId === productId &&
              (configLabel ? entry.configLabel === configLabel : !entry.configLabel);
            return matches ? { ...entry, quantity: safeQuantity } : entry;
          })
          .filter((entry) => entry.quantity > 0)
      );
    };

    const removeItem = (productId, configLabel) => {
      setItems((currentItems) =>
        currentItems.filter((entry) => {
          if (entry.productId !== productId) return true;
          if (configLabel) return entry.configLabel !== configLabel;
          return Boolean(entry.configLabel);
        })
      );
    };

    const clearCart = () => setItems([]);

    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + getItemPrice(item) * item.quantity,
      0
    );

    return {
      items,
      hasHydrated,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      count,
      subtotal,
      availableProducts: allProducts,
      getItemPrice
    };
  }, [hasHydrated, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within a CartProvider.");
  return value;
}
