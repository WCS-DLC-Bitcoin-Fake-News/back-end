import express from "express";
const router = express.Router({ mergeParams: true });
import ThreadController from "../controllers/ThreadController.js";

//  create a Thread
router.post("/", ThreadController.create);

// get all threads of a comment
router.get("/", ThreadController.show);

export default router;