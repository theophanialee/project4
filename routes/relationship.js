import express from "express";
import * as relationshipsController from "../controllers/relationships.js";

const router = express.Router();

router.post("/createFollower", relationshipsController.createFollower);
// router.delete("/deleteFololwer", relationshipsController.deleteFollower);
router.get(
  "/getFollowing/:profileId",
  relationshipsController.getAllFollowingById
);

export default router;
