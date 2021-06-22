import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: [true, "A title should be provided"],
    },
    linkedMedia: {
        thumbnail: {
           type: String,
           required: true,
        },
        thumbnailTitle: {
           type: String,
        },
        thumbnailDescription: {
           type: String,
        },
    },
    postDescription: {
        type: String,
        required: [true, "Please provide a description of your research"],
    },
    resourcesCounter: {
        type: [Schema.Types.ObjectId],
        ref: 'resource',
    },
    contributorCounter: {
        type: [Schema.Types.ObjectId],
        ref: 'user',
    },
    flagCounter: {
        type: [Schema.Types.ObjectId],
        ref: 'flag',
    },
    stakeCounter: {
        type: [Schema.Types.ObjectId],
        //Not clear where should the data from the stake is coming, wallet & stake are in Profile.js
        ref: 'profile', 
    },
    deadline: {
        deadlineDate: {
            type: Date,
            required: [true, "Please select an expiration date"],
        },
        dayCount: {
            type: String,
        
        }
    },
    voteCounter: {
        type: [Schema.Types.ObjectId],
        ref: 'vote',
    },
    consensusBar: {
        type: [Schema.Types.ObjectId],
        ref: 'resource',
    },
    tag: {
        type: String,
        required: [true, "Please select a tag"],
    }
},
{ timestamps: true }
);

const PostModel = mongoose.model("post", ProfileSchema);
export default PostModel;
