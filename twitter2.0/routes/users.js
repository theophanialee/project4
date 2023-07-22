import express from "express";
import * as usersController from "../controllers/users.js";
import ensureLoggedIn from "../config/ensureLoggedIn.js";

const router = express.Router();

router.get("/", usersController.getUser);
router.post("/createUser", usersController.createUser);
router.get("/checkUn/:username", usersController.checkUn);
router.post("/login", usersController.login);
router.get("/check-token", ensureLoggedIn, usersController.checkToken);

export default router;
