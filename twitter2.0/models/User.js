import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  //   birthdate: {
  //     type: Date,
  //     required: true,
  //     unique: true,
  //   },
});

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

// Export the User model
export default User;
