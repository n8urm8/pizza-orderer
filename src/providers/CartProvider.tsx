import { createContext, useContext, useState } from "react";
import { CartItem, PizzaSize, Product } from "../types";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: PizzaSize) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};
export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: PizzaSize) => {
    // if already in cart, increment quantity
    const existingItem = items.find(
      (item) => item.product.id === product.id && item.size === size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      product,
      size,
      quantity: 1,
      product_id: product.id,
      // id should be generated
      id: randomUUID(),
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    // find the item in the cart
    const itemToUpdate = items.find((item) => item.id === itemId);
    if (!itemToUpdate) {
      return;
    }

    // if amount is -1 and quantity is 1, remove the item
    if (amount === -1 && itemToUpdate.quantity === 1) {
      setItems(items.filter((item) => item !== itemToUpdate));
      return;
    }

    // else update the quantity
    setItems(
      items.map((item) => {
        if (item.id === itemToUpdate.id) {
          return {
            ...item,
            quantity: item.quantity + amount,
          };
        }
        return item;
      })
    );
  };

  const total = items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
