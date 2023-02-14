import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import AdminLayouts from "../../layouts/adminLayouts/AdminLayouts";
import { apiUrl } from "../../utils/api";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [transactions, setTransactions] = useState();
  const [users, setUsers] = useState();

  const fetchTransaction = async () => {
    const response = await fetch(apiUrl.getAllTransactions, {
      credentials: "include",
    });
    const data = await response.json();
    setTransactions(data);
  };

  const fetchUser = async () => {
    const response = await fetch(apiUrl.getAllUsers, {
      credentials: "include",
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchTransaction();
    fetchUser();
  }, []);
  return (
    <AdminLayouts>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.mainBoard}>
        <div className="row">
          <div className="col-3 text-center">
            <div>
              <i
                style={{ backgroundColor: "#f7b924" }}
                className="fa fa-user"
              ></i>
            </div>
            <p>{users?.length}</p>
            <h4>Users</h4>
          </div>
          <div className="col-3 text-center">
            <div>
              <i
                style={{ backgroundColor: "#dd3b62" }}
                className="fa fa-clipboard-list"
              ></i>
            </div>
            <p>{transactions?.length}</p>
            <h4>Orders</h4>
          </div>
          <div className="col-3 text-center">
            <div>
              <i
                style={{ backgroundColor: "#4eca8a" }}
                className="fa fa-dollar-sign"
              ></i>
            </div>
            <p>
              ${" "}
              {transactions
                ?.reduce((totalEarn, transaction) => {
                  return (totalEarn += transaction.price);
                }, 0)
                .toLocaleString()}
            </p>
            <h4>Earnings</h4>
          </div>
          <div className="col-3 text-center">
            <div>
              <i
                style={{ backgroundColor: "#3f6ad8" }}
                className="fa fa-dollar-sign"
              ></i>
            </div>
            <p>
              ${" "}
              {Math.ceil(
                transactions?.reduce((totalEarn, transaction) => {
                  return (totalEarn += transaction.price);
                }, 0) / (12).toLocaleString()
              )}
            </p>
            <h4>Average</h4>
          </div>
        </div>
      </div>
      <div className={styles.transactionsBoard}>
        <h3>Latest Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.slice(0, 8).map((trans, index) => {
              return (
                <tr key={index}>
                  <td>{trans._id}</td>
                  <td>{trans.user}</td>
                  <td>{trans.hotel}</td>
                  <td>
                    {trans.room?.map((room, index) => {
                      return (
                        <Fragment key={index}>
                          {room}
                          <br />
                        </Fragment>
                      );
                    })}
                  </td>
                  <td>
                    {trans.dateStart} - {trans.dateEnd}
                  </td>
                  <td>${trans.price}</td>
                  <td>{trans.payment}</td>
                  <td>
                    <p className={styles.status}>{trans.status}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayouts>
  );
}
