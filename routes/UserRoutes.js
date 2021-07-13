import express from "express";
const router = express.Router({mergeParams: true});
import BunkerRoutes from "./BunkerRoutes.js"
import userController from "../controllers/UserController.js";

// Register user
router.post("/signup", userController.create);

// Authenticate user and get token
router.post("/signin", userController.authorize);

// Request one user
router.get("/:id", userController.show);

// Request all users
router.get("/", userController.index);

// Edit one user
router.put("/:id", userController.update);

// Delete one user
router.delete("/:id", userController.destroy);

// Access bunkers resource by user id (this is a nested route)
router.use("/:userId/bunkers", (req, res, next) => {
    console.log("i am here before pdf")
    let thisUserIdIsTheUserIdLoggedIn = true
    if(thisUserIdIsTheUserIdLoggedIn) next()
    else res.error(403, "You can not create a bunker")
}, BunkerRoutes);


export default router;