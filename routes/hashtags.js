// hashtags.js
import express from "express";
import * as hashtagController from "../controllers/hashtags.js";

const router = express.Router();

router.get("/getTrends", hashtagController.getTrendingTags);

export default router;
