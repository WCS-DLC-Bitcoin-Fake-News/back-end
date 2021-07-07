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
           type: Number
       },
       contributions: {
           type: Number
       },
       votes: {
           type: Number
       }
    },
//    // Wallet: {
//         type: String,
//         required: [true, "A wallet address should be provided"],
//     },
//     Stake: {
//         type: Number
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
},
  { timestamps: true }
);

const ProfileModel = mongoose.model("profile", ProfileSchema);
export default ProfileModel;