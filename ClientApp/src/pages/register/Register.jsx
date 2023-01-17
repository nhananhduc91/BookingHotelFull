import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import style from "./Register.module.css";

export default function Register() {
  return (
    <div>
      <Navbar />
      <div id={style.registerForm}>
        <h1>Register</h1>
        <form>
          <p>User Name</p>
          <input
            name="userName"
            type="text"
            placeholder="Enter your user name"
          />
          <p>Password</p>
          <input
            name="password"
            type="text"
            placeholder="Enter your password"
          />
          <p>Full Name</p>
          <input
            name="fullName"
            type="text"
            placeholder="Enter your full name"
          />
          <p>Phone</p>
          <input
            name="phoneNumber"
            type="text"
            placeholder="Enter your phone number"
          />
          <p>Email</p>
          <input name="email" type="email" placeholder="Enter your email" />
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
