// models/service.js
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
