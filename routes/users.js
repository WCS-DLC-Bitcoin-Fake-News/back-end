import express from "express";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
const router = express.Router();

// @route   POST/users/signup
// @desc    Register user
// @access  Public
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).send("User already exists");
    }
    const newUser = new UserModel({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    res.send("User created succcesfuly");
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
});

export default router;
