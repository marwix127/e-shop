"use client";

import { useEffect, useState } from "react";
import { Product } from "./lib/types";
import { fetchProducts } from "./lib/api";
import Navbar from "./components/NavBar";
import ProductCard from "./components/ProductCard";


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");

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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const existingCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(existingCart);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product) => {
    const existingCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = existingCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity = (existingCart[existingProductIndex].quantity || 1) + 1;
    } else {
      existingCart.push({ ...product, quantity: 1 }); // 👈 Siempre se asegura que `quantity` exista
    }

    setCart(existingCart);
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };



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