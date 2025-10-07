const NEXT_PAYMENT_URL =
  "https://royal-gems-payment-backend-production.up.railway.app/api";

// 1. Create payment request
export const createPayment = async (orderData) => {
  try {
    const {
      address,
      amount,
      city,
      country,
      currency,
      email,
      first_name,
      items,
      last_name,
      order_id,
      phone,
      notify_url,
    } = orderData;
    console.log("This is the payload for payhhere", orderData);
    const response = await fetch(`${NEXT_PAYMENT_URL}/payment/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: order_id,
        items: items,
        amount: amount,
        currency: currency,
        firstName: first_name,
        lastName: last_name,
        email: email,
        phone: phone,
        address: address,
        city: city,
        country: country,
      }),
    });

    if (!response.ok) {
      throw new Error("Payment creation failed");
    }

    const paymentData = await response.json();
    redirectToPayHere(paymentData);
  } catch (error) {
    console.error("Payment error:", error);
    alert("Failed to initiate payment");
  }
};

// 2. Redirect to PayHere
function redirectToPayHere(fields) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://sandbox.payhere.lk/pay/checkout"; // Use 'https://www.payhere.lk/pay/checkout' for production

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    }
  });

  document.body.appendChild(form);
  form.submit();
}

// 3. Verify payment after return
export const verifyPayment = async (orderId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/payment/verify/${orderId}`
    );
    const data = await response.json();

    console.log("Payment status:", data.status);
    return data;
  } catch (error) {
    console.error("Verification error:", error);
  }
};
