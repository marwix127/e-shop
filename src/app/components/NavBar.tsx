"use client";

import Link from "next/link";

interface NavbarProps {
  onSearch: (query: string) => void;
  cartCount: number;
}

export default function Navbar({ onSearch, cartCount }: NavbarProps) {
  return (
    <nav className="bg-black text-white p-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">E-SHOP</h1>
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Buscar productos..."
        className="px-3 py-2 text-black rounded-md w-60"
      />
      <button className="relative bg-white text-blue-600 px-4 py-2 rounded-md">
  <Link href="/cart">🛒 Carrito</Link>
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
      {cartCount}
    </span>
  )}
</button>
    </nav>
  );
}
