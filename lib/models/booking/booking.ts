// models/Booking.js

import { MongoDBConnector } from "lib/database";
import mongoose, { Schema, Document, Model } from "mongoose";

enum DeliveryMode {
  TO_MECHANIC = "TO_MECHANIC",
  TO_CUSTOMER = "TO_CUSTOMER",
  DISABLED = "DISABLED",
}

// Define an interface for the Booking document
export interface Booking extends Document {
  user: mongoose.Types.ObjectId; // Reference to the customer user
  mechanic: mongoose.Types.ObjectId; // Reference to the booked mechanic
  date: Date;
  deliveryMode: DeliveryMode;
  services: string[]; // List of selected services
  customNote?: string; // Optional custom note for custom services
  isCompleted: boolean;
  invoiceAmount?: number; // Amount to be paid by the customer
  location: {
    city: string;
    code: string;
  };
  vehicleType: string; // "bike" or "car"
}

// Create a Mongoose schema for the Booking
const bookingSchema: Schema<Booking> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mechanic',
      required: true,
    },
    date: { type: Date, required: true },
    deliveryMode: {
      type: String,
      enum: Object.values(DeliveryMode),
      default: DeliveryMode.TO_MECHANIC,
    },
    services: [{ type: String, required: true }],
    customNote: { type: String },
    isCompleted: { type: Boolean, default: false },
    invoiceAmount: { type: Number },
    location: {
      city: { type: String, required: true },
      code: { type: String, required: true },
    },
    vehicleType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

let BookingModel: mongoose.Model<Booking> | mongoose.Model<Booking, {}>;
if (!mongoose.models.Booking) {
  BookingModel = new MongoDBConnector().getModel<Booking>("Booking", bookingSchema);
} else {
  BookingModel = mongoose.models.Booking as Model<Booking>;
}

export { BookingModel, DeliveryMode };
