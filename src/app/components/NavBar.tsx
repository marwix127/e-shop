"use client";

import Link from "next/link";

interface NavbarProps {
  onSearch?: (query: string) => void;
  cartCount: number;
}

export default function Navbar({ onSearch, cartCount }: NavbarProps) {
  return (
    <nav className="bg-black text-white p-6 flex justify-between items-center">
      <Link href="/" className="text-3xl font-extrabold italic tracking-wide text-white">E-SHOP</Link>

      <div className="flex items-center gap-4">
        {onSearch && (
          <input
            type="text"
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="px-3 py-2 text-black placeholder-gray-700 rounded-md w-60"
          />
        )}
        <Link href="/history" className="text-white hover:text-gray-300 font-medium">
          Mis Compras
        </Link>
        <button className="relative bg-white text-black px-4 py-2 rounded-md">
          <Link href="/cart">🛒 Carrito</Link>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
