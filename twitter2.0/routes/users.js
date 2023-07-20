import express from "express";
import * as usersController from "../controllers/users.js";
// import ensureLoggedIn from "../config/ensureLoggedIn.js";

const router = express.Router();

router.get("/", usersController.getUser);
router.post("/createUser", usersController.createUser);
router.get("/checkUn/:username", usersController.checkUn);

export default router;
