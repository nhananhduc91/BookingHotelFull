import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import AdminLayouts from "../../layouts/adminLayouts/AdminLayouts";
import { DOMAIN } from "../../utils/api";
import styles from "./Transactions.module.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const fetchTransaction = async () => {
    const response = await fetch(`${DOMAIN}transactions/${currentPage}`, {
      credentials: "include",
    });
    const data = await response.json();
    setTransactions(data.results);
    setTotalPages(data.totalPage);
  };

  useEffect(() => {
    fetchTransaction();
  }, [currentPage]);

  const renderPagination = () => {
    if (currentPage === 1 && totalPages === 1) {
      return <p>Page {currentPage}</p>;
    } else if (currentPage > 1 && totalPages > 1) {
      return (
        <>
          <i
            className="fa fa-arrow-alt-circle-left"
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          ></i>
          <p>Page {currentPage}</p>
          <i
            className="fa fa-arrow-alt-circle-right"
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          ></i>
        </>
      );
    } else if (currentPage === 1 && totalPages > 1) {
      return (
        <>
          <p>Page {currentPage}</p>
          <i
            className="fa fa-arrow-alt-circle-right"
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          ></i>
        </>
      );
    } else if (currentPage === totalPages && totalPages > 1) {
      return (
        <>
          <i
            className="fa fa-arrow-alt-circle-left"
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          ></i>
          <p>Page {currentPage}</p>
        </>
      );
    }
  };
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
      <div className={styles.pagination}>
        {currentPage && renderPagination()}
      </div>
    </AdminLayouts>
  );
}
