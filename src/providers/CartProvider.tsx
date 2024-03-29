import { createContext, useContext, useState } from "react";
import { CartItem, PizzaSize, Tables } from "../types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";

type Product = Tables<"products">;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: PizzaSize) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};
export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {}
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { mutate: insertOrder} = useInsertOrder()
  const { mutate: insertOrderItems} = useInsertOrderItems()
  const router = useRouter()

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

  const clearCart =() => {
    setItems([])

  }

  const checkout = () => {
    // @ts-expect-error uesr_id added in query
    insertOrder({total}, {
      onSuccess: (data) => {
        saveOrderItems(data)
      }})
  }

  const saveOrderItems = (order: Tables<'orders'>) => {
    const orderItems = items.map(cartItem => {return {
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }})

    insertOrderItems(orderItems)


    clearCart(); 
    router.push(`/(user)/orders/${order.id}`)

  }

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
