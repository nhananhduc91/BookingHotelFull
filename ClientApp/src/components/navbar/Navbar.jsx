import React from "react";
import styles from "./Navbar.module.css";
import NavbarItem from "./NavbarItem";
import navbarData from "../../data/navBar.json";
import { useNavigate } from "react-router-dom";
import { getFromStorage, removeFromStorage } from "../../utils/storage";
import { useState } from "react";

export default function Navbar() {
  const [userLogin, setUserLogin] = useState(getFromStorage("userSignIn"));
  const navigate = useNavigate();
  return (
    <div id={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h3
            onClick={() => {
              navigate("/");
            }}
          >
            Booking Website
          </h3>
          {userLogin && (
            <div>
              <span className={styles.userEmail}>{userLogin.email}</span>
              <button
                className={styles.registerBtn}
                onClick={() => {
                  navigate(`/transaction/${userLogin.id}`);
                }}
              >
                Transactions
              </button>
              <button
                onClick={() => {
                  setUserLogin("");
                  removeFromStorage("userSignIn");
                }}
              >
                Logout
              </button>
            </div>
          )}
          {!userLogin && (
            <div>
              <button
                className={styles.registerBtn}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-12 col-lg-8">
            <div
              style={{ paddingLeft: "12px" }}
              className="row row-cols-5 align-items-center"
            >
              {navbarData.map((item, index) => {
                return <NavbarItem key={index} data={item} />;
              })}
            </div>
          </div>
          <div className="col-12 col-lg-4"></div>
        </div>
      </div>
    </div>
  );
}
