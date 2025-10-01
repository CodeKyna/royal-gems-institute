// components/PayHereCheckoutButton.tsx
"use client";

import React from "react";
import { CheckoutRequest } from "@/types";
import { createPayment } from "@/utils/payhere";

export default function PayHereCheckoutButton({
  checkout,
}: {
  checkout: CheckoutRequest;
}) {
  const handleCheckout = async () => {
    createPayment(checkout);
  };

  return (
    <button
      onClick={handleCheckout}
      className="px-4 py-2 rounded bg-sky-600 text-white"
    >
      Pay with PayHere
    </button>
  );
}
