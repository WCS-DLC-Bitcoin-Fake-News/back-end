import mongoose from "mongoose";

const BunkerSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [ true , "We can not save a Bunker without an author" ]
    },
    title: {
      type: String,
      // required: [true, "A title should be provided"],
    },
    body: {
      type: String,
    },

    source: {
        type: String,
        required: [ true , "We can not save a Bunker without a url" ]
      },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }],
    
    // resourcesCounter: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: "Resource",
    // },
    // contributorCounter: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: "User",
    // },
    // flagCounter: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: "Flag",
    // },
    // stakeCounter: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   // Not clear where should the data from the stake is coming, wallet & stake are in Profile.js
    //   ref: "Profile",
    // },
    // deadline: {
    //   type: Date,
    //   required: [true, "Please select an expiration date"],
    // },
    // voteCounter: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: "vote",
    // },
    // consensusBar: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: "resource",
    // },
    tag: {
      type: String,
      // required: [true, "Please select a tag"],
    },
  },
  { timestamps: true }
);

const BunkerModel = mongoose.model("Bunker", BunkerSchema);
export default BunkerModel;
