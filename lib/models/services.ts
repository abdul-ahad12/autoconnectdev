// models/service.js
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

let Service;

try {
  // If the model has already been defined, retrieve it
  Service = mongoose.model("Service");
} catch (error) {
  // If the model hasn't been defined yet, define it
  Service = mongoose.model("Service", serviceSchema);
}

export default Service;
