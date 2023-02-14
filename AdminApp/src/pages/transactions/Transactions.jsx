import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import AdminLayouts from "../../layouts/adminLayouts/AdminLayouts";
import { apiUrl } from "../../utils/api";
import styles from "./Transactions.module.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState();
  const fetchTransaction = async () => {
    const response = await fetch(apiUrl.getAllTransactions, {
      credentials: "include",
    });
    const data = await response.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransaction();
  }, []);
  return (
    <AdminLayouts>
      <div className={styles.transactionsBoard}>
        <h3>Transaction List</h3>
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
            {transactions?.map((trans, index) => {
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
