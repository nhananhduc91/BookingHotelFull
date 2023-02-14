import React from "react";
import { useState } from "react";
import { saveToStorage } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { value, name } = e.target;
    const newUserData = { ...loginData, [name]: value };
    setLoginData(newUserData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginData,
      }),
      credentials: "include",
    });
    const data = await response.json();
    alert(data.adminMessage);
    if (data.loginStatus && data.userInfo.isAdmin === "yes") {
      saveToStorage("userSignIn", {
        id: data.userInfo.id,
        email: data.userInfo.email,
        fullName: data.userInfo.fullName,
        phoneNumber: data.userInfo.phoneNumber,
        userName: data.userInfo.userName,
      });
      navigate("/admin/dashboard");
    }
  };
  return (
    <div id={style.loginForm}>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <p>Email</p>
        <input
          value={loginData.email}
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <p>Password</p>
        <input
          value={loginData.password}
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
}
