// 1. Create payment request
export const createPayment = async (orderData) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/payment/create-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: `ORD-${Date.now()}`,
          items: "Awesome T-shirt",
          amount: "1500.00",
          currency: "LKR",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "0771234567",
          address: "No. 1, Galle Road",
          city: "Colombo",
          country: "Sri Lanka",
        }),
      }
    );

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
