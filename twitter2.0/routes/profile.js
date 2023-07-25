import express from "express";
import * as profilesController from "../controllers/profile.js";

const router = express.Router();

router.patch("/editProfile", profilesController.editProfile);
router.get("/getProfile/:username", profilesController.getProfileByUn);

export default router;
