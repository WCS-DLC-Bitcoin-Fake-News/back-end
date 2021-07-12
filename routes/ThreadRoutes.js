import express from "express";
const router = express.Router({ mergeParams: true });
import ThreadController from "../controllers/ThreadController.js";

//  create a Thread
router.post("/", ThreadController.create);

// get one Thread
router.get("/:id", ThreadController.show);

// get all Threads / get all Threads of a bunker
router.get("/", ThreadController.index, ThreadController.indexByComment);

// update a certain Thread
router.put("/:id", ThreadController.update);

// delete a certain Thread
router.delete("/:id", ThreadController.destroy);

export default router;