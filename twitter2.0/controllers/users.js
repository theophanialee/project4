import User from "../models/User.js";

async function createUser(req, res) {
  try {
    // Create a new User document using the model and the request data
    const newUser = await User.create(req.body);

    // Respond with the newly created user data
    res.status(201).json(newUser);
    console.log(newUser);
    console.log(req.body);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
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

export { createUser, getUser, checkUn };
