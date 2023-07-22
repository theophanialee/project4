import mongoose from "mongoose";

// Define the User schema
const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `User`,
    },
    followers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Follower`,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Following`,
    },
    displaypic: {
      type: URL,
    },
    header: {
      type: URL,
    },
    bio: {
      type: String,
    },
    birthdate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

// Export the User model
export default Profile;
