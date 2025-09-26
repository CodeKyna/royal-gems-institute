import React from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { CartItem } from "../types";
import { useRouter } from "next/navigation";

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onProceedToCheckout: () => void;
  onBackToCollection?: () => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemove,
  onProceedToCheckout,
  onBackToCollection,
}) => {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-white/60 mb-8">
            Add some beautiful jewelry to get started
          </p>
          <button
            onClick={() =>
              onBackToCollection
                ? onBackToCollection()
                : router.push("/collection")
            }
            className="mb-6 px-6 py-3 bg-blue-900 text-white rounded-lg font-bold text-lg hover:bg-blue-800 transition"
          >
            ← Back to Exquisit Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
        Shopping Cart
      </h1>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
        {items.map((item, index) => (
          <div
            key={item.product.id}
            className={`p-6 ${index > 0 ? "border-t border-white/10" : ""}`}
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-semibold text-white">
                  {item.product.name}
                </h3>
                <p className="text-lg md:text-xl text-white/60">
                  {item.product.description}
                </p>
                <p className="text-xl md:text-2xl text-yellow-400 font-semibold mt-1">
                  ${item.product.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    onUpdateQuantity(item.product.id, item.quantity - 1)
                  }
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4 text-white" />
                </button>

                <span className="text-white font-medium w-8 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    onUpdateQuantity(item.product.id, item.quantity + 1)
                  }
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="text-right">
                <p className="text-2xl md:text-3xl font-semibold text-white">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="text-red-400 hover:text-red-300 transition-colors mt-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Total and Checkout */}
        <div className="p-6 bg-white/5 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl md:text-3xl font-semibold text-white">
              Total:
            </span>
            <span className="text-3xl md:text-4xl font-bold text-yellow-400">
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={onProceedToCheckout}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 rounded-lg font-bold text-xl md:text-2xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
