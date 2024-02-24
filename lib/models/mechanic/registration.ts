import { MongoDBConnector } from "lib/database";
import mongoose, { Schema, Document, Model } from "mongoose";
import { DeliveryMode } from "../booking/booking";

enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

interface Service {
  name: string;
  price: number;
}

interface DayAvailability {
  date: string; // Date in format "dd-mm-yyyy"
  available: boolean;
  timings: string[]; // Array of 2-hour time slots
}

export interface MechanicRegistration extends Document {
  user: mongoose.Types.ObjectId;
  aboutus:string,
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
    monday: DayAvailability;
    tuesday: DayAvailability;
    wednesday: DayAvailability;
    thursday: DayAvailability;
    friday: DayAvailability;
    saturday: DayAvailability;
    sunday: DayAvailability;
  };
  services: Service[];
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
      aboutus: { type: String, required: true }, 
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
          date: { type: String, required: true },
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
        tuesday: {
          date: { type: String, required: true },
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
        wednesday: {
          date: { type: String, required: true },
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
        thursday: {
          date: { type: String, required: true },
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
        friday: {
          date: { type: String, required: true },
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
        saturday: {
          date: { type: String, required: true },
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
        sunday: {
          date: { type: String, required: true },
          available: { type: Boolean, default: false },
          timings: [{ type: String }],
        },
      },
      services: [
        {
          name: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
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
