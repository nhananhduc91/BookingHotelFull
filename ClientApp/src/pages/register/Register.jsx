import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { apiUrl } from "../../utils/api";
import style from "./Register.module.css";

export default function Register() {
  const [users, setUsers] = useState();
  console.log(users);

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    isAdmin: false,
  });

  const fetchUsers = async () => {
    const response = await fetch(apiUrl.getUser);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    let { value, name } = e.target;
    const newUserData = { ...userData, [name]: value };
    for (const user of users) {
      if (user.email === users.email) {
        alert("User already registered! Please choose another email!");
      }
      return;
    }
    setUserData(newUserData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(apiUrl.postUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userData,
      }),
    });
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
            type="text"
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
