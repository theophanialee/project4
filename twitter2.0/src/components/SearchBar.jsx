import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Perform the search action with the searchQuery
    console.log("Search triggered with query:", searchQuery);
  };

  const handleKeyPress = (e) => {
    // Check if Enter key (keyCode 13) was pressed
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <div className="w-1/4 h-1/6 fixed top-0 right-0 pt-5 px-5 flex justify-center">
      <input
        className="p-5 h-1/3 rounded-3xl  w-full"
        placeholder="Search Tea"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}
