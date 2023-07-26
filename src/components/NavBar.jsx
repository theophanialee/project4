import { Link } from "react-router-dom";
import { usePopup } from "./PopupContext";
import ProfileNav from "./ProfileNav";
import { useContext } from "react";
import { UserContext } from "../pages/App/App";

export default function NavBar() {
  const { showPopup, setShowPopup } = usePopup();
  const { user } = useContext(UserContext);

  const handleNewClick = () => {
    console.log("new post popup", showPopup);
    setShowPopup(true);
  };

  return (
    <div className="nav-bar p-10 flex flex-col justify-between h-screen">
      <div>
        <ul className="space-y-1">
          <img src="./tea.png" className="w-24 h-24 mb-5" alt="Logo" />
          <li className=" py-1 flex items-center">
            <Link to="/" className="flex-1 text-2xl">
              Home
            </Link>
          </li>
          <li className="py-1 flex items-center">
            <Link to="/notifications" className="flex-1 text-2xl">
              Notifications
            </Link>
          </li>
          <li className="NavBarItem py-1 flex items-center">
            <Link to="/messages" className="flex-1 text-2xl">
              Messages
            </Link>
          </li>
          <li className="NavBarItem py-1 flex items-center">
            <Link to="/lists" className="flex-1 text-2xl">
              Lists
            </Link>
          </li>
          <li className="NavBarItem py-1 flex items-center">
            <Link to={`/profile/${user.username}`} className="flex-1 text-2xl">
              Profile
            </Link>
          </li>
          <li className="NavBarItem py-1 flex items-center">
            <Link to="/settings" className="flex-1 text-2xl">
              Settings
            </Link>
          </li>
        </ul>
        <li className="NavBarItem py-1 flex items-center">
          <div className="flex justify-center items-center w-full">
            <Link to="/post">
              <button
                onClick={handleNewClick}
                className="bg-purple-600 rounded-full w-28 mt-5 text-2xl w-full px-24 hover:bg-purple-400 hover:text-white"
              >
                Spill!
              </button>
            </Link>
          </div>
        </li>

        <Link to="/verified" className="flex-1 text-2xl text-purple-800">
          <ul className="space-y-1">
            <li className="rounded-lg bg-white my-6 p-3 ">✓ GET VERIFIED</li>
          </ul>
        </Link>
      </div>
      <div className="NavBarItem fixed bottom-0 left-0 w-1/4 h-1/7">
        <ProfileNav />
      </div>
    </div>
  );
}
