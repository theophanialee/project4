import Profile from "../models/Profile.js";
import Relationship from "../models/Relationship.js";
import User from "../models/User.js";

async function createFollower(req, res) {
  try {
    // Fetch the Profile document based on the provided username
    const followingUser = await User.findOne({ username: req.body.following });
    const followingUserId = followingUser._id.toString();
    const followingProfile = await Profile.findOne({ user: followingUserId });
    if (!followingProfile) {
      return res.status(404).json({ error: "Following profile not found" });
    }
    const followingProfileId = followingProfile._id;

    const followerProfile = await Profile.findOne({ user: req.user._id });
    if (!followerProfile) {
      return res.status(404).json({ error: "Follower profile not found" });
    }
    const followerProfileId = followerProfile._id;

    const existingRelationship = await Relationship.findOne({
      followerUserId: req.user._id,
      followingUserId: followingUserId,
    });

    if (existingRelationship) {
      return res.status(409).json({ error: "Relationship already exists" });
    }

    const response = await Relationship.create({
      followingUserId: followingUserId,
      followingProfileId: followingProfileId,
      followerUserId: req.user._id,
      followerProfileId: followerProfileId,
    });

    console.log("created Follower rs", response);
    // res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create relationship" });
  }
}

async function getAllFollowingById(req, res) {
  const { profileId } = req.params;
  console.log("profileId", profileId);

  try {
    const data = await Relationship.find({ followerProfileId: profileId })
      .populate("followingUserId")
      .populate("followingProfileId");

    // console.log(data);

    // const filteredData = data.filter(
    //   (relationship) => relationship.followerProfileId === profileId
    // );

    // console.log("filteredData", filteredData);

    // const followingProfiles = data.map((relationship) => ({
    //   _id: relationship.followingProfileId._id,
    //   displayname: relationship.followingProfileId.displayname,
    //   displaypic: relationship.followingProfileId.displaypic,
    //   bio: relationship.followingProfileId.bio,
    //   birthdate: relationship.followingProfileId.birthdate,
    // }));

    // const followingUsers = data.map((relationship) => ({
    //   _id: relationship.followingUserId._id,
    //   username: relationship.followingUserId.username,
    // }));

    // console.log("Following Profiles:", followingProfiles);
    // console.log("Following Users:", followingUsers);

    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getAllFollowingData:", error);
  }
}

export { createFollower, getAllFollowingById };
