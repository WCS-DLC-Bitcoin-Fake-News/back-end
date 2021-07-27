import express from "express";
const router = express.Router({ mergeParams: true });
import bunkerController from "../controllers/BunkerController.js";
import scrap from "../middleware/scrap.js";
import auth from "../middleware/auth.js";
import CommentRoutes from "../routes/CommentRoutes.js";
import scrapTweet from "../middleware/scrapTweet.js";
import VotesRoutes from "../routes/VotesRoutes.js";
import HighlightRoutes from "../routes/HighlightRoutes.js";

// post a vote to a certain bunker
router.use("/:userId/votes", VotesRoutes);

// post a vote to a certain bunker
router.use("/:bunkerId/votes", VotesRoutes);

// post a highlight to a certain bunker
router.use("/:bunkerId/highlights", HighlightRoutes);

// create a bunker
router.post("/", scrap, scrapTweet, bunkerController.create);

// access a certain bunker
router.get("/:id", bunkerController.show);

// get all bunkers (it can overload the client)
router.get("/", bunkerController.index);

// update a certain bunker
router.put("/:id", auth, bunkerController.update);

// delete a certain bunker
router.delete("/:id", bunkerController.destroy);

// show all comments of a bunker
router.use("/:bunkerId/comments", CommentRoutes);

export default router;
