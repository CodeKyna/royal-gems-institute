"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";
import Button from "@mui/material/Button";

import {
  ShoppingCart,
  User,
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import CollectionPage from "@/components/CollectionPage";
import { CartItem, Product, Order } from "../../types";
import { supabase } from "@/lib/supabase";

import { dummyProducts } from "@/lib/data";

function page() {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState("collection");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (data) setProducts(data);
    else setProducts(dummyProducts); // Fallback to dummy data
  };

  console.log();

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar">
      <section className="max-w-[164em] mx-auto flex items-start flex-col min-h-screen py-2 pt-[220px] snap-start">
        <div>
          <h1 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl text-center">
            The Royal Gems Collection
          </h1>
        </div>
        {/* featured section */}
        <div className="flex w-full flex-col md:flex-row md:justify-between gap-10 mt-20 px-5">
          {/* left side on the featured section */}
          <div className="py-10 md:w-1/2 flex flex-col justify-center items-center text-center gap-5">
            <h1 className="font-sans font-bold text-3xl md-text-4xl lg:text-5xl ">
              This Month's Highlight
            </h1>
            <p className="font-mono text-2xl md:text-3xl lg:text-4xl py-5">
              Introducing our most celebrated piece — a masterpiece of
              craftsmanship and heritage. Designed with precision, ethically
              sourced gemstones, and a timeless aesthetic.
            </p>
            <p className="font-mono text-2xl md:text-3xl lg:text-4xl">
              Available for a limited time, this exclusive design embodies the
              artistry and authenticity of the Royal Gems Institute. Don’t miss
              the chance to own a true collector’s piece
            </p>
            <div className="flex justify-center py-10">
              <Button
                sx={{
                  bgcolor: "#6b46c1",
                  "&:hover": { bgcolor: "#9f7aea" },
                  fontSize: "1.5rem",
                  padding: "10px 30px",
                }}
                variant="contained"
                className="mt-5"
              >
                Own This Masterpiece
              </Button>
            </div>
          </div>

          {/* right side on the featured section */}
          <div className="flex justify-center items-center bg-gradient-to-br from-[rgb(145,134,157.0.5)] to-[rgb(255,255,255,0.1)] p-5 rounded-lg md:w-1/2 shadow-lg shadow-gray-400">
            <Image
              src="/lions-heart-necklace.png"
              alt="featured"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
      {/* filter gonna be applied here */}
      <section className="min-h-screen snap-start pt-[220px]">
        <div className="flex-1">
          {currentPage === "collection" && !isAdmin && (
            <CollectionPage products={products} onAddToCart={addToCart} />
          )}
          {/* {currentPage === 'cart' && !isAdmin && (
          <Cart
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onProceedToCheckout={() => setCurrentPage('checkout')}
          />
        )}
        {currentPage === 'checkout' && !isAdmin && (
          <Checkout
            items={cartItems}
            onOrderComplete={() => {
              clearCart();
              setCurrentPage('collection');
              fetchOrders();
            }}
          />
        )}
        {isAdmin && (
          <AdminPanel
            products={products}
            orders={orders}
            onProductsUpdate={fetchProducts}
            onOrdersUpdate={fetchOrders}
          />
        )} */}
        </div>
        {/* adding scrolable to make the product later make sure to delete */}

        <div className="pt-[100px]"></div>
      </section>
    </div>
  );
}

export default page;
