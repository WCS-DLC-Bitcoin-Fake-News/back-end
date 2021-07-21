import BunkerModel from "../models/Bunker.js";
import UserModel from "../models/User.js";
import VoteModel from "../models/Vote.js"; 
import dotenv from "dotenv";

// @route POST/votes/
// @desc create a vote with a required author
// @access Public

const create = async (req, res) => { 
    const { author, bunkerId } = req.body
};

export default {
    create,
    // show,
    // index,
    // update,
    // destroy,
  };
  