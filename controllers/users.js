import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Profile from "../models/Profile.js";

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
async function createUser(req, res) {
  console.log("Creating user...");
  console.log(req.body);
  try {
    // Create a new User document using the model and the request data
    const newUser = await User.create(req.body);
    console.log("New user created:", newUser);
    const token = createJWT(newUser);

    const response = await Profile.create({
      user: newUser._id,
      displaypic: "",
      header: "",
      bio: "",
      birthdate: "",
    });

    res.status(201).json(token);
    console.log("Token sent:", token);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}

async function getUser(req, res) {
  try {
    // Retrieve all users from the MongoDB database
    const users = await User.find();

    // Send the users data as a JSON response
    res.json(users);
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).json({ error: "Failed to retrieve users" });
  }
}

async function checkUn(req, res) {
  const { username } = req.params;
  const normalizedUsername = username.toLowerCase();
  console.log(normalizedUsername);
  try {
    const user = await User.findOne({ normalizedUsername });
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to check through users" });
  }
}

async function login(req, res) {
  const normalizedUsername = req.body.username.toLowerCase();
  console.log(normalizedUsername);
  try {
    const existingUser = await User.findOne({
      $or: [
        { email: req.body.username },
        { normalizedUsername: normalizedUsername },
      ],
    });
    console.log(existingUser);
    if (!existingUser) {
      res
        .status(401)
        .json({ message: "No user associated with this username/e-mail!" });
      return;
    }
    const match = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!match) {
      res.status(401).json({ message: "E-mail and password do not match!" });
      return;
    }
    res.json(createJWT(existingUser));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
async function editUsername(req, res) {
  const { newUsername } = req.body;
  const normalizedUsername = newUsername.toLowerCase();

  try {
    const existingUser = await User.findOne({ normalizedUsername });
    if (existingUser) {
      res.status(409).json({ message: "Username already taken" });
      return;
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { username: newUsername, normalizedUsername: normalizedUsername },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({
        message: "Username updated successfully",
        username: newUsername,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the username" });
  }
}

async function changePassword(req, res) {
  try {
    const userId = req.user._id;
    console.log(userId);
    const user = await User.findById(userId);
    console.log(user);
    console.log("body", req.body);
    const match = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!match) {
      res.status(401).json({ message: "Incorrect password" });
    }
    if (match) {
      const newPassword = req.body.newPassword;
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.updateOne({ _id: userId }, { password: hashedPassword });
      res.json("Successfully updated password");
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function verifiedRequest(req, res) {
  const { verifiedReq } = req.body;
  console.log("post to user", verifiedReq);

  try {
    const user = await User.findById(req.user._id);

    //1. check if user already verified
    if (user.verified === true) {
      return res.status(400).json({ message: "Already a verified user" });
    }

    // 2. Check if user verifiedReq is already filled
    if (user.verifiedReq !== "") {
      return res.status(400).json({ message: "Already requested" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { verifiedReq: verifiedReq }
    );

    if (updatedUser) {
      res.status(200).json({
        message: "Request made successfully",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred whilemaking the request" });
  }
}

async function getRequests(req, res) {
  console.log("[admin] get verified requests");

  try {
    const usersRequested = await User.find({ verifiedReq: { $ne: "" } });
    console.log(usersRequested);
    res.json(usersRequested);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching requests" });
  }
}

async function approveRequest(req, res) {
  const { userId } = req.params;

  try {
    console.log("[admin] approve requests for userId", userId);

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { verifiedReq: "", verified: true },
      { new: true } // This option will return the updated user instead of the old one
    );
    if (updatedUser) {
      console.log(updatedUser);
    } else if (updatedUser.verified === false) {
      console.log("User not found or error in update");
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching requests" });
  }
}

export {
  createUser,
  getUser,
  checkUn,
  login,
  checkToken,
  editUsername,
  changePassword,
  verifiedRequest,
  getRequests,
  approveRequest,
};
