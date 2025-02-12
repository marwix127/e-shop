"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "../lib/api";
import { Product } from "../lib/types";
import ProductCard from "./ProductCard";


export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
