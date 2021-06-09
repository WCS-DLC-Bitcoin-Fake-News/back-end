import express from "express";
import UserModel from "../models/User.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.send("User already exists");
    }
    const newUser = new UserModel({
      name,
      email,
      password,
    });

    await newUser.save();
    res.send("User created succcesfuly");
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

export default router;
