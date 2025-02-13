"use client";

import { useEffect, useState } from "react";
import { Product } from "./lib/types";
import { fetchProducts } from "./lib/api";
import Navbar from "./components/NavBar";
import ProductCard from "./components/ProductCard";


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data); // Inicialmente, mostramos todos los productos
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products); // Si el input está vacío, mostramos todos los productos
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      {loading ? (
        <p className="text-center text-gray-500 mt-4">Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-4">
              No se encontraron productos.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
