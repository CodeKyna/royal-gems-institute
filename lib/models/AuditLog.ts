import mongoose, { Document, Schema } from 'mongoose';

export interface IAuditLog extends Document {
  adminId: mongoose.Types.ObjectId;
  adminEmail: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
}

const AuditLogSchema = new Schema<IAuditLog>({
  adminId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  adminEmail: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'LOGIN',
      'LOGIN_FAILED',
      'LOGOUT', 
      'PASSWORD_RESET',
      'USER_CREATE',
      'USER_UPDATE',
      'USER_DELETE',
      'USER_SUSPEND',
      'USER_ACTIVATE',
      'ROLE_CHANGE',
      'PRODUCT_CREATE',
      'PRODUCT_UPDATE',
      'PRODUCT_DELETE',
      'ORDER_UPDATE',
      'ORDER_REFUND',
      'ORDER_CANCEL',
      'FILE_UPLOAD',
      'SETTINGS_UPDATE',
      '2FA_ENABLE',
      '2FA_DISABLE'
    ]
  },
  resource: {
    type: String,
    required: true
  },
  resourceId: {
    type: String
  },
  details: {
    type: Schema.Types.Mixed,
    default: {}
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  success: {
    type: Boolean,
    required: true
  },
  errorMessage: {
    type: String
  }
}, {
  timestamps: false // We use our own timestamp field
});

// Index for performance and querying
AuditLogSchema.index({ adminId: 1, timestamp: -1 });
AuditLogSchema.index({ action: 1, timestamp: -1 });
AuditLogSchema.index({ timestamp: -1 });
AuditLogSchema.index({ success: 1, timestamp: -1 });

export default mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);