import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AdminLayouts from "../../layouts/adminLayouts/AdminLayouts";
import { apiUrl } from "../../utils/api";
import styles from "./Users.module.css";

export default function Users() {
  const [users, setUsers] = useState();
  const fetchUser = async () => {
    const response = await fetch(apiUrl.getAllUsers);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AdminLayouts>
      <div className={styles.userList}>
        <h3>User List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user._id}</td>
                  <td>{user.userName}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayouts>
  );
}
