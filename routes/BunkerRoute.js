import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();
import { create, index } from "../controllers/BunkerController.js";

// create a bunker

router.post("/", auth, create);

// get a certain bunker
/* router.get("/:id", show);
 */
// get all bunkers (it can overload the client)
router.get("/", index);

// update a certain bunker

/* router.put("/:id", update); */

// delete a certain bunker

/* router.delete("/:id", destroy); */

export default router;
