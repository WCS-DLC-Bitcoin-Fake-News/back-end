import BunkerModel from "../models/Bunker.js";
import UserModel from "../models/User.js";
import VoteModel from "../models/Vote.js";
import dotenv from "dotenv";

// @route POST/votes/
// @desc create a vote with a required author
// @access Public

const create = async (req, res, next) => {
  const { author, pro, votes } = req.body;
  const { bunkerId } = req.params;
  console.log(req.body, bunkerId);

  try {
    const voteExist = await VoteModel.exists({ author, bunkerId, pro });
    //const bunkerExists = await bunkerId.exists({ bunkerId: bunkerId});
    console.log(voteExist);

    if (voteExist) {
      console.log("Vote exists for this user");
      let vote = await VoteModel.findOne({ author, bunkerId, pro });
      // find the vote
      await vote.update({
        votes: vote.votes + 1,
        stake: Math.pow(vote.votes + 1, 2),
      });

      return res.send(vote);
    }

    const newVote = new VoteModel({
      ...req.body,
      bunkerId,
    });
    await newVote.save();
    await UserModel.findByIdAndUpdate(author, {
      $push: { votes: newVote._id },
    });

    await BunkerModel.findByIdAndUpdate(bunkerId, {
      $push: { votes: newVote._id },
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
    let vote = await VoteModel.findById(req.body.voteId).populate("author");
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
  console.log(bunkerId);
  console.log("indexByBunker");
  try {
    let votes = await BunkerModel.findById(bunkerId).populate("votes");
    console.log(votes);
    res.status(200).json(votes);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route GET/:userId/votes/
// @desc get all votes of an user
// @access Public

const indexByUser = async (req, res) => {
  let userId = req.params.userId;
  console.log(userId);
  console.log("indexByBunker");
  try {
    let votes = await UserModel.findById(userId).populate("votes");
    console.log(votes);
    res.status(200).json(votes);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @route PUT/votes/:id
// @desc update a vote
// @access Public

const update = async (req, res) => {
  console.log("i am in update");
  try {
    let vote = await VoteModel.findByIdAndUpdate(req.body.votes);
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
    let vote = await VoteModel.findByIdAndRemove(req.body.votes);
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
  indexByUser,
  update,
  destroy,
};
