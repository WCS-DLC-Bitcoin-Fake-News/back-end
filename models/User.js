import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name should be provided"],
  },
  email: {
    type: String,
    unique: true,
    validate: [
      (val) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val),
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    minLength: [8, "Password should be 8 or more characters"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
