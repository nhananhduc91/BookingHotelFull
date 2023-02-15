import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayouts from "../../layouts/adminLayouts/AdminLayouts";
import { apiUrl } from "../../utils/api";
import styles from "./Hotels.module.css";

export default function Hotels() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState();

  const fetchHotel = async () => {
    const response = await fetch(apiUrl.getAllHotels, {
      credentials: "include",
    });
    const data = await response.json();
    setHotels(data);
  };

  const deleteHotel = async (hotelId) => {
    const response = await fetch(apiUrl.postDeleteHotel, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hotelId,
      }),
      credentials: "include",
    });
    const data = await response.json();
    alert(data.message);
  };

  useEffect(() => {
    fetchHotel();
  }, [hotels]);
  return (
    <AdminLayouts>
      <div className={styles.hotelList}>
        <div className={styles.title}>
          <h3>Hotel List</h3>
          <button
            onClick={() => {
              navigate("/admin/addHotel");
            }}
            className="btn btn-success mb-3"
          >
            Add Hotel
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Title</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hotels?.map((hotel, index) => {
              return (
                <tr key={index}>
                  <td>{hotel._id}</td>
                  <td>{hotel.name}</td>
                  <td>{hotel.type}</td>
                  <td>{hotel.name}</td>
                  <td>{hotel.city}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => {
                        navigate(`/admin/editHotel/${hotel._id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        const deleteHotelMessage =
                          "Are you sure to delete this hotel?";
                        if (window.confirm(deleteHotelMessage)) {
                          deleteHotel(hotel._id);
                        }
                      }}
                    >
                      Delete
                    </button>
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
