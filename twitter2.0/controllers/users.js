import User from "../models/User.js";

async function createUser(req, res) {
  const { username, email, password } = req.body;
  console.log(req.body);

  try {
    // Create a new User document using the model and the request data
    const newUser = await User.create({
      username,
      email,
      password,
    });

    // Respond with the newly created user data
    res.status(201).json(newUser);
    console.log(newUser);
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

export { createUser, getUser };
