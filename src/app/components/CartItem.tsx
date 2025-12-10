import { Product } from "../lib/types";

interface CartItemProps {
  product: Product;
  onRemove: (productId: number) => void;
  onChangeQuantity: (productId: number, change: number) => void;
}

export default function CartItem({ product, onRemove, onChangeQuantity }: CartItemProps) {
  return (
    <div className="border p-4 rounded-lg flex justify-between items-center bg-white" data-testid="cart-item">
      <div className="flex items-center gap-4">
        <img src={product.image} alt={product.title} className="w-16 h-16 object-contain" />
        <div>
          <h2 className="text-lg text-black font-semibold">{product.title}</h2>
          <p className="text-black" data-testid="cart-item-price">${product.price.toFixed(2)}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => onChangeQuantity(product.id, -1)} className="bg-gray-200 px-2 py-1 rounded-md">➖</button>
            <span className="text-lg text-black" data-testid="cart-item-quantity">{product.quantity}</span>
            <button onClick={() => onChangeQuantity(product.id, 1)} className="bg-gray-200 px-2 py-1 rounded-md">➕</button>
          </div>
        </div>
      </div>
      <button
        onClick={() => onRemove(product.id)}
        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
      >
        Eliminar
      </button>
    </div>
  );
}