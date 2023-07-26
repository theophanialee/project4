import { useParams } from "react-router";
import sendRequest from "../utilities/send-request";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import ProfileCard from "../components/ProfileCard";

export default function SearchResultPage() {
  const [errorMsg, setErrMsg] = useState(false);
  const { searchQuery } = useParams();
  const [results, setResults] = useState([]);

  async function handleSearch() {
    console.log("search:", searchQuery);
    try {
      const results = await sendRequest(`/api/posts/search/${searchQuery}`);
      console.log(results);
      setResults(results);
    } catch (error) {
      console.log(error);
      setErrMsg(true);
    }
  }

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <h1 className="m-5">Search result for "{searchQuery}"</h1>
      {errorMsg && <div>{errorMsg}</div>}
      <ProfileCard
        profiles={results}
        users={results.map((profile) => profile.user)}
      />
    </>
  );
}
