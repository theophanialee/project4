import { Route, Routes } from "react-router-dom";
import SignUpPage from "../SignUpPage";
import LoginPage from "../LoginPage";
import NewPostPage from "../NewPostPopUp";
import NavBar from "../../components/NavBar";
import { createContext, useState } from "react";
import { getUser } from "../../utilities/users-service";
import ProfilePage from "../ProfilePage";
import SettingsPage from "../SettingsPage";
import ChangeUsername from "../../components/settings/ChangeUsername copy";
import EditUser from "../../components/settings/EditUser";
import ChangePassword from "../../components/settings/ChangePassword copy";
import Privacy from "../../components/settings/Privacy";

export const UserContext = createContext();

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {user ? (
        <div className="grid">
          <aside className="w-1/4 h-7/8 fixed left-0 top-0 h-screen bg-purple-950">
            <NavBar />
          </aside>
          <div
            className="main-container w-2/4 fixed top-0 h-screen"
            style={{ left: "25%" }}
          >
            <Routes>
              {/* Routes that require login */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/post" element={<NewPostPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route
                path="/settings/changeusername"
                element={<ChangeUsername />}
              />
              <Route path="/settings/edituser" element={<EditUser />} />
              <Route
                path="/settings/changepassword"
                element={<ChangePassword />}
              />
              <Route path="/settings/privacy" element={<Privacy />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div>
          <aside className="w-1/2 h-full fixed left-0 top-0 h-screen bg-purple-950"></aside>
          <aside className="w-1/2 h-full fixed right-0 top-0 h-screen">
            {" "}
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </aside>
        </div>
      )}
    </UserContext.Provider>
  );
}
