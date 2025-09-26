import React, { useState } from "react";
import { CartItem, BillingDetails } from "../types";
import { supabase } from "../lib/supabase";

interface CheckoutProps {
  items: CartItem[];
  onOrderComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onOrderComplete }) => {
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Sri Lanka",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          total_amount: total,
          status: "pending",
          billing_details: billingDetails,
          payment_status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Simulate PayHere payment integration
      // In production, you would integrate with PayHere API here
      setTimeout(() => {
        // Update payment status
        supabase
          .from("orders")
          .update({
            payment_status: "completed",
            status: "processing",
            payment_id: "ph_" + Date.now(),
          })
          .eq("id", order.id);

        alert("Payment successful! Order has been placed.");
        onOrderComplete();
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error("Error processing order:", error);
      alert("Failed to process order. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-[168em] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Billing Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Billing Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold text-white/80 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={billingDetails.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-white/80 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={billingDetails.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold text-white/80 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-white/80 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={billingDetails.phone}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-white/80 mb-1">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={billingDetails.address}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold text-white/80 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={billingDetails.city}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-white/80 mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={billingDetails.postalCode}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold text-white/80 mb-1">
                Country *
              </label>
              <select
                name="country"
                value={billingDetails.country}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-lg text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="India">India</option>
                <option value="Maldives">Maldives</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 rounded-lg font-bold text-2xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 disabled:opacity-50"
            >
              {isProcessing
                ? "Processing..."
                : `Pay with PayHere - $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Order Summary
          </h2>
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-xl font-semibold text-white">
                      {item.product.name}
                    </p>
                    <p className="text-white/60 text-lg">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-yellow-400">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-8 pt-6">
            <div className="flex items-center justify-between text-2xl">
              <span className="font-bold text-white">Total:</span>
              <span className="font-bold text-yellow-400">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
