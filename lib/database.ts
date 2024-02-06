import mongoose, { ConnectOptions, Document, Model, Schema, deleteModel } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

class MongoDBConnector {
  private connection: mongoose.Connection;

  constructor() {
    const options: ConnectOptions = {};

    mongoose.connect(process.env.MONGO_DB_URI, options);
    this.connection = mongoose.connection;

    this.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });

    this.connection.once("open", () => {
      console.log("Connected to MongoDB Atlas");
    });
  }

  getModel<T extends Document>(name: string, schema: Schema<T>): Model<T> {
    return mongoose.model<T>(name, schema);
  }

  deleteModel(name: string): void {
    deleteModel(name);
  }

  async findById<T extends Document>(model: Model<T>, id: string): Promise<T | null> {
    try {
      const result = await model.findById(id);
      return result;
    } catch (err) {
      console.error("Error executing query:", err);
      throw new Error(`Error executing query: ${err}`);
    }
  }

  async find<T extends Document>(model: Model<T>, conditions: object): Promise<T[] | undefined> {
    try {
      const result = await model.find(conditions);
      return result.length ? result : undefined;
    } catch (err) {
      console.error("Error executing query:", err);
      throw new Error(`Error executing query: ${err}`);
    }
  }

  async deleteAllRecords<T extends Document>(model: Model<T>): Promise<any> {
    try {
      const result = await model.deleteMany();
      return result;
    } catch (err) {
      console.error("Error executing query:", err);
      throw new Error(`Error executing query: ${err}`);
    }
  }

  async deleteOneRecord<T extends Document>(model: Model<T>, conditions: object): Promise<any> {
    try {
      const result = await model.deleteOne(conditions);
      return result;
    } catch (err) {
      console.error("Error executing query:", err);
      throw new Error(`Error executing query: ${err}`);
    }
  }

  async close(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("MongoDB connection closed");
    } catch (err) {
      throw new Error(`Error closing MongoDB connection: ${err}`);
    }
  }

  async seedInitialData<T extends Document>(model: Model<T>, data: T[]): Promise<void> {
    try {
      await model.insertMany(data);
      console.log("Initial data seeded successfully");
    } catch (err) {
      console.error("Error seeding initial data:", err);
      throw new Error(`Error seeding initial data: ${err}`);
    }
  }
}

export { MongoDBConnector };
