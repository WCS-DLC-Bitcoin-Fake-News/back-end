import express from "express";
const router = express.Router({ mergeParams: true });
import CommentController from "../controllers/CommentController.js";

//  create a comment
router.post("/", CommentController.create);

// create a thread
router.post("/:id/threads", CommentController.createThread)

// get one comment
router.get("/:id", CommentController.show);

// get all comments / get all comments of a bunker
router.get("/", CommentController.index, CommentController.indexByBunker);

// get all threads of a comment of a bunker
router.get("/:commentId/threads", CommentController.showThreads)

// update a certain comment
router.put("/:id", CommentController.update);

// delete a certain comment
router.delete("/:id", CommentController.destroy);

export default router;