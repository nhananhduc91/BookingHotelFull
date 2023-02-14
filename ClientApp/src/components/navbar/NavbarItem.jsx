import React from "react";
import styles from "./NavbarItem.module.css";

export default function NavbarItem(props) {
  return (
    <div className="col-4 col-md  text-center px-0">
      <div className={props.data.active ? styles.navbarActive : ""}>
        <i className={`fa ${props.data.icon}`}></i>
        <a href="/">{props.data.type}</a>
      </div>
    </div>
  );
}
