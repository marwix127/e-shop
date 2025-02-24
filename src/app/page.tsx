"use client";

import Navbar from "./components/NavBar";
import ProductCard from "./components/ProductCard";
import useProducts from "./hooks/useProducts";
import { useCart } from "./hooks/useCart";

export default function Home() {
  const { products, filteredProducts, loading, sortOption, setSortOption, handleSearch } = useProducts();
  const { cart, handleAddToCart } = useCart();


  const sortedFilteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price_asc") {
      return a.price - b.price;
    } else if (sortOption === "price_desc") {
      return b.price - a.price;
    } else if (sortOption === "name_asc") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "name_desc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <div>
      <Navbar onSearch={handleSearch} cartCount={cart.length} />
      <div className="flex justify-end p-4">
      <select
        className="text-gray-600 font-semibold border rounded-md p-2"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Ordenar por</option>
        <option value="price_asc">Precio: Menor a Mayor</option>
        <option value="price_desc">Precio: Mayor a Menor</option>
        <option value="name_asc">Nombre: A-Z</option>
        <option value="name_desc">Nombre: Z-A</option>
      </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <p className="text-center text-gray-500 mt-4">Cargando productos...</p>
        ) : sortedFilteredProducts.length > 0 ? (
          sortedFilteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">No se encontraron productos.</p>
        )}
      </div>

    </div>
  );
}