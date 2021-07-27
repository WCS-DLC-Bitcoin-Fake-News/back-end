import CommentModel from "../models/Comment.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import UserModel from "../models/User.js";
import BunkerModel from "../models/Bunker.js";
dotenv.config();


// @route POST/comments/threads
// @desc create a thread with a required author and required comment Id
// @access Public

const create = async (req, res) => {
  console.log(req.params)
  const { body, author, bunkerId, commentId } = req.body;
  //   const { userId } = req.params;
  try {
    const newComment = new CommentModel({
      bunkerId,
      author,
      body,
      commentId,
    });
    await newComment.save();
    await UserModel.findByIdAndUpdate(author, {
      $push: { comments: newComment.id },
    });
    await BunkerModel.findByIdAndUpdate(bunkerId, {
      $push: { comments: newComment.id },
    });
    await CommentModel.findByIdAndUpdate(commentId, {
      $push: { threads: newComment.id },
    });
    res.send(newComment);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// @route GET/comments/threads
// @desc get all threads of a comment
// @access Public

const show = async (req, res) => {
  let commentId = req.params.commentId;
  try {
    let threads = await CommentModel.findById(commentId).populate({
      path: 'threads',
      model: 'Comment',
      populate: {
        path: 'author',
        model: 'User'
      }
    });
    res.status(200).json(threads)
  } catch (error) {
    res.status(400).send(error);
  }
}

export default {
  create,
  show
};
