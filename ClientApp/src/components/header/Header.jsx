import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header id={styles.header}>
      <div className={styles.container}>
        <h1>A lifetime of discounts? It's Genius.</h1>
        <p>
          Get rewards for your travels - unlock instant savings of 10% or more
          with a free acount
        </p>
        <button className={styles.btnSignin}>Sign in / Register</button>
      </div>
    </header>
  );
}
