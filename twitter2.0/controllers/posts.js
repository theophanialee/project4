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

async function getPosts(req, res) {
  if (!req.user) {
    res.status(401).json({ message: "Not logged in" });
    return;
  }
  try {
    const userPosts = await Post.find({ user: req.user._id }).populate(
      "user",
      "username"
    );
    // The 'populate()' method takes the field to populate ('user') and the fields to include ('username profilePicture')
    res.json(userPosts);
  } catch (error) {
    res.status(404).json({ msg: "Id not found!" });
  }
}

export { createPost, getPosts };
