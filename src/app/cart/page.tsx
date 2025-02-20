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
    < >
    <h1 className="text-3xl font-bold mb-4 mt-5 p-6">🛒 Carrito de Compras</h1>
    <hr className="border-t-2 border-gray-500 mx-5 p-6" />
    <div className="p-6 mx-10 bg-gray-100 rounded-lg">
      {cart.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4 mt-10 ">
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
          <div className="text-right text-xl font-bold mt-4">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
     <div className="flex justify-between items-center mt-6">
  <Link
    href="/"
    className="px-4 py-2 font-bold text-white bg-black border-2 border-black rounded-2xl
      hover:bg-white hover:text-black transition"
  >
    ← Seguir comprando
  </Link>

  <Link
    href="/checkout"
    className="px-6 py-2 font-bold text-white bg-black border-2 border-black rounded-2xl
      hover:bg-white hover:text-black transition"
  >
    Pagar
  </Link>
</div>
    </div>
    </>
  );
}
