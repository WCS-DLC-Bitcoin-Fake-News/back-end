import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database connected");
  } catch (error) { 
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;
