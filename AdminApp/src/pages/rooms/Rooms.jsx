import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayouts from "../../layouts/adminLayouts/AdminLayouts";
import { apiUrl } from "../../utils/api";
import styles from "./Rooms.module.css";

export default function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState();
  const fetchRoom = async () => {
    const response = await fetch(apiUrl.getAllRooms, {
      credentials: "include",
    });
    const data = await response.json();
    setRooms(data);
  };

  const deleteRoom = async (roomId) => {
    const response = await fetch(apiUrl.postDeleteRoom, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId,
      }),
      credentials: "include",
    });
    const data = await response.json();
    alert(data.message);
  };

  useEffect(() => {
    fetchRoom();
  }, [rooms]);
  return (
    <AdminLayouts>
      <div className={styles.roomList}>
        <div className={styles.title}>
          <h3>Room List</h3>
          <button
            onClick={() => {
              navigate("/admin/addRoom");
            }}
            className="btn btn-success mb-3"
          >
            Add Room
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>MaxPeople</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms?.map((room, index) => {
              return (
                <tr key={index}>
                  <td>{room._id}</td>
                  <td>{room.title}</td>
                  <td>{room.desc}</td>
                  <td>{room.price}</td>
                  <td>{room.maxPeople}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => {
                        navigate(`/admin/editRoom/${room._id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        const deleteRoomMessage =
                          "Are you sure to delete this room?";
                        if (window.confirm(deleteRoomMessage)) {
                          deleteRoom(room._id);
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
