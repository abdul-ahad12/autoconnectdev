import mongoose, { Schema, Document, Model } from "mongoose";
import { MongoDBConnector } from "@/lib/database";

// Define an interface for the CustomOrder document
export interface CustomOrder extends Document {
  user: mongoose.Types.ObjectId; // Reference to the user who placed the order
  mechanicOffers: {
    mechanic: mongoose.Types.ObjectId;
    price: number;
    availableDate: Date;
  }[]; // Array of mechanic's offers with price and availability date
  selectedMechanic: mongoose.Types.ObjectId | null; // Reference to the selected mechanic
  street: string;
  city: string;
  suburb: string;
  pincode: string;
  carName: string;
  manufacturingYear: number;
  detailedText: string;
  accepted: boolean; // Field to mark if the custom order has been accepted
}

// Create a Mongoose schema for the CustomOrder
const customOrderSchema: Schema<CustomOrder> = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mechanicOffers: [
      {
        mechanic: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MechanicRegistration",
        },
        price: Number,
        availableDate: Date,
      },
    ],
    selectedMechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MechanicRegistration",
      default: null,
    },
    street: { type: String, required: true },
    city: { type: String, required: true },
    suburb: { type: String, required: true },
    pincode: { type: String, required: true },
    carName: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    detailedText: { type: String, required: true },
    accepted: { type: Boolean, default: false }, // Default to false
  },
  {
    timestamps: true,
  }
);

let CustomOrderModel:
  | mongoose.Model<CustomOrder>
  | mongoose.Model<CustomOrder, {}>;
if (!mongoose.models.CustomOrder) {
  CustomOrderModel = new MongoDBConnector().getModel<CustomOrder>(
    "CustomOrder",
    customOrderSchema
  );
} else {
  CustomOrderModel = mongoose.models.CustomOrder as Model<CustomOrder>;
}

export { CustomOrderModel };
