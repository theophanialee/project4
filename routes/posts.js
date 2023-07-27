import express from "express";
import * as postsController from "../controllers/posts.js";

const router = express.Router();

router.post("/newpost", postsController.createPost);
router.get("/getPosts/:username", postsController.getUserPosts);
router.get("/getFollowingPosts", postsController.getFollowingPosts);
router.delete("/delete/:id", postsController.deletePost);
router.get("/onePost/:id", postsController.getOnePost);
router.patch("/like/:id", postsController.addLike);
// router.patch("/repost/:id", postsController.addRepost);
router.post("/reply/:id", postsController.addReply);
router.get("/search/:searchQuery", postsController.searchByUsername);

export default router;
