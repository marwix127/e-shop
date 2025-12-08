"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../hooks/useCart';
import { usePurchases } from '../hooks/usePurchases';
import { Purchase } from '../lib/types';

export default function Checkout() {
    const { cart, total, clearCart } = useCart();
    const { addPurchase } = usePurchases();
    const [purchase, setPurchase] = useState<Purchase | null>(null);

    const handlePurchase = () => {
        if (cart.length === 0) return;

        const newPurchase: Purchase = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            items: cart,
            total: total,
        };

        addPurchase(newPurchase);
        clearCart();
        setPurchase(newPurchase);
    };

    if (purchase) {
        return (
            <div className="p-10 max-w-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 mt-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">¡Compra Exitosa!</h1>
                    <p className="text-black mt-2">Gracias por tu compra. Aquí tienes tu factura.</p>
                </div>

                <div className="border-t border-b border-gray-200 py-6 mb-6">
                    <div className="flex justify-between mb-2">
                        <span className="text-black">ID de Orden:</span>
                        <span className="font-mono font-medium">{purchase.id}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-black">Fecha:</span>
                        <span className="font-medium">{purchase.date}</span>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="font-bold text-black mb-4 uppercase text-sm tracking-wider">Detalles de la Compra</h3>
                    <div className="space-y-3">
                        {purchase.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-black font-medium">x{item.quantity}</span>
                                    <span className="text-black">{item.title}</span>
                                </div>
                                <span className="font-medium text-black">${(item.price * (item.quantity ?? 1)).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-8">
                    <span className="text-xl font-bold text-black">Total Pagado</span>
                    <span className="text-2xl font-bold text-green-600">${purchase.total.toFixed(2)}</span>
                </div>

                <div className="text-center">
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 font-bold text-white bg-black border-2 border-black rounded-lg
      hover:bg-white hover:text-black transition duration-200"
                    >
                        Volver a la tienda
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <nav className="mb-6">
                <Link
                    href="/cart"
                    className="text-gray-400 hover:text-white transition flex items-center gap-2"
                >
                    ← Volver al carrito
                </Link>
            </nav>
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            {cart.length === 0 ? (
                <p>No hay items en el carrito para comprar.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-xl text-black font-bold mb-4">Resumen del Pedido</h2>
                        <ul className="space-y-4 mb-6">
                            {cart.map((item) => (
                                <li key={item.id} className="flex justify-between items-center bg-white p-3 rounded shadow-sm">
                                    <div>
                                        <span className="text-black font-bold block text-sm">{item.title}</span>
                                        <span className="text-xs text-black">Cantidad: {item.quantity}</span>
                                    </div>
                                    <span className="text-black font-medium">${(item.price * (item.quantity ?? 1)).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="border-t pt-4 flex justify-between items-center">
                            <span className="text-xl text-black font-bold">Total:</span>
                            <span className="text-2xl text-black font-bold">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 h-fit">
                        <h2 className="text-xl text-black font-bold mb-4">Confirmar Compra</h2>
                        <p className="mb-6 text-black">Al confirmar, se generará una factura y se limpiará tu carrito actual. ¡Gracias por tu preferencia!</p>
                        <button
                            onClick={handlePurchase}
                            className="w-full px-6 py-4 font-bold text-white bg-green-600 rounded-xl
              hover:bg-green-700 transition shadow-lg text-lg transform hover:-translate-y-1"
                        >
                            Confirmar y Pagar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
