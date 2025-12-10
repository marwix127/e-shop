"use client";

import { useCart } from "../hooks/useCart";
import CartItem from "../components/CartItem";
import Link from "next/link";

export default function CartPage() {
  const { cart, total, handleRemove, handleChangeQuantity } = useCart();

  return (
    <>
      <nav className="bg-black text-white p-6 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold italic tracking-wide text-white">E-SHOP</h1>
      </nav>
      <h1 className="text-3xl font-bold mb-4 mt-5 p-6">🛒 Carrito de Compras</h1>
      <hr className="border-t-2 border-gray-500 mx-5 p-6" />
      <div className="p-6 mx-10 bg-gray-100 rounded-lg">
        {cart.length === 0 ? (
          <p className="text-gray-700">Tu carrito está vacío.</p>
        ) : (
          <div className="space-y-4 mt-10">
            {cart.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                onRemove={handleRemove}
                onChangeQuantity={handleChangeQuantity}
              />
            ))}
            <div className="text-right text-black text-xl font-bold mt-4" data-testid="cart-total">
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