import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema(
  {
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    bunker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bunker",
    },
    votes: {
        type: Number,
    },
    pro: {
        type: Boolean,
        default: true,
    },
    stake: {
        type: Number,
    }

  }
  );

  const VoteModel = mongoose.model("Vote", VoteSchema);
  export default VoteModel;
  