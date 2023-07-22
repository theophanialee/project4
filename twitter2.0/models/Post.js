import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
      maxlength: 280,
    },
  },
  {
    timestamps: true,
  }
);

// Create the User model based on the schema
const Post = mongoose.model("Post", postSchema);

// Export the User model
export default Post;
