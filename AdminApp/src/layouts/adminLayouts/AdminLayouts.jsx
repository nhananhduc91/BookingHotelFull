import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./AdminLayouts.module.css";

export default function AdminLayouts(props) {
  return (
    <div className={styles.layoutContainer}>
      <div className="row">
        <div className="col-3 col-xxl-2">
          <Header />
          <Sidebar />
        </div>
        <div className="col-9 col-xxl-10">{props.children}</div>
      </div>
    </div>
  );
}
