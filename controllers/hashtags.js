import Hashtag from "../models/Hashtag.js";

const hashtagRegex = /#[A-Za-z0-9_]+/g;

async function getTrendingTags(req, res) {
  console.log("get trends");
  try {
    const hashtags = await Hashtag.find();

    const hashtagCounts = {};
    hashtags.forEach((hashtag) => {
      // hashtag.posts is an array of post Ids
      const count = hashtag.posts.length;
      hashtagCounts[hashtag.name] = count;
    });
    console.log(hashtagCounts);

    const sortedHashtags = Object.keys(hashtagCounts).sort(
      (a, b) => hashtagCounts[b] - hashtagCounts[a]
    );

    // filter the top 5 hashtags
    const top5Hashtags = sortedHashtags.slice(0, 5);

    res.json(top5Hashtags);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending hashtags" });
  }
}

async function searchByHashtag(req, res) {
  const { searchQuery } = req.params;

  console.log("search by hashtag", searchQuery);

  const hashtag = await Hashtag.find({
    name: { $regex: searchQuery, $options: "i" },
  }).populate({
    path: "posts",
    populate: {
      path: "user",
      model: "User",
    },
  });

  console.log(hashtag);
  const postsArray = hashtag.map((hashtag) => hashtag.posts);
  console.log(postsArray);
  res.json(postsArray[0]);
}

export { getTrendingTags, searchByHashtag };
