import { Route, Routes } from "react-router-dom";
import CreateUserPage from "../SignUpPage";
import MainPage from "../MainPage";
import LoginPage from "../LoginPage";
import NewPostPage from "../NewPostPage";
import { useState } from "react";
import NavBar from "../../components/NavBar";

export default function App() {
  const [user, setUser] = useState(null);
  console.log("user: ", user);

  return (
    <main className="App">
      <h1 className="text-blue-400">Twitter Browser</h1>
      <NavBar user={user} />
      {user ? (
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/post" element={<NewPostPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<CreateUserPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </main>
  );
}
