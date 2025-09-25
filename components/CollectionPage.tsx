import React from "react";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "../types";

interface CollectionPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const CollectionPage = ({ products, onAddToCart }: CollectionPageProps) => {
  return (
    <div className="max-w-[164rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 border-2 border-amber-500/45 rounded-3xl bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-md *:">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-7xl font-bold text-white mb-3">
          Exquisite
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            {" "}
            Collection
          </span>
        </h1>
        <p className="text-base md:text-3xl text-white/70 max-w-2xl mx-auto">
          Discover our handcrafted jewelry pieces, each telling a unique story
          of elegance and sophistication
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-500 hover:scale-105"
          >
            {/* Product Image */}
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <h3 className="text-base md:text-3xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                {product.name}
              </h3>

              <p className="text-xs md:text-2xl text-white/60 mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-lg md:text-4xl font-bold text-yellow-400">
                  ${product.price.toFixed(2)}
                </span>

                <button
                  onClick={() => onAddToCart(product)}
                  disabled={product.stock_quantity === 0}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-base"
                >
                  <ShoppingCart className="w-15 h-10" />
                  <span className="text-base md:text-3xl">Add to Cart</span>
                </button>
              </div>

              {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                <p className="text-orange-400 text-xs mt-2">
                  Only {product.stock_quantity} left in stock!
                </p>
              )}

              {product.stock_quantity === 0 && (
                <p className="text-red-400 text-xs mt-2">Out of stock</p>
              )}
            </div>

            {/* Glassmorphism overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-white/60 text-2xl">
            No products available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
