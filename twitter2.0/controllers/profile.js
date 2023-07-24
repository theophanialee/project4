import User from "../models/User.js";
import Profile from "../models/Profile.js";

async function updateProfileDetails(req, res) {
  try {
    const userId = req.user._id;
    const existingUser = await Profile.findOne({ customerId: userId });
    console.log(userId);
    console.log(req.body);
    if (existingUser) {
      const { name, contactNo, address, preferences, favourites } = req.body;
      await Profile.findOneAndUpdate(
        { customerId: userId },
        {
          name: name,
          contactNo: contactNo,
          address: address,
          $addToSet: { favourites: favourites },
        },
        { new: true } // Include the options object here
      );
      res.status(201).json("success");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function findUserById(req, res) {
  if (!req.user) {
    res.status(401).json({ message: "Not logged in" });
    return;
  }

  try {
    const userId = req.user._id;
    const userDetail = await Profile.findOne({ customerId: userId });
    if (userDetail.length > 0) {
      console.log("routed");
      console.log(userId);
      const newProfile = await Profile.create({ customerId: userId });
      res.json(newProfile);
      return;
    }
    res.json(userDetail);
  } catch {
    res.status(404).json({ msg: "Id not found!" });
  }
}

export { updateProfileDetails, findUserById };
