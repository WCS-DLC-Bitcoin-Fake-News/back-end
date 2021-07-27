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

    },
    position: {
        
    },
    comment: {

    }
});

const HighlightModel = mongoose.model("Highlight", HighlightSchema);
export default HighlightModel;


// pdf: {
//     pdfName: "",
//     pdfHighlights:[{
//         highlightId: "",
//         content: {},
//         position: {
//             boundingRect: {},
//             rects: [],
//             pageNumber: Number,
//         },
//         comment: {},
//     }, 
//     ],
// },