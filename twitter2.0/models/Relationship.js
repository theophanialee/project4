import mongoose from "mongoose";

const relationshipSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    follwing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
