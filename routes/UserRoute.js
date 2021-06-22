
import express from "express";
const router = express.Router();
import usersController from "../controllers/UserController.js";


// Register user
router.post("/signup", usersController.create);

// Authenticate user and get token
router.post("/signin", usersController.authorize);

// Request one user
router.get("/:id", usersController.show);

// Request all users
router.get("/", usersController.index);

// Edit one user
router.put("/:id", usersController.update);

// Delete one user
router.delete("/:id", usersController.destroy);

export default router;
