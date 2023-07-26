import express from "express";
import * as usersController from "../controllers/users.js";
import ensureLoggedIn from "../config/ensureLoggedIn.js";

const router = express.Router();

router.get("/", usersController.getUser);
router.post("/createUser", usersController.createUser);
router.get("/checkUn/:username", usersController.checkUn);
router.post("/login", usersController.login);
router.get("/check-token", ensureLoggedIn, usersController.checkToken);
router.patch("/editUsername", usersController.editUsername);
router.patch("/changePassword", usersController.changePassword);
router.patch("/requestverified", usersController.verifiedRequest);
router.get("/admin/getrequests", usersController.getRequests);

export default router;
