import mongoose from "mongoose";

const hashtagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Hashtag = mongoose.model("Hashtag", hashtagSchema);
export default Hashtag;