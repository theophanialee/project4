import express from "express";
import * as postsController from "../controllers/posts.js";

const router = express.Router();

router.post("/newpost", postsController.createPost);
router.get("/getPosts", postsController.getPosts);
router.get("/getFollowingPosts", postsController.getFollowingPosts);
router.delete("/delete/:id", postsController.deletePost);
router.get("/onePost/:id", postsController.getOnePost);

export default router;
