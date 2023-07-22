import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import SignUpPage from "../SignUpPage";
import MainPage from "../MainPage";
import LoginPage from "../LoginPage";
import NewPostPage from "../NewPostPopUp";
import NavBar from "../../components/NavBar";
import { createContext, useState } from "react";
import { getUser } from "../../utilities/users-service";

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
          <div className="main-container col-start-2">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/post" element={<NewPostPage />} />
              {/* Add other routes */}
            </Routes>
          </div>
          <div className="col-start-4">
            {/* Empty 4th column for future component */}
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
              {/* Add other routes */}
            </Routes>
          </aside>
        </div>
      )}
    </UserContext.Provider>
  );
}
