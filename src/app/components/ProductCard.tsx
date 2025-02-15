import { Product } from "../lib/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>
      <button
        className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => onAddToCart(product)}
      >
        Añadir al carrito
      </button>
    </div>
  );
}
