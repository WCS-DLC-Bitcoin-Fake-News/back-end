import BunkerModel from "../models/Bunker.js";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import auth from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

// post a bunker to the db

const create = async (req, res) => {
  console.log("create");
  const { author, title, body } = req.body;
  try {
    const newBunker = new BunkerModel({
      author: req.user.id,
      title,
      body,
    });
    await newBunker.save();
    await UserModel.updateOne(
      { id: req.params.id },
      { $push: { bunkers: newBunker.id } }
    );

    res.send(newBunker);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
};
// @route   GET/bunkers/
// @desc    GET all bunkers from one user
// @access  Public
const index = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id).populate("bunkers");
    res.status(200).json(user.bunkers);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
};

export { create, index };
