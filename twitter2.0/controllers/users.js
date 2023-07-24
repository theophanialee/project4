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
  try {
    // Create a new User document using the model and the request data
    const newUser = await User.create(req.body);
    const token = createJWT(newUser);

    const response = await Profile.create({
      user: newUser._id, // Include the _id of the newly created User
      displaypic: "",
      header: "",
      bio: "",
      birthdate: "",
    });

    // Respond with the newly created user data
    res.status(201).json(token);
    console.log(token);
    console.log(newUser);
  } catch (error) {
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

export { createUser, getUser, checkUn, login, checkToken, editUsername };
