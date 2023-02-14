import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { apiUrl } from "../../utils/api";
import { saveToStorage } from "../../utils/storage";
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

    const response = await axios({
      url: apiUrl.postLogin,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      withCredentials: true,
      data: {
        loginData,
      },
    });
    const data = response.data;
    alert(data.userMessage);
    if (data.loginStatus && data.userInfo.isAdmin === "no") {
      saveToStorage("userSignIn", {
        id: data.userInfo.id,
        email: data.userInfo.email,
        fullName: data.userInfo.fullName,
        phoneNumber: data.userInfo.phoneNumber,
        userName: data.userInfo.userName,
      });
      navigate("/");
    }
  };

  return (
    <div>
      <Navbar />
      <div id={style.loginForm}>
        <h1>Login</h1>
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
            <p className={style.registerLink}>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </span>
            </p>
            <button type="submit">Sign In</button>
          </div>
          <p
            className={style.adminLogin}
            onClick={() => {
              window.location.href = "http://localhost:3001";
            }}
          >
            Login as an administrtor
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}
