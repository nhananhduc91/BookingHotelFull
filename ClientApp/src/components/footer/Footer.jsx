import React from "react";
import styles from "./Footer.module.css";
import footerData from "../../data/footer.json";

export default function Footer() {
  return (
    <footer>
      <div className={styles.container}>
        <div className="row row-cols 5">
          {footerData.map((item, index) => {
            return (
              <ul key={index} className="col-4 col-md">
                {item.col_values.map((colItem, index) => {
                  return <li key={index}>{colItem}</li>;
                })}
              </ul>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
