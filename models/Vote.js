import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema(
  {
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    bunkerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bunker",
    },
    votes: {
        type: Number,
        default: 1
    },
    pro: {
        type: Boolean,
        default: true,
    },
    stake: {
        type: Number,
        default: 1
    }

  }
  );

  const VoteModel = mongoose.model("Vote", VoteSchema);
  export default VoteModel;
  