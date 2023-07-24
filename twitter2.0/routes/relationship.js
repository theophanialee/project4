import express from "express";
import * as relationshipsController from "../controllers/relationships.js";

const router = express.Router();

router.post("/createFollwer", relationshipsController.createFollower);
router.delete("/deleteFollwer", relationshipsController.deleteFollower);

export default router;
