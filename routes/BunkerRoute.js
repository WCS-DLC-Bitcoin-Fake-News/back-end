import express from "express";
const router = express.Router();
import bunkersController from "../controller/BunkerController.js";

// create a bunker

router.post("/", bunkersController.create);

// access a certain bunker

router.get("/:id", bunkersController.show);

// get all bunkers (it can overload the client)

router.get("/", bunkersController.index);

// update a certain bunker

router.put("/:id", bunkersController.update);

// delete a certain bunker

router.delete("/:id", bunkersController.destroy);
