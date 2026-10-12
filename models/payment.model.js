
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // Payment Reference
    paymentId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    // Link to Booking or Visa Application
    applicationType: {
      type: String,
      enum: ["booking", "visa"],
      required: true,
    },
    bookingApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookingApplication",
      default: null,
    },
    visaApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VisaApplication",
      default: null,
    },

    // Payment Details
    paymentType: {
      type: String,
      enum: ["prepaid", "postpaid"],
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["cash", "card", "upi", "bank_transfer", "online", "other"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    referenceTxnId: {
      type: String,
      trim: true,
    },

    // Payment Status
    status: {
      type: String,
      enum: ["pending", "successful", "failed", "refunded"],
      default: "pending",
    },

    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
