import CommentModel from "../models/Comment.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import UserModel from "../models/User.js";
import BunkerModel from "../models/Bunker.js";
dotenv.config();

// @route POST/comments/
// @desc create a comment with a required author
// @access Public

const create = async (req, res) => {
  const { body, author, bunkerId } = req.body;
  //   const { userId } = req.params;
  try {
    const newComment = new CommentModel({
      bunkerId,
      author,
      body,
    });
    await newComment.save();
    await UserModel.findByIdAndUpdate(author, {
      $push: { comments: newComment.id },
    });
    await BunkerModel.findByIdAndUpdate(bunkerId, {
      $push: { comments: newComment.id },
    });
    res.send(newComment);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// @route GET/comments/:id
// @desc get one comment
// @access Public

const show = async (req, res) => {
  try {
    let comment = await CommentModel.findById(req.body.commentId)
      .populate("author")
      .populate("threads");
    if (!comment) {
      return res.status(400).json({ msg: "Comment not found" });
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route GET/comments/
// @desc get all comments
// @access Public

const index = async (req, res, next) => {
  if (req.params.bunkerId) return next();
  try {
    let comments = await CommentModel.find().populate("author");
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route GET/:bunkerId/comments/
// @desc get all comments of a bunker
// @access Public

const indexByBunker = async (req, res) => {
  let bunkerId = req.params.bunkerId;
  const skip =
    req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;
  try {
    let comments = await BunkerModel.findById(bunkerId)
      .limit(5)
      .populate({
        options: { skip: skip, limit: 5, sort: { createdAt: -1 } },
        path: "comments",
        model: "Comment",
        populate: { path: "author", model: "User" },
      });

    res.status(200).json(comments);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route PUT/comments/:id
// @desc update a comment
// @access Public

const update = async (req, res) => {
  try {
    let comment = await CommentModel.findByIdAndUpdate(
      req.body.bunkerId,
      req.body
    );
    if (!comment) {
      return res.status(400).json({ msg: "Comment not found" });
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route DELETE/comments/:id
// @desc   delete a comment
// @access Public

const destroy = async (req, res) => {
  try {
    let comment = await CommentModel.findByIdAndRemove(
      req.body.bunkerId,
      req.body
    );
    if (!comment) {
      return res.status(400).json({ msg: "Comment cannot be deleted" });
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default {
  create,
  show,
  index,
  indexByBunker,
  update,
  destroy,
};
