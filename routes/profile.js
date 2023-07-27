import express from "express";
import * as profilesController from "../controllers/profile.js";

const router = express.Router();

router.patch("/editProfile", profilesController.editProfile);
router.get("/getProfile/:username", profilesController.getProfileByUn);
router.get("/search/:searchQuery", profilesController.searchByUsername);

export default router;
