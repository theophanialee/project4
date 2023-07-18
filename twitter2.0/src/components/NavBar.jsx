import { Link } from "react-router-dom";

export default function NavBar({ user }) {
  const getPath = (path) => (user ? path : "/login");

  return (
    <>
      <ul className="bg-gray-900 h-full w-1/4 p-4">
        <li>
          {" "}
          <Link to={getPath("/")}>Home</Link>
        </li>
        <li>
          {" "}
          <Link to={getPath("/explore")}>Explore</Link>
        </li>
        <li>
          {" "}
          <Link to={getPath("/notifications")}>Notifications</Link>
        </li>
        <li>
          {" "}
          <Link to={getPath("/messages")}>Mesages</Link>
        </li>
        <li>
          {" "}
          <Link to={getPath("/lists")}>Lists</Link>
        </li>
        <li>
          {" "}
          <Link to={getPath("/profile")}>Profile</Link>
        </li>
        <li>
          {" "}
          <Link to={getPath("/settings")}>Settings</Link>
        </li>
        <li>
          {" "}
          <button className="bg-blue-500">
            <Link to={getPath("/post")}>Tweet</Link>
          </button>
        </li>
      </ul>
    </>
  );
}
