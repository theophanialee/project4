import express from "express";
import * as usersController from "../controllers/users.js";
import ensureLoggedIn from "../config/ensureLoggedIn.js";

const router = express.Router();

router.post("/", usersController.create);
router.post("/users", usersController.login);
router.get("/check-token", ensureLoggedIn, usersController.checkToken);
router.patch("/changePassword", usersController.changePassword);

export default router;
