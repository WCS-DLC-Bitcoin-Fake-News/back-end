import express from "express";
const router = express.Router({mergeParams: true});
import HighlightController from "../controllers/HighlightController";

// create a highlight
router.post("/", HighlightController.create);

// get one highlight
router.get("/:id", HighlightController.show);

// get all highlights / get all highlights of a bunker
router.get("/", HighlightController.index, HighlightController.indexByBunker);

// delete a certain highlight
router.delete("/:id", HighlightController.destroy);