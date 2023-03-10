import React from "react";
import styles from "./SearchListItem.module.css";

export default function SearchListItem(props) {
  const item = props.item;
  return (
    // Chia làm 3 cột và responsive
    <div className={styles.searchItem}>
      <div className="row">
        <div className="col-12 col-md-3 mb-2">
          <img src={item.photos} alt="searchList" />
        </div>
        <div className="col-7 col-md-6">
          <div className={styles.searchCol2}>
            <h3>{item.name}</h3>
            <p>{item.distance}m from center</p>
            <p className={styles.tag}>Free Airport Taxi</p>
            <h4>{item.type.toUpperCase()}</h4>
            <p className={styles.cancel}>Free cancellation</p>
            <p className={styles.cancelText}>
              You can cancel later, so lock in this great price today!
            </p>
          </div>
        </div>
        <div className="col-5 col-md-3">
          <div className={styles.searchCol3}>
            <h3>${item.cheapestPrice}</h3>
            <p>Includes taxes and fees</p>
            <button
              onClick={() => {
                window.location.replace("/detail");
              }}
            >
              See availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
