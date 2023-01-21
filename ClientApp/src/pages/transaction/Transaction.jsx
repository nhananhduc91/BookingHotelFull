import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { DOMAIN } from "../../utils/api";
import styles from "./Transaction.module.css";

export default function Transaction() {
  const { userName } = useParams();
  const [transaction, setTranaction] = useState();
  const fetchTransaction = async () => {
    const response = await fetch(`${DOMAIN}transaction/${userName}`);
    const data = await response.json();
    setTranaction(data);
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.transaction}>
          <h3>Your Transactions</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transaction?.map((trans, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{trans.hotel}</td>
                    <td>
                      {trans.room?.map((room, index) => {
                        return (
                          <>
                            {room}
                            <br />
                          </>
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
      </div>
      <Footer />
    </div>
  );
}
