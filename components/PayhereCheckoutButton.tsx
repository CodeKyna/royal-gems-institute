// components/PayHereCheckoutButton.tsx
"use client";
import React from "react";

type CheckoutRequest = {
  order_id: string;
  items: string;
  amount: number;
  currency?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
};

export default function PayHereCheckoutButton({
  checkout,
}: {
  checkout: CheckoutRequest;
}) {
  const handleCheckout = async () => {
    try {
      const resp = await fetch("/api/proxy/payhere/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkout),
      });

      if (!resp.ok) {
        const err = await resp.json();
        alert("Error creating checkout: " + (err.error || JSON.stringify(err)));
        return;
      }

      const { payload } = await resp.json();

      // Build a form and submit to PayHere
      const form = document.createElement("form");
      form.method = "POST";
      form.action = payload.action;
      // add hidden inputs for all keys
      Object.entries(payload).forEach(([k, v]) => {
        if (k === "action") return;
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = String(v ?? "");
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error(err);
      alert("Unexpected error while creating checkout");
    }
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
