import React from "react";
import styles from "./SearchPopup.module.css";

export default function SearchPopup() {
  // Popup tìm kiếm đã được responsive
  return (
    <div className="col-12 col-lg-3 mb-4">
      <div className={styles.searchPopup}>
        <h3>SEARCH</h3>
        <h6>Destination</h6>
        <input className={styles.destination} type="text" />
        <h6>Check-in Date</h6>
        <input className={styles.checkIn} type="date" />
        <span>to</span>
        <input className={styles.checkOut} type="date" />
        <div className={styles.options}>
          <h6>Options</h6>
          <div>
            <span>Min price per night</span>
            <input type="number" />
          </div>
          <div>
            <span>Max price per night</span>
            <input type="number" />
          </div>
          <div>
            <span>Adult</span>
            <input type="number" />
          </div>
          <div>
            <span>Children</span>
            <input type="number" />
          </div>
          <div>
            <span>Room</span>
            <input type="number" />
          </div>
          <button type="submit">Search</button>
        </div>
      </div>
    </div>
  );
}
