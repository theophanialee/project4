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

async function getFollowingPosts(req, res) {
  if (!req.user) {
    res.status(401).json({ message: "Not logged in" });
    return;
  }

  try {
    // Find all posts in the database
    const allPosts = await Post.find().populate("user", "username");

    res.json(allPosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to get following posts" });
  }
}

async function deletePost(req, res) {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    console.log(post.user.toString());
    console.log(req.user._id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You cannot delete this post" });
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete post" });
  }
}

async function getOnePost(req, res) {
  const { id } = req.params; // Use 'req.params' to access the URL parameters

  try {
    // Find the post by its ID in the database
    const post = await Post.findById(id).populate("user", "username");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    console.log(post); // Add this line to see the received data in the server console

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to get the post" });
  }
}

export { createPost, getPosts, getFollowingPosts, deletePost, getOnePost };
