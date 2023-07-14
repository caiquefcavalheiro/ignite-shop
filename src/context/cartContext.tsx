import { ReactNode, createContext, useState } from "react";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  cleanCart: () => void;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState([] as Product[]);

  function addToCart(product: Product) {
    setCart((state) => [...state, product]);
  }

  function removeFromCart(id: string) {
    const filterCart = cart.filter((product) => product.id !== id);

    setCart(filterCart);
  }

  function cleanCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cleanCart }}>
      {children}
    </CartContext.Provider>
  );
}
