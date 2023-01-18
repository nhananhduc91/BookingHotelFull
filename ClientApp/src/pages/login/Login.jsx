import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { apiUrl } from "../../utils/api";
import { saveToStorage } from "../../utils/storage";
import style from "./Login.module.css";

export default function Login() {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const response = await fetch(apiUrl.getUser);
    const data = await response.json();
    setUserData(data);
  };
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    let { value, name } = e.target;
    const newUserData = { ...loginData, [name]: value };
    setLoginData(newUserData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCheck = userData.find(
      (user) =>
        user.email === loginData.email && user.password === loginData.password
    );
    if (userCheck) {
      alert("Login successful!");
      saveToStorage("userSignIn", { email: userCheck.email });
      navigate("/");
    } else {
      alert("Wrong user name or password!");
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
            type="text"
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
        </form>
      </div>
      <Footer />
    </div>
  );
}
