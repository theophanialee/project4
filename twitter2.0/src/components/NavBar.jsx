import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ user }) {
  const getPath = (path) => (user ? path : "/login");

  return (
    <>
      <div className="h-full flex flex-col">
        <ul>
          <img src="./fish.png" className="" alt="Logo" />

          <li className="NavBarItem">
            <Link to={getPath("/")}>Home</Link>
          </li>
          <li className="NavBarItem">
            <Link to={getPath("/explore")}>Explore</Link>
          </li>
          <li className="NavBarItem">
            <Link to={getPath("/notifications")}>Notifications</Link>
          </li>
          <li className="NavBarItem">
            <Link to={getPath("/messages")}>Messages</Link>
          </li>
          <li className="NavBarItem">
            <Link to={getPath("/lists")}>Lists</Link>
          </li>
          <li className="NavBarItem">
            <Link to={getPath("/profile")}>Profile</Link>
          </li>
          <li className="NavBarItem">
            <Link to={getPath("/settings")}>Settings</Link>
          </li>
          <li className="flex-grow">
            <button className="bg-blue-600 rounded-full w-28 mt-5 text-xl">
              <Link to={getPath("/post")}>Tweet</Link>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
