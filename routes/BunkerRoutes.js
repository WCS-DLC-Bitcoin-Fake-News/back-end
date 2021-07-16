import express from "express";
const router = express.Router({mergeParams: true});
import bunkerController from "../controllers/BunkerController.js";
import scrap from "../middleware/scrap.js"
import auth from "../middleware/auth.js";
import CommentRoutes from "../routes/CommentRoutes.js";

// create a bunker
router.post("/", scrap, bunkerController.create);

// access a certain bunker
router.get("/:id", bunkerController.show);

// get all bunkers (it can overload the client)
router.get("/", bunkerController.index);

// update a certain bunker
router.put("/:id", auth, bunkerController.update);

// delete a certain bunker
router.delete("/:id", bunkerController.destroy);

// show all comments of a bunker
router.use("/:bunkerId/comments", CommentRoutes)

export default router;