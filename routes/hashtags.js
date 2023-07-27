import express from "express";
import * as hashtagController from "../controllers/hashtags.js";

const router = express.Router();

router.get("/getTrends", hashtagController.getTrendingTags);
router.get("/search/:searchQuery", hashtagController.searchByHashtag);

export default router;
