import React from "react";
import styles from "./SearchListItem.module.css";

export default function SearchListItem(props) {
  const item = props.item;
  return (
    // Chia làm 3 cột và responsive
    <div className={styles.searchItem}>
      <div className="row">
        <div className="col-12 col-md-3 mb-2">
          <img src={item.image_url} alt="searchList" />
        </div>
        <div className="col-7 col-md-6">
          <div className={styles.searchCol2}>
            <h3>{item.name}</h3>
            <p>{item.distance} from center</p>
            <p className={styles.tag}>{item.tag}</p>
            <h4>{item.description}</h4>
            <p className={styles.type}>{item.type}</p>
            {item.free_cancel && (
              <p className={styles.cancel}>Free cancellation</p>
            )}
            {item.free_cancel && (
              <p className={styles.cancelText}>
                You can cancel later, so lock in this great price today!
              </p>
            )}
          </div>
        </div>
        <div className="col-5 col-md-3">
          <div className={styles.searchCol3}>
            <div className="row">
              <div className="col-8">
                <p className={styles.rateText}>{item.rate_text}</p>
              </div>
              <div className="col-4">
                <p className={styles.rate}>{item.rate}</p>
              </div>
            </div>
            <h3>${item.price}</h3>
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
