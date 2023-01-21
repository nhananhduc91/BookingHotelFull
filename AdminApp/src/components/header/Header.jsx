import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.logo}>
      <img src={require("../../data/images/admin.png")} alt="admin logo" />
    </div>
  );
}
