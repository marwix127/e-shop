import { useEffect, useState } from "react";
import { Product } from "../lib/types";

export function useCart() {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]").map((product: Product) => ({
      ...product,
      quantity: product.quantity ?? 1,
    }));

    setCart(storedCart);
    setTotal(storedCart.reduce((acc: number, product) => acc + product.price * (product.quantity ?? 1), 0));
  }, []);

  const handleAddToCart = (product: Product) => {
    const existingCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = existingCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity = (existingCart[existingProductIndex].quantity || 1) + 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    setCart(existingCart);
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  const handleRemove = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    setTotal(updatedCart.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleChangeQuantity = (productId: number, change: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, (item.quantity ?? 1) + change) }
        : item
    );

    setCart(updatedCart);
    setTotal(updatedCart.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return { cart, total,handleAddToCart , handleRemove, handleChangeQuantity };
}