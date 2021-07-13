import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    bunkerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bunker",
      required: [true],
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true],
    },
    body: {
      type: String,
    },
    threads: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }]
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
