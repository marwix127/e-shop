import { Product } from "../lib/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white flex flex-col h-full">
      <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
      <h2 className="text-lg text-black font-semibold mt-2">{product.title}</h2>
      <p className="text-gray-800">${product.price}</p>

      {/* Contenedor flexible que empuja el botón hacia abajo */}
      <div className="flex-grow"></div>

      <button
        className="mt-2 w-full bg-black text-white py-2 rounded-md hover:bg-zinc-700 transition"
        onClick={() => onAddToCart(product)}
      >
        Añadir al carrito
      </button>
    </div>
  );
}
