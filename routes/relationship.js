import express from "express";
import * as relationshipsController from "../controllers/relationships.js";

const router = express.Router();

router.post("/createFollower", relationshipsController.createFollower);
// router.delete("/deleteFololwer", relationshipsController.deleteFollower);
router.get(
  "/getFollowing/:profileId",
  relationshipsController.getAllFollowingById
);
router.delete("/deleteFollower", relationshipsController.deleteFollower);
router.get(
  "/checkFollowing/:username",
  relationshipsController.checkFollowingByUsername
);

export default router;
