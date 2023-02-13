import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { apiUrl } from "../../utils/api";
import style from "./Register.module.css";

export default function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    isAdmin: "no",
  });

  const handleChange = (e) => {
    let { value, name } = e.target;
    const newUserData = { ...userData, [name]: value };
    setUserData(newUserData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(apiUrl.postUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userData,
      }),
    });
    const data = await response.json();
    alert(data.message);
    if (data.forward) {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <div id={style.registerForm}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <p>User Name</p>
          <input
            value={userData.userName}
            required
            name="userName"
            type="text"
            placeholder="Enter your user name"
            onChange={handleChange}
          />
          <p>Password</p>
          <input
            value={userData.password}
            required
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <p>Full Name</p>
          <input
            value={userData.fullName}
            required
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            onChange={handleChange}
          />
          <p>Phone</p>
          <input
            value={userData.phoneNumber}
            required
            name="phoneNumber"
            type="text"
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
          <p>Email</p>
          <input
            value={userData.email}
            required
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <div className="mb-2">
            <span className="me-2">Are you an admin?</span>
            <select
              value={userData.isAdmin}
              name="isAdmin"
              onChange={handleChange}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <p className={style.loginLink}>
              Already have an account?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </span>
            </p>
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
