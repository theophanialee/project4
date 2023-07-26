import mongoose from "mongoose";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 6; // 6 is a reasonable value

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    normalizedUsername: {
      type: String,
      required: true,
      unique: true,
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
    admin: {
      type: Boolean,
      required: true,
    },
    verified: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
    // Even though it's hashed - don't serialize the password
    // toJSON: {
    //   transform: function (doc, ret) {
    //     delete ret.password;
    //     return ret;
    //   },
    // },
  }
);

userSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

// Export the User model
export default User;
