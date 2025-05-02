import mongoose from "mongoose";

export const connectDB = async () => {
  const { MONGO_URL } = process.env;

  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGO_URL ?? "");
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  const dbConn = mongoose.connection;

  dbConn.on("connected", () => {
    console.log(`Database connected: ${MONGO_URL}`);
  });

  dbConn.on("error", (err) => {
    console.log(`Database error: ${err}`);
  });
};
