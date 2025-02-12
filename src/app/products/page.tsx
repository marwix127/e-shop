
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../lib/api";

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}