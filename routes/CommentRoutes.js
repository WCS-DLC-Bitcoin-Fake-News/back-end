import express from "express";
const router = express.Router({ mergeParams: true });
import CommentController from "../controllers/CommentController.js";
import ThreadRoutes from "../routes/ThreadRoutes.js"


router.use("/:commentId/threads", ThreadRoutes)

//  create a comment
router.post("/", CommentController.create);

// get one comment
router.get("/:id", CommentController.show);

// get all comments / get all comments of a bunker
router.get("/", CommentController.index, CommentController.indexByBunker);

// update a certain comment
router.put("/:id", CommentController.update);

// delete a certain comment
router.delete("/:id", CommentController.destroy);

export default router;