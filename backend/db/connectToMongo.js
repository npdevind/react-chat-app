import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("connected to mongo");
  } catch (error) {
    console.log("Error in db connection");
  }
};

export default connectToMongo;
