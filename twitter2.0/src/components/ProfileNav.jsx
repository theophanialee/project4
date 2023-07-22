import { useContext, useState, useRef } from "react";
import "./NavBar.css";
import { UserContext } from "../pages/App/App";
import { Link } from "react-router-dom";
import * as userService from "../utilities/users-service";

export default function ProfileNav() {
  const { user, setUser } = useContext(UserContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleMouseDown = (event) => {
    if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
      // Click inside the dropdown, do not close it.
      return;
    }
    // Click outside the dropdown, close it.
    setDropdownOpen(false);
  };

  function handleLogOut() {
    console.log("logout");
    userService.logOut();
    setUser(null);
    setDropdownOpen(false); // Close the dropdown after logout
  }

  return (
    <>
      <div
        className="nav-bar justify-items-center flex items-center"
        onMouseDown={handleMouseDown}
      >
        {/* Added flex and items-center */}
        <button
          id="dropdownDelayButton"
          data-dropdown-toggle="dropdownDelay"
          data-dropdown-delay="500"
          className="w-full h-full"
          type="button"
          onClick={toggleDropdown}
        >
          {user.username}
        </button>
        {/* Dropdown menu */}
        <div
          ref={dropdownRef}
          className={`${
            isDropdownOpen ? "block" : "hidden"
          } absolute bottom-full left-1/2 transform -translate-x-1/2 z-10 bg-purple-900 divide-y divide-purple-400 rounded-lg shadow w-full`}
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
      </div>
    </>
  );
}
