import express from "express";
import * as postsController from "../controllers/posts.js";

const router = express.Router();

router.post("/newpost", postsController.createPost);
router.get("/getPosts", postsController.getPosts);
router.get("/getFollowingPosts", postsController.getFollowingPosts);
// router.delete("/deletepost", postsController.deletePost);

export default router;
