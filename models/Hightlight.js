import mongoose from "mongoose";

const HighlightSchema = new mongoose.Schema({
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
    content: {
        type: String,
    }
});

const HighlightModel = mongoose.model("Highlight", HighlightSchema);
export default HighlightModel;
