import mongoose from "mongoose";

const bookingApplicationSchema = new mongoose.Schema(
  {
    // Booking Details
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    totalPackagePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Customer Details
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    contactPhone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // Payment Details
    paymentType: {
      type: String,
      trim: true,
    },
    invoiceRef: {
      type: String,
      trim: true,
    },

    // Booking Application Status
    status: {
      type: String,
      enum: [
        "pending",
        "under_review",
        "active",
        "confirmed",
        "completed",
        "canceled",
      ],
      default: "pending",
    },

    // Payment Management
 
payments: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
],


    // Extend Duration / Booking Amendments
    amendments: [
      {
        additionalDays: {
          type: Number,
          default: 0,
          min: 0,
        },
        additionalNights: {
          type: Number,
          default: 0,
          min: 0,
        },
        additionalCharges: {
          type: Number,
          default: 0,
          min: 0,
        },
        amendmentRemarks: {
          type: String,
          trim: true,
        },
        amendedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const BookingApplication = mongoose.model(
  "BookingApplication",
  bookingApplicationSchema
);

export default BookingApplication;