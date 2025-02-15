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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {loading ? (
          <p className="text-center text-gray-500 mt-4">Cargando productos...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">
            No se encontraron productos.
          </p>
        )}
      </div>
    </div>
  );
}