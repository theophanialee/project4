import Post from "../models/Post.js";
import User from "../models/User.js";

async function createPost(req, res) {
  try {
    // Create a new Post document using the model and the request data
    const newPost = await Post.create({
      user: req.user._id,
      content: req.body.content,
      likes: [],
      reposts: [],
      replies: [],
    });
    console.log(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
}

async function getPosts(req, res) {
  const { username } = req.params;

  if (!username) {
    res.status(400).json({ message: "Username parameter is missing" });
    return;
  }

  try {
    const profileUser = await User.findOne({ username });

    if (!profileUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userPosts = await Post.find({ user: profileUser._id }).populate(
      "user",
      "username"
    );

    res.json(userPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    console.log(post); // Add this line to see the received data in the server console

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to get the post" });
  }
}

async function addLike(req, res) {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const post = await Post.findById(id).populate("likes", "username");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const hasLiked = post.likes.some((likeUserId) => likeUserId.equals(userId));

    if (hasLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    const updatedPost = await post.save();
    const likeCount = updatedPost.likes.length;
    const likedUsers = updatedPost.likes.map((user) => ({
      id: user._id,
      username: user.username,
    }));

    res.json({
      post: updatedPost,
      likeCount: likeCount,
      likedUsers: likedUsers,
      hasLiked: hasLiked,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add/remove like to/from post" });
  }
}

async function addReply(req, res) {
  console.log("addreply");
  const { id } = req.params;
  console.log(id);

  try {
    const originalPost = await Post.findById(id);

    if (!originalPost) {
      return res.status(404).json({ error: "Original post not found" });
    }
    const newReply = new Post({
      user: req.user._id,
      content: req.body.content,
      likes: [],
      reposts: [],
      replies: [],
    });

    originalPost.replies.push(newReply.user);
    console.log("reply user id", newReply.user);
    await originalPost.save(); // Save the updated original post with the added reply

    // Save the new reply post to the database
    await newReply.save();

    // Respond with the newly created reply post
    res.status(201).json(newReply);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

export {
  createPost,
  getPosts,
  getFollowingPosts,
  deletePost,
  getOnePost,
  addLike,
  addReply,
};
