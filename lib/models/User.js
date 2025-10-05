"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import mongoose from "mongoose";
var mongoose_1 = mongoose;
var UserSchema = new mongoose_1.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 12,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    role: {
      type: String,
      enum: ["SuperAdmin", "Admin", "Moderator", "User"],
      default: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    twoFactorSecret: {
      type: String,
      select: false,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    lastLogin: {
      type: Date,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
// Index for performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });
// Virtual for account lock status
UserSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil.getTime() > Date.now());
});
exports.default =
  mongoose_1.default.models.User ||
  mongoose_1.default.model("User", UserSchema);
