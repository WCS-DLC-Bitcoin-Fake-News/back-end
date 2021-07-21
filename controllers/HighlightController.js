import HighlightModel from "../models/Hightlight";
import UserModel from "../models/User";
import BunkerModel from "../models/Bunker.js";
import dotenv from "dotenv";
dotenv.config();

// @route POST/highlights/
// @desc create a highlight with a required author and bunkerId
// @access Public


const create = async (req, res) => {
  const { bunkerId, author, content } = req.body;
  try {
    const newHighlight = new HighlightModel({
      bunkerId,
      author,
      content,
    });

    await newHighlight.save();
    await UserModel.findByIdAndUpdate(author, {
      $push: { highlights: newHighlight.id },
    });
    await BunkerModel.findByAndUpdate(bunkerId, {
      $push: { highlights: newHighlight.id },
    });

    res.send(newHighlight);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// @route GET/highlights/:id
// @desc get one highlight
// @access Public

const show = async (req, res) => {
  try {
    let highlight = await HighlightModel.findById(
      req.body.highlightId
    ).populate("author");

    if (!highlight) {
      return res.status(400).json({ msg: "Highlight not found" });
    }
    res.status(200).send(highlight);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route GET/highlights/
// @desc get all highlights
// @access Public

const index = async (req, res, next) => {
  console.log("im in index");
  if (req.params.bunkerId) return next();
  try {
    let highlights = await HighlightModel.find().populate("author");
    res.status(200).json(highlights);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route GET/:bunkerId/highlights/
// @desc get all highlights of a bunker
// @access Public

const indexByBunker = async (req, res) => {
  let bunkerId = req.params.bunkerId;
  console.log(bunkerId);
  try {
    let highlight = await BunkerModel.findById(bunkerId).populate({
      path: "highlights",
      model: "Highlight",
      populate: { path: "author", model: "User" },
    });
    console.log(highlights);
    res.status(200).json(highlights);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route DELETE/highlights/:id
// @desc   delete a highlight
// @access Public

const destroy = async (req, res) => {
  try {
    let highlight = await HighlightModel.findByIdAndRemove(
      req.body.highlightId
    );
    if (!highlight) {
      return res.status(400).json({ msg: "Highlight cannot be deleted" });
    }
    res.status(200).send(Highlight);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default {
  create,
  show,
  index,
  indexByBunker,
  destroy,
};
