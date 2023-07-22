import { Link } from "react-router-dom";
import "./NavBar.css";
import ProfileNav from "./ProfileNav";
import { useContext, useState } from "react";
import { UserContext } from "../pages/App/App";
import NewPostPopUp from "../pages/NewPostPopUp";

export default function NavBar() {
  const { user } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);

  const handleFishClick = () => {
    console.log("new post popup", showPopup);
    setShowPopup(true);
  };

  return (
    <div className="nav-bar p-10">
      <ul>
        <img src="./fish.png" className="" alt="Logo" />
        <li className="NavBarItem">
          <Link to="/">Home</Link>
        </li>
        <li className="NavBarItem">
          <Link to="/explore">Explore</Link>
        </li>
        <li className="NavBarItem">
          <Link to="/notifications">Notifications</Link>
        </li>
        <li className="NavBarItem">
          <Link to="/messages">Messages</Link>
        </li>
        <li className="NavBarItem">
          <Link to="/lists">Lists</Link>
        </li>
        <li className="NavBarItem">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="NavBarItem">
          <Link to="/settings">Settings</Link>
        </li>
        <div className="flex-grow">
          <button
            onClick={handleFishClick}
            className="bg-purple-600 rounded-full w-28 mt-5 text-xl"
          >
            Fish
          </button>
        </div>
        <li className="NavBarItem mt-10 p-5 rounded-lg bg-purple-900">
          <Link to="/reqVerified">GET VERIFIED</Link>
        </li>
      </ul>

      <div className="fixed bottom-0 left-0 w-1/4 h-1/6 bg-purple-800">
        <ProfileNav />
      </div>
      {showPopup && (
        <NewPostPopUp showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
    </div>
  );
}
