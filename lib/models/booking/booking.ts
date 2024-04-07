// models/Booking.js

import { MongoDBConnector } from "lib/database";
import mongoose, { Schema, Document, Model } from "mongoose";

enum DeliveryMode {
  TO_MECHANIC = "TO_MECHANIC",
  TO_CUSTOMER = "TO_CUSTOMER",
  THIRD_PARTY = "THIRD_PARTY",
}

interface Service {
  name: string;
  price: string; // Add price field
}

interface Invoice {
  services: Service[];
  tax: number;
  total: number;
}

interface TimeSlot {
  date: string; // Date in format "YYYY-MM-DD"
  time: string; // Time slot in format "HH:mm AM/PM"
  available: boolean; // Flag to indicate if this slot is available
}

// Define an interface for the Booking document
export interface Booking extends Document {
  user: mongoose.Types.ObjectId; // Reference to the customer user
  mechanic: mongoose.Types.ObjectId; // Reference to the booked mechanic
  timeSlots: TimeSlot; // Array of time slots for this booking
  deliveryMode: DeliveryMode;
  services: Service[]; // List of selected services with name and price
  customNote?: string; // Optional custom note for custom services
  isCompleted: boolean;
  isCancelled: boolean;
  invoice?: Invoice; // Detailed invoice information
  address: {
    street: string;
    suburb: string;
    state: string;
    pinCode: string;
  };

  // vehicleType: string; // "bike" or "car"/
}

// Create a Mongoose schema for the Booking
const bookingSchema: Schema<Booking> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mechanic",
      required: true,
    },
    timeSlots: {
      date: { type: String, required: true }, // Date in format "YYYY-MM-DD"
      time: { type: String, required: true, default: "00:00" }, // Time slot in format "HH:mm AM/PM"
      available: { type: Boolean, default: true }, // Default to true indicating slot is available
    },

    deliveryMode: {
      type: String,
      enum: Object.values(DeliveryMode),
      default: DeliveryMode.TO_MECHANIC,
    },
    services: [{ name: String, price: String }], // Update services array to include name and price
    customNote: { type: String },
    isCompleted: { type: Boolean, default: false },
    isCancelled: { type: Boolean, default: false },
    // invoice: {
    //   // Detailed invoice information
    //   services: [
    //     {
    //       name: { type: String, required: true },
    //       amount: { type: Number, required: true },
    //     },
    //   ],
    //   tax: { type: Number, required: true },
    //   total: { type: Number, required: true },
    //   required:false
    // },
    address: {
      street: { type: String, required: true },
      suburb: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true },
    },

    // vehicleType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

let BookingModel: mongoose.Model<Booking> | mongoose.Model<Booking, {}>;
if (!mongoose.models.Booking) {
  BookingModel = new MongoDBConnector().getModel<Booking>(
    "Booking",
    bookingSchema
  );
} else {
  BookingModel = mongoose.models.Booking as Model<Booking>;
}

export { BookingModel, DeliveryMode };
