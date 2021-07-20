import BunkerModel from "../models/Bunker.js";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import auth from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

// @route   POST/bunkers/
// @desc    create a bunker with a required author
// @access  Public

const create = async (req, res, next) => {

  const { userId } = req.params;
  try {
    const newBunker = new BunkerModel({
      author: userId,
      ...req.body,
    });
    await newBunker.save();
    await UserModel.findByIdAndUpdate(userId, {
      $push: { bunkers: newBunker.id },
    });

    res.send(newBunker);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
};
// @route   GET/bunkers/
// @desc    GET all bunkers
// @access  Public
const index = async (req, res) => {
  try {
    const skip =
      req.query.skip && /^\d+$/.test(req.query.skip)
        ? Number(req.query.skip)
        : 0;
    let bunkers = await BunkerModel.find()
      .skip(skip)
      .limit(8)
      .where("published")
      .equals(true);
    res.status(200).json(bunkers);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
};

// @route   GET/bunkers/:id
// @desc    get a bunker by id
// @access  Public
const show = async (req, res) => {
  try {
    let bunker = await BunkerModel.findOne({ _id: req.params.id }).populate(
      "author"
    );

    if (!bunker) {
      return res.status(400).json({ msg: "User not found" });
    }
    res.status(200).send(bunker);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
};

// @route   PUT/bunkers/:id
// @desc    edit a bunker
// @access  Public
const update = async (req, res) => {
  console.log(req.body, req.params);
  try {
    let user = await BunkerModel.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
};

// @route   DELETE/bunkers/:id
// @desc    delete a user's bunker
// @access  Public
const destroy = async (req, res) => {
  try {
    let user = await BunkerModel.findByIdAndRemove(req.params.id, req.body);
    if (!user) {
      return res.status(400).json({ msg: "User cannot be deleted" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
};

export default {
  create,
  show,
  index,
  update,
  destroy,
};
