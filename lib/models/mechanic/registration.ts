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
    street: string;
    suburb: string;
    state: string;
    pinCode: string;
  };
  googleMapsLocation: string;
  abn: string;
  approvalStatus: ApprovalStatus;
  availability: {
    monday: {
      available: boolean;
      timings: string[]; // Array of 2-hour time slots
    };
    tuesday: {
      available: boolean;
      timings: string[]; // Array of 2-hour time slots
    };
    wednesday: {
      available: boolean;
      timings: string[]; // Array of 2-hour time slots
    };
    thursday: {
      available: boolean;
      timings: string[]; // Array of 2-hour time slots
    };
    friday: {
      available: boolean;
      timings: string[]; // Array of 2-hour time slots
    };
    saturday: {
      available: boolean;
      timings: string[]; // Array of 2-hour time slots
    };
    sunday: {
      available: boolean;
      timings: string[]; // Array of 2-hour time slots
    };
  };
  services: string[];
  deliveryMode: DeliveryMode;
  vehicleTypes: string[];
}

const mechanicRegistrationSchema: Schema<MechanicRegistration> =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },
      address: {
        street: { type: String, required: true },
        suburb: { type: String, required: true },
        state: { type: String, required: true },
        pinCode: { type: String, required: true },
      },
      googleMapsLocation: { type: String, required: true },
      abn: { type: String, required: true, unique: true },
      approvalStatus: {
        type: String,
        enum: Object.values(ApprovalStatus),
        default: ApprovalStatus.PENDING,
      },
      availability: {
        monday: {
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
        tuesday: {
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
        wednesday: {
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
        thursday: {
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
        friday: {
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
        saturday: {
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
        sunday: {
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
      },
      services: [{ type: String }],
      deliveryMode: { type: String }, // You can choose DeliveryMode enum if needed
      vehicleTypes: [{ type: String }],
    },
    {
      timestamps: true,
    }
  );

let MechanicRegistrationModel:
  | mongoose.Model<MechanicRegistration>
  | mongoose.Model<MechanicRegistration, {}>;
if (!mongoose.models.MechanicRegistration) {
  MechanicRegistrationModel =
    new MongoDBConnector().getModel<MechanicRegistration>(
      "MechanicRegistration",
      mechanicRegistrationSchema
    );
} else {
  MechanicRegistrationModel = mongoose.models
    .MechanicRegistration as Model<MechanicRegistration>;
}

export { MechanicRegistrationModel, ApprovalStatus };
