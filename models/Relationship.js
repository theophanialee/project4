import mongoose from "mongoose";

const relationshipSchema = new mongoose.Schema(
  {
    followerProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    followingProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  {
    timestamps: true,
  }
);

// Create the User model based on the schema
const Relationship = mongoose.model("Relationship", relationshipSchema);

// Export the User model
export default Relationship;
