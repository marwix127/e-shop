import { Product } from "../lib/types";


export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
      <h2 className="text-lg font-bold">{product.title}</h2>
      <p className="text-gray-700">${product.price}</p>
    </div>
  );
}
