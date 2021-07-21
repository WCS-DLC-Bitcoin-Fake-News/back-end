import BunkerModel from "../models/Bunker.js";
import UserModel from "../models/User.js";
import VoteModel from "../models/Vote.js"; 
import dotenv from "dotenv";

// @route POST/votes/
// @desc create a vote with a required author
// @access Public

const create = async (req, res) => { 
    const { author, bunkerId, votes, pro, stake } = req.body
    console.log(req.body);
try {
    const newVote = new VoteModel({
      bunkerId,
      author,
      votes,
      pro,
      stake,
    });
    await newVote.save();
    await UserModel.findByIdAndUpdate(author, {
      $push: { votes: newVote.id },
    });
    await BunkerModel.findByIdAndUpdate(bunkerId, {
      $push: { votes: newVote.id },
    });
    res.send(newVote);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// @route GET/votes/:id
// @desc get one vote
// @access Public

const show = async (req, res) => {
  try {
    let vote = await VoteModel.findById(req.body.voteId)
      .populate("author")
    if (!vote) {
      return res.status(400).json({ msg: "Vote not found" });
    }
    res.status(200).send(vote);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route GET/votes/
// @desc get all votes
// @access Public

const index = async (req, res, next) => {
  console.log('im in index')
  if (req.params.bunkerId) return next();
  try {
    let votes = await VoteModel.find().populate("author");
    res.status(200).json(votes);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route GET/:bunkerId/votes/
// @desc get all votes of a bunker
// @access Public

const indexByBunker = async (req, res) => {
  let bunkerId = req.params.bunkerId;
  console.log(bunkerId)
  try {
    let votes = await BunkerModel.findById(bunkerId).populate({path: 'votes', model: 'vote', populate: {path: 'author', model: 'User'}});
      console.log(votes)
    res.status(200).json(votes);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route PUT/votes/:id
// @desc update a vote
// @access Public

const update = async (req, res) => {
  try {
    let vote = await VoteModel.findByIdAndUpdate(
      req.body.votes,
    );
    if (!vote) {
      return res.status(400).json({ msg: "vote not found" });
    }
    res.status(200).send(vote);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route DELETE/votes/:id
// @desc   delete a vote
// @access Public

const destroy = async (req, res) => {
  try {
    let vote = await VoteModel.findByIdAndRemove(
      req.body.votes,
    );
    if (!vote) {
      return res.status(400).json({ msg: "vote cannot be deleted" });
    }
    res.status(200).send(vote);
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
  