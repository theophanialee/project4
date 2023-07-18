import express from "express";
import * as usersController from "../controllers/users.js";
// import ensureLoggedIn from "../config/ensureLoggedIn.js";

const router = express.Router();

router.post("/createUser", usersController.createUser);
router.get("/", usersController.getUser);

export default router;
