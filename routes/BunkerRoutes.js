import express from "express";
const router = express.Router({mergeParams: true});
import bunkerController from "../controllers/BunkerController.js";

// create a bunker
router.post("/", bunkerController.create);

// access a certain bunker
router.get("/:id", bunkerController.show);

// get all bunkers (it can overload the client)
router.get("/", bunkerController.index);

// update a certain bunker
router.put("/:id", bunkerController.update);

// delete a certain bunker
router.delete("/:id", bunkerController.destroy);

export default router;