import express from "express";
import * as postsController from "../controllers/posts.js";
import ensureLoggedIn from "../config/ensureLoggedIn.js";

const router = express.Router();

router.post("/newpost", postsController.createPost);
router.get("/getPosts", postsController.getPosts);
// router.delete("/deletepost", postsController.deletePost);

export default router;
