// models/Invoice.js

import { MongoDBConnector } from "lib/database";
import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the Invoice document
export interface Invoice extends Document {
  booking: mongoose.Types.ObjectId; // Reference to the associated booking
  customer: mongoose.Types.ObjectId; // Reference to the customer user
  mechanic: mongoose.Types.ObjectId; // Reference to the booked mechanic
  amount: number;
  isPaid: boolean;
  paymentDate?: Date;
}

// Create a Mongoose schema for the Invoice
const invoiceSchema: Schema<Invoice> = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
      unique: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mechanic',
      required: true,
    },
    amount: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paymentDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

let InvoiceModel: mongoose.Model<Invoice> | mongoose.Model<Invoice, {}>;
if (!mongoose.models.Invoice) {
  InvoiceModel = new MongoDBConnector().getModel<Invoice>("Invoice", invoiceSchema);
} else {
  InvoiceModel = mongoose.models.Invoice as Model<Invoice>;
}

export { InvoiceModel };
