import Post from "../models/Post.js";
import User from "../models/User.js";

async function createPost(req, res) {
  try {
    // Create a new Post document using the model and the request data
    const newPost = await Post.create({
      user: req.user._id,
      content: req.body.content,
    });
    console.log(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
}

export { createPost };
