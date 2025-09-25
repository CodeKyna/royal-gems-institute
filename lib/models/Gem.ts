import mongoose, { Document, Schema } from 'mongoose';

export interface IGem extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  specifications: {
    carat?: number;
    color?: string;
    clarity?: string;
    cut?: string;
    certification?: string;
  };
  isActive: boolean;
  sellerId?: mongoose.Types.ObjectId;
  approvedBy?: mongoose.Types.ObjectId;
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const GemSchema = new Schema<IGem>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: ['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Pearl', 'Other']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  specifications: {
    carat: { type: Number, min: 0 },
    color: { type: String, maxlength: 50 },
    clarity: { type: String, maxlength: 50 },
    cut: { type: String, maxlength: 50 },
    certification: { type: String, maxlength: 100 }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  approvalStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 1
  }
}, {
  timestamps: true
});

// Indexes
GemSchema.index({ category: 1, isActive: 1 });
GemSchema.index({ price: 1 });
GemSchema.index({ approvalStatus: 1 });
GemSchema.index({ sellerId: 1 });

export default mongoose.models.Gem || mongoose.model<IGem>('Gem', GemSchema);