"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/NavBar';
import { usePurchases } from '../hooks/usePurchases';
import { useCart } from '../hooks/useCart';

export default function HistoryPage() {
    const { purchases } = usePurchases();
    const { cart } = useCart();

    return (
        <div>
            <Navbar cartCount={cart.length} />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-8 text-black">Historial de Compras</h1>

                {purchases.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-xl text-gray-600 mb-4">No tienes compras registradas.</p>
                        <Link href="/" className="text-blue-600 hover:underline">
                            Ir a la tienda
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {purchases.map((purchase) => (
                            <div key={purchase.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center sm:flex-row flex-col gap-2">
                                    <div>
                                        <span className="text-sm text-gray-500 uppercase tracking-wider block">ID de Orden</span>
                                        <span className="font-mono font-medium text-black">{purchase.id}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 uppercase tracking-wider block">Fecha</span>
                                        <span className="font-medium text-black">{purchase.date}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 uppercase tracking-wider block">Total</span>
                                        <span className="text-xl font-bold text-green-600">${purchase.total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-gray-700 mb-3 text-sm uppercase">Productos</h4>
                                    <ul className="divide-y divide-gray-100">
                                        {purchase.items.map((item, index) => (
                                            <li key={`${purchase.id}-${item.id}-${index}`} className="py-2 flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-600">
                                                        x{item.quantity}
                                                    </span>
                                                    <span className="text-gray-800">{item.title}</span>
                                                </div>
                                                <span className="text-gray-600 font-medium">
                                                    ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
