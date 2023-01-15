import React from "react";
import styles from "./Navbar.module.css";
import NavbarItem from "./NavbarItem";
import navbarData from "../../data/navBar.json";

export default function Navbar() {
  return (
    <div id={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <a href="./">Booking Website</a>
          <div>
            <button className={styles.registerBtn}>Register</button>
            <button>Login</button>
          </div>
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
