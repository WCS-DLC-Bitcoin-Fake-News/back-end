import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
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
    reputation: {
      type: Int8Array,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
