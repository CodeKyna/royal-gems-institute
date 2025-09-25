import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  orderNumber: string;
  userId: mongoose.Types.ObjectId;
  items: {
    gemId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
    name: string;
  }[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  paymentMethod: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  notes?: string;
  isSuspicious: boolean;
  refundAmount?: number;
  refundReason?: string;
  refundedBy?: mongoose.Types.ObjectId;
  refundedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    gemId: {
      type: Schema.Types.ObjectId,
      ref: 'Gem',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    name: {
      type: String,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    required: true
  },
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  trackingNumber: {
    type: String
  },
  notes: {
    type: String,
    maxlength: 500
  },
  isSuspicious: {
    type: Boolean,
    default: false
  },
  refundAmount: {
    type: Number,
    min: 0
  },
  refundReason: {
    type: String,
    maxlength: 500
  },
  refundedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  refundedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ isSuspicious: 1 });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);