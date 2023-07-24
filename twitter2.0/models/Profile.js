import mongoose from "mongoose";

// Define the User schema
const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `User`,
      unique: true,
    },
    displaypic: {
      type: String,
    },
    header: {
      type: String,
    },
    bio: {
      type: String,
    },
    birthdate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

// Export the User model
export default Profile;
