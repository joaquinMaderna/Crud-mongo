import mongoose from "mongoose";

const DB_URI = 'mongodb://localhost:27017/ManagmentApp';

export const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
