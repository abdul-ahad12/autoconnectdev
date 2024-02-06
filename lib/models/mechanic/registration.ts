// models/MechanicRegistration.js

import { MongoDBConnector } from "lib/database";
import mongoose, { Schema, Document, Model } from "mongoose";
import { DeliveryMode } from "../booking/booking";

enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface MechanicRegistration extends Document {
  user: mongoose.Types.ObjectId;
  address: {
    city: string;
    code: string;
  };
  googleMapsLocation: string;
  abn: string;
  approvalStatus: ApprovalStatus;
  availability?: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  services?: string[];
  deliveryMode?: DeliveryMode;
  vehicleTypes?: string[];
}

const mechanicRegistrationSchema: Schema<MechanicRegistration> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    address: {
      city: { type: String, required: true },
      code: { type: String, required: true },
    },
    googleMapsLocation: { type: String, required: true },
    abn: { type: String, required: true, unique: true },
    approvalStatus: {
      type: String,
      enum: Object.values(ApprovalStatus),
      default: ApprovalStatus.PENDING,
    },
    availability: {
      days: { type: [String] },
      startTime: { type: String },
      endTime: { type: String },
    },
    services: { type: [String] },
    deliveryMode: { type: String },
    vehicleTypes: { type: [String] },
  },
  {
    timestamps: true,
  }
);

let MechanicRegistrationModel: mongoose.Model<MechanicRegistration> | mongoose.Model<MechanicRegistration, {}>;
if (!mongoose.models.MechanicRegistration) {
  MechanicRegistrationModel = new MongoDBConnector().getModel<MechanicRegistration>("MechanicRegistration", mechanicRegistrationSchema);
} else {
  MechanicRegistrationModel = mongoose.models.MechanicRegistration as Model<MechanicRegistration>;
}

export { MechanicRegistrationModel, ApprovalStatus };
