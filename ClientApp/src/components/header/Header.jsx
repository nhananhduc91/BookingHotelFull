import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header id={styles.header}>
      <div className={styles.container}>
        <h1>A lifetime of discounts? It's Genius.</h1>
        <p>
          Get rewards for your travels - unlock instant savings of 10% or more
          with a free acount
        </p>
        <button
          className={styles.btnSignin}
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign in / Register
        </button>
      </div>
    </header>
  );
}
