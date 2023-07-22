import express from "express";
import * as postsController from "../controllers/posts.js";
import ensureLoggedIn from "../config/ensureLoggedIn.js";

const router = express.Router();

router.post("/newpost", postsController.createPost);
// router.delete("/deletepost", postsController.deletePost);

export default router;
