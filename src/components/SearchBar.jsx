import { useState } from "react";
import sendRequest from "../utilities/send-request";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrMsg] = useState(false);

  const navigate = useNavigate();

  async function handleSearch() {
    navigate(`/search/${searchQuery}`);
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <>
      <div className="w-1/4 h-1/6 fixed top-0 right-0 pt-5 px-5 flex justify-center">
        <input
          className="p-5 h-1/3 rounded-3xl  w-full"
          placeholder="Search @ or #"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>{" "}
    </>
  );
}
