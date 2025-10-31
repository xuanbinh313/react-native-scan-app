import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Tables } from '@/lib/database.types';

type Product = Tables<'product'>;

interface CompareContextType {
  selectedProducts: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearProducts: () => void;
  isSelected: (productId: string) => boolean;
  toggleProduct: (product: Product) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setSelectedProducts((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearProducts = () => {
    setSelectedProducts([]);
  };

  const isSelected = (productId: string) => {
    return selectedProducts.some((p) => p.id === productId);
  };

  const toggleProduct = (product: Product) => {
    if (isSelected(product.id)) {
      removeProduct(product.id);
    } else {
      addProduct(product);
    }
  };

  return (
    <CompareContext.Provider
      value={{
        selectedProducts,
        addProduct,
        removeProduct,
        clearProducts,
        isSelected,
        toggleProduct,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
