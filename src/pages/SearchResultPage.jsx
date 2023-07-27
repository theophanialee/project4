import { useParams } from "react-router";
import sendRequest from "../utilities/send-request";
import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import PostCard from "../components/PostCard";
import SearchProfileResultCard from "../components/SearchProfileResultCard";

export default function SearchResultPage() {
  const [errMsgProfile, setErrMsgProfile] = useState(false);
  const [errMsgTag, setErrMsgTag] = useState(false);
  const { searchQuery } = useParams();
  const [userResults, setUserResults] = useState([]);
  const [tagResults, setTagResults] = useState([]);

  async function handleSearch() {
    console.log("search:", searchQuery);
    handleSearchProfiles();
    handleSearchHashtags();
  }

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  async function handleSearchProfiles() {
    try {
      const users = await sendRequest(`/api/profiles/search/${searchQuery}`);
      console.log(users);
      setUserResults(users);
      setErrMsgProfile(false);
    } catch (error) {
      console.log(error);
      setErrMsgProfile(true);
    }
  }

  async function handleSearchHashtags() {
    try {
      const posts = await sendRequest(`/api/hashtags/search/${searchQuery}`);
      console.log(posts);
      setTagResults(posts);
      setErrMsgTag(false);
    } catch (error) {
      console.log(error);
      setErrMsgTag(true);
    }
  }

  return (
    <>
      <h1 className="m-5">Search result for "{searchQuery}"</h1>
      <div className="m-5 text-sm">Users results</div>
      {errMsgProfile ? (
        <div className="m-5">No user found for "{searchQuery}"</div>
      ) : (
        <SearchProfileResultCard
          profiles={userResults}
          users={userResults.map((profile) => profile.user)}
        />
      )}
      <div className="m-5 text-sm">Posts results</div>
      {errMsgTag ? (
        <div className="m-5">No post found for "{searchQuery}"</div>
      ) : (
        <>
          <PostCard
            user={tagResults.map((post) => post.user)}
            posts={tagResults}
          />
        </>
      )}
    </>
  );
}
