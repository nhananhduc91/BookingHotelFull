import React from "react";
import styles from "./SubscribeForm.module.css";

export default function SubscribeForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id={styles.subscribeForm}>
      <div className={styles.container}>
        <h1>Save time, save money!</h1>
        <p>Sign up and we'll send the best deals for you</p>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Your Email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
}
