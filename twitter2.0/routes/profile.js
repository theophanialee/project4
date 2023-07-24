import express from "express";
import * as profilesController from "../controllers/profile.js";

const router = express.Router();

router.patch("/update", profilesController.updateProfileDetails);
router.get("/getOneUser", profilesController.findUserById);

export default router;
