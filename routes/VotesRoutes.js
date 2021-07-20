import express from "express";
const router = express.Router({mergeParams: true});
import VoteController from "../controllers/VoteController.js";

// create a vote
router.post("/", VoteController.create);

// access a certain vote
router.get("/:id", VoteController.show);

// get all votes
router.get("/", VoteController.index, VoteController.indexByBunker);

// update a certain vote
router.put("/:id", auth, VoteController.update);

// delete a certain vote
router.delete("/:id", VoteController.destroy);

export default router;