import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    bunkerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bunker",
      required: [true],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true],
    },
    body: {
      type: String,
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
