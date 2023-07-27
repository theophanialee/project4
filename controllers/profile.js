import User from "../models/User.js";
import Profile from "../models/Profile.js";

async function editProfile(req, res) {
  try {
    const userId = req.user._id;
    const existingUser = await Profile.findOne({ user: userId });
    console.log(userId);
    console.log(req.body);
    if (existingUser) {
      await Profile.findOneAndUpdate({ user: userId }, req.body);
      res.status(201).json("success");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function getProfileByUn(req, res) {
  const { username } = req.params;
  console.log(username);

  if (!username) {
    res.status(400).json({ message: "Username parameter is missing" });
    return;
  }

  try {
    const user = await User.findOne({ username });
    console.log("user", user);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userId = user._id.toString();
    console.log("userId", userId);
    const userProfile = await Profile.findOne({ user: userId });

    console.log(userProfile);
    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
async function searchByUsername(req, res) {
  const { searchQuery } = req.params;

  console.log("search by username", searchQuery);

  const users = await User.find({
    username: { $regex: searchQuery, $options: "i" },
  });

  if (users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  const userIds = users.map((user) => user._id);
  // console.log(userIds);

  const profiles = await Profile.find({ user: { $in: userIds } }).populate(
    "user",
    "username"
  );
  // console.log(profiles);

  res.json(profiles);
}

export { editProfile, getProfileByUn, searchByUsername };
