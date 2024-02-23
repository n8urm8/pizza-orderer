import { createContext, useContext, useState } from "react";
import { CartItem, PizzaSize, Product } from "../types";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: PizzaSize) => void;
}
export const CartContext = createContext<CartType>({items: [], addItem: () => {}});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: Product, size: PizzaSize) => {
    const newCartItem: CartItem = {
      product,
      size,
      quantity: 1,
      product_id: product.id,
      id: '1'
    };

    setItems([newCartItem, ...items])
    
  }
  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => 
  useContext(CartContext);
