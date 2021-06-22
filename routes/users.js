
import express from "express";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
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

    const payload = {
      user: { id: newUser.id },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
});

// @route   POST/users/login
// @desc    Authenticate user and get token
// @access  Public
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
});

// @route   GET/users/:id
// @desc    Request one user
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
});

// @route   GET/users/
// @desc    Request all users
// @access  Public
router.get("/", async (req, res) => {
  try {
    let user = await UserModel.find({}).select("-password").limit(2);
    if (!user) {
      return res.status(400).json({ msg: "User list not found" });
    }
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
});

// @route   PUT/users/
// @desc    Edit one user
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    let user = await UserModel.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
});

// @route   DELETE/users/
// @desc    Delete one user
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    let user = await UserModel.findByIdAndRemove(req.params.id, req.body);
    if (!user) {
      return res.status(400).json({ msg: "User cannot be deleted" });
    }
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
});

export default router;
