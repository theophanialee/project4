// import { signIn } from "../utilities/users-service"; // Assuming you have a sign-in function in your users-service.js
import { useContext, useRef, useState } from "react";
import "./form.css";
import { UserContext } from "../pages/App/App";
import { login } from "../utilities/users-service";

export default function LandingPage() {
  return (
    <>
      <div className="before-login">
        <h1 className="text-center text-4xl">Teater</h1>
        <img src="./tea.png" className="w-56 h-56  m-20" alt="Logo" />
        <div>Where the hottest tea is brewing</div>
      </div>
    </>
  );
}
