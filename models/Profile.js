import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'user'
   },
   social: {
       youtube: {
           type: String
       },
       twitter: {
           type: String
       },
       facebook: {
           type: String
       },
       reddit: {
           type: String
       }
   },
   Interactions: {
       bunkers: {
           type: Int32Array
       },
       contributions: {
           type: Int32Array
       },
       votes: {
           type: Int32Array
       }
    },
    Wallet: {
        type: String,
        required: [true, "A wallet address should be provided"],
    },
    Stake: {
        type: Int32Array
    },
    date: {
        type: Date,
        default: Date.now
    }
},
  { timestamps: true }
);

const ProfileModel = mongoose.model("Profile", ProfileSchema);
export default ProfileModel;