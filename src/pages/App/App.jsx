import { Route, Routes } from "react-router-dom";
import SignUpPage from "../SignUpPage";
import LoginPage from "../LoginPage";
import NavBar from "../../components/NavBar";
import { createContext, useState } from "react";
import { getUser } from "../../utilities/users-service";
import ProfilePage from "../ProfilePage";
import SettingsPage from "../SettingsPage";
import ChangeUsername from "../../components/settings/ChangeUsername";
import ChangePassword from "../../components/settings/ChangePassword";
import Privacy from "../../components/settings/Privacy";
import { PopupProvider } from "../../components/PopupContext";
import HomePage from "../HomePage";
import "./App.css";
import SearchBar from "../../components/SearchBar";
import NewPostPopUp from "../NewPostPopUp";
import Trends from "../../components/Trends";
import SinglePostPage from "../SinglePostPage";
import VerifiedForm from "../../components/VerifiedForm";
import NotificationsPage from "../NotificationsPage";
import ListsPage from "../ListsPage";
import DMsPage from "../DMsPage";
import LandingPage from "../../components/LandingPage";
import EditProfile from "../../components/settings/EditProfile";
import FollowingPage from "../FollowingPage";
import ReplyPopUp from "../../components/ReplyPopUp";
import SearchResultPage from "../SearchResultPage";
import AdminNav from "../../components/admin/AdminNav";
import AdminHomePage from "../../components/admin/AdminHomePage";
import VerifiedRequests from "../../components/admin/VerifiedRequests";

export const UserContext = createContext();
export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <PopupProvider>
        {!user && (
          <>
            <aside className="w-1/2 h-full fixed right-0 top-0 h-screen bg-purple-950">
              <LandingPage />
            </aside>
            <aside className="">
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Routes>
            </aside>
          </>
        )}
        <div className="flex flex-wrap">
          {user && user.admin === false && (
            <>
              <aside className="w-1/4 h-7/8 fixed left-0 top-0 h-screen bg-purple-950">
                <NavBar />
              </aside>
              <div
                className="main-container w-2/4 fixed top-0 h-screen"
                style={{ left: "25%", overflowY: "auto" }}
              >
                <Routes>
                  {/* Routes that require login */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="home" element={<HomePage />} />
                  <Route
                    path="/notifications"
                    element={<NotificationsPage />}
                  />

                  <Route path="/messages" element={<DMsPage />} />

                  <Route path="/lists" element={<ListsPage />} />

                  <Route path="/profile/:username" element={<ProfilePage />} />
                  <Route
                    path="/following/:username/:profileId"
                    element={<FollowingPage />}
                  />

                  <Route path="/settings" element={<SettingsPage />} />
                  <Route
                    path="/settings/changeusername"
                    element={<ChangeUsername />}
                  />
                  <Route
                    path="/settings/editprofile"
                    element={<EditProfile />}
                  />
                  <Route
                    path="/settings/changepassword"
                    element={<ChangePassword />}
                  />
                  <Route path="/settings/privacy" element={<Privacy />} />

                  <Route path="/post" element={<NewPostPopUp />} />
                  <Route path="/post/:id" element={<SinglePostPage />} />

                  <Route path="/reply/:id" element={<ReplyPopUp />} />

                  <Route
                    path="/search/:searchQuery"
                    element={<SearchResultPage />}
                  />

                  <Route path="/verified" element={<VerifiedForm />} />
                </Routes>
              </div>
              <div className="" style={{ overflowY: "auto" }}>
                <div className="w-1/4 h-5/6 fixed bottom-0 right-0 pt-5 px-5 flex justify-cente ">
                  <SearchBar />
                </div>

                <div className="">
                  <Trends />
                </div>
              </div>
            </>
          )}

          {user && user.admin === true && (
            <>
              <aside className="w-1/4 h-7/8 fixed left-0 top-0 h-screen bg-purple-950">
                <AdminNav />
              </aside>
              <div
                className="main-container w-2/4 fixed top-0 h-screen"
                style={{ left: "25%", overflowY: "auto" }}
              >
                <Routes>
                  {/* Routes that require login */}
                  <Route path="/home" element={<AdminHomePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route
                    path="/settings/changeusername"
                    element={<ChangeUsername />}
                  />
                  <Route
                    path="/settings/editprofile"
                    element={<EditProfile />}
                  />
                  <Route
                    path="/settings/changepassword"
                    element={<ChangePassword />}
                  />
                  <Route path="/settings/privacy" element={<Privacy />} />

                  <Route
                    path="/search/:searchQuery"
                    element={<SearchResultPage />}
                  />

                  <Route path="/requests" element={<VerifiedRequests />} />
                </Routes>
              </div>
              <div className="" style={{ overflowY: "auto" }}>
                {" "}
                <SearchBar />
                <div className="w-1/4 h-5/6 fixed bottom-0 right-0 pt-5 px-5 flex justify-cente "></div>
                <div className=""></div>
              </div>
            </>
          )}
        </div>
      </PopupProvider>
    </UserContext.Provider>
  );
}