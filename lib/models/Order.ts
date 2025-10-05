import mongoose, { Schema, Document } from "mongoose";

// ---------------- Billing Details ----------------
const BillingDetailsSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

// ---------------- Order Item ----------------
const OrderItemSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  product: {
    _id: { type: Schema.Types.ObjectId, ref: "Product" },
    name: String,
    description: String,
    price: Number,
    image_url: String,
    category: String,
  },
});

// ---------------- Order ----------------
const OrderSchema = new Schema(
  {
    total_amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    billing_details: { type: BillingDetailsSchema, required: true },
    payment_status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    payment_id: { type: String }, // e.g., PayHere/Stripe/PayPal transaction ID
    order_items: [OrderItemSchema], // embedded array of items
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// ---------------- Model ----------------
export const Order = mongoose.model("Order", OrderSchema);
