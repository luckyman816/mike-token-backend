import mongoose from "mongoose";
import config from "../config";

const db: string = config.mongoURI;

const connectDB = async () => {
  try {
    mongoose.connect(db);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
