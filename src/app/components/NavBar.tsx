
import { useState } from "react";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Llamar a la función de búsqueda
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">E-shop</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Buscar productos..."
        className="px-3 py-2 text-black rounded-md w-60"
      />
    </nav>
  );
}
