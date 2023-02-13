import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { DOMAIN } from "../../utils/api";
import styles from "./Transaction.module.css";

export default function Transaction() {
  const { userId } = useParams();
  const [transaction, setTransaction] = useState();
  const fetchTransaction = async () => {
    const response = await axios({
      url: `${DOMAIN}transaction/${userId}`,
      withCredentials: true,
    });
    const data = response.data;
    setTransaction(data);
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        {transaction?.length > 0 ? (
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
                      <td className="text-center">{index + 1}</td>
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
                        {trans.status === "Booked" && (
                          <p className={styles.statusBooked}>{trans.status}</p>
                        )}
                        {trans.status === "Check In" && (
                          <p className={styles.statusCheckIn}>{trans.status}</p>
                        )}
                        {trans.status === "Check Out" && (
                          <p className={styles.statusCheckOut}>
                            {trans.status}
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <h3>You have no transaction.</h3>
        )}
      </div>

      <Footer />
    </div>
  );
}
