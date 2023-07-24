import Relationship from "../models/Relationship";

async function createFollower(req, res) {
  try {
    const response = await Profile.create({
      follwer: req.user._id, // Logged in user
      // following: req.body._id, // userId of the profile
    });

    // Respond with the newly created user data
    console.log("createFollower");
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
}

async function deleteFollower(req, res) {
  //findOne
  try {
    const response = await Profile.create({
      follwer: req.user._id, // Logged in user
      // following: req.body._id, // userId of the profile
    });

    // Respond with the newly created user data
    console.log("deleteFollower");
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
}

export { createFollower, deleteFollower };
