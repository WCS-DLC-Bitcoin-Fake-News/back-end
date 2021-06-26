import bunkers from "../routes/BunkerRoute.js";
import express from "express";
const router = express.Router();
import {
  create,
  login,
  show,
  index,
  update,
  destroy,
} from "../controllers/UserController.js";

// Register user
router.post("/signup", create);

// Authenticate user and get token
router.post("/signin", login);

// Request one user
router.get("/:id", show);

// Request all users
router.get("/", index);

// Edit one user
router.put("/:id", update);

// Delete one user
router.delete("/:id", destroy);

//GET all bunkers from one user
router.get("/:user_id/bunkers", bunkers);

export default router;
