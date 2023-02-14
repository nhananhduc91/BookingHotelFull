import React from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { removeFromStorage } from "../../utils/storage";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div id={styles.sidebar}>
      <h5>MAIN</h5>
      <p
        onClick={() => {
          navigate("/admin/dashboard");
        }}
      >
        <i className="fa fa-th-large me-2"></i>
        Dashboard
      </p>
      <h5>LIST</h5>
      <p
        onClick={() => {
          navigate("/admin/users");
        }}
      >
        <i className="fa fa-user me-2"></i>
        Users
      </p>
      <p
        onClick={() => {
          navigate("/admin/hotels");
        }}
      >
        <i className="fa fa-hotel me-2"></i>Hotels
      </p>
      <p
        onClick={() => {
          navigate("/admin/rooms");
        }}
      >
        <i className="fa fa-bed me-2"></i>Rooms
      </p>
      <p
        onClick={() => {
          navigate("/admin/transactions");
        }}
      >
        <i className="fa fa-exchange-alt me-2"></i>Transactions
      </p>
      <h5>NEW</h5>
      <p
        onClick={() => {
          navigate("/admin/addHotel");
        }}
      >
        <i className="fa fa-hotel me-2"></i>New Hotel
      </p>
      <p
        onClick={() => {
          navigate("/admin/addRoom");
        }}
      >
        <i className="fa fa-bed me-2"></i>New Room
      </p>
      <h5>USER</h5>
      <p
        onClick={() => {
          removeFromStorage("userSignIn");
          window.location.href = "http://localhost:3001";
        }}
      >
        <i className="fa fa-sign-out-alt me-2"></i>Logout
      </p>
    </div>
  );
}
