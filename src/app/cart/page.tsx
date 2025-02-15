"use client";

import { useState, useEffect } from "react";
import { Product } from "../lib/types";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]").map((product: Product) => ({
      ...product,
      quantity: product.quantity ?? 1, // 👈 Nos aseguramos de que `quantity` nunca sea undefined
    }));
  
    setCart(storedCart);
    setTotal(storedCart.reduce((acc: number, product) => acc + product.price * (product.quantity ?? 1), 0)); // 👈 Aquí también evitamos undefined
  }, []);
  
  const handleRemove = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    setTotal(updatedCart.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0)); // 👈 Aquí aseguramos que `quantity` no sea undefined
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  

  const handleChangeQuantity = (productId: number, change: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, (item.quantity ?? 1) + change) } // 👈 Aseguramos que siempre tenga un número válido
        : item
    );
  
    setCart(updatedCart);
    setTotal(updatedCart.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0)); // 👈 Aquí también
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg flex justify-between items-center bg-white">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.title} className="w-16 h-16 object-contain" />
                <div>
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleChangeQuantity(product.id, -1)} className="bg-gray-200 px-2 py-1 rounded-md">➖</button>
                    <span className="text-lg">{product.quantity}</span>
                    <button onClick={() => handleChangeQuantity(product.id, 1)} className="bg-gray-200 px-2 py-1 rounded-md">➕</button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemove(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="text-right text-lg font-bold mt-4">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
      <Link href="/" className="block mt-6 text-blue-600 hover:underline">
        ← Seguir comprando
      </Link>
    </div>
  );
}
