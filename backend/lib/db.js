import mongoose from "mongoose";
import "dotenv/config";

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDb Connected:${conn.connection.host}`);
  } catch (error) {
    console.log("Error Connecting MongoDb " + error);
    process.exit(1);
  }
};

export default connectDatabase;
