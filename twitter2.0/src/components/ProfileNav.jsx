import { useContext, useState } from "react";
import { UserContext } from "../pages/App/App";
import { Link } from "react-router-dom";
import * as userService from "../utilities/users-service";

export default function ProfileNav() {
  const { user, setUser } = useContext(UserContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    console.log("logout");
    userService.logOut();
    setUser(null);
    setDropdownOpen(false); // Close the dropdown after logout
  };

  return (
    <>
      <div className="nav-bar justify-items-center flex items-center w-full h-full  border-t-2 border-purple-900">
        <div
          id="dropdownDelayButton"
          data-dropdown-toggle="dropdownDelay"
          data-dropdown-delay="500"
          className="w-full h-full p-5 text-2xl"
          type="button"
          onClick={toggleDropdown}
        >
          {user.username}
        </div>
        {/* Dropdown menu */}
        <div
          className={`${
            isDropdownOpen ? "block" : "hidden"
          } absolute bottom-full left-1/2 transform -translate-x-1/2 z-10 bg-purple-950 divide-y divide-purple-400 rounded-lg shadow w-full`}
        >
          <ul className="py-2 text-white" aria-labelledby="dropdownDelayButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-purple-300">
                Add an existing user
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-purple-300"
                onClick={handleLogOut}
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
        {/* New div with content */}
        <div className="px-4 pr-5 pb-3 text-3xl text-white">...</div>
      </div>
    </>
  );
}
