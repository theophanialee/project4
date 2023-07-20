import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "../SignUpPage";
import MainPage from "../MainPage";
import LoginPage from "../LoginPage";
import NewPostPage from "../NewPostPage";
import NavBar from "../../components/NavBar";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="grid">
      <aside className="w-1/4 fixed left-0 top-0 h-screen bg-gray-800 p-20 ">
        <NavBar user={user} />
      </aside>
      <div className="main-container col-start-2">
        {user ? (
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/post" element={<NewPostPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        )}
      </div>
      <div className="col-start-4">
        {" "}
        {/* Empty 4th column for future component */}
      </div>
    </div>
  );
}
