import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayouts from "../../layouts/adminLayouts/AdminLayouts";
import { apiUrl, DOMAIN } from "../../utils/api";
import styles from "./EditRoom.module.css";

export default function EditRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState();
  const [roomInput, setRoomInput] = useState({
    title: "",
    price: "",
    maxPeople: "",
    desc: "",
    roomNumbers: "",
  });
  const fetchHotel = async () => {
    const response = await fetch(apiUrl.getAllHotels);
    const data = await response.json();
    setHotels(data);
  };
  const fetchRoom = async () => {
    const response = await fetch(`${DOMAIN}room/${roomId}`);
    const data = await response.json();
    setRoomInput(data);
  };

  useEffect(() => {
    fetchHotel();
    fetchRoom();
  }, []);

  const handleChange = (e) => {
    let { value, name } = e.target;
    const newRoomInput = { ...roomInput, [name]: value };
    setRoomInput(newRoomInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(roomInput);
    fetch(apiUrl.postUpdateRoom, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId,
        roomInput,
      }),
    });
    navigate("/admin/rooms");
  };

  return (
    <AdminLayouts>
      <div className={styles.editRoomForm}>
        <h3>Edit Room</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <p>Title</p>
            <input
              value={roomInput.title}
              required
              type="text"
              name="title"
              placeholder="Room Title"
              onChange={handleChange}
            />
            <p>Price</p>
            <input
              value={roomInput.price}
              required
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
            />
            <p>Max People</p>
            <input
              value={roomInput.maxPeople}
              required
              type="number"
              name="maxPeople"
              placeholder="Max People"
              onChange={handleChange}
            />
            <p>Description</p>
            <input
              value={roomInput.desc}
              required
              type="text"
              name="desc"
              placeholder="Description"
              onChange={handleChange}
            />
            <p>Room Numbers</p>
            <input
              value={roomInput.roomNumbers}
              required
              type="number"
              name="roomNumbers"
              placeholder="Number"
              onChange={handleChange}
            />
            <p>Choose A Hotel</p>
            <select name="hotel">
              {hotels?.map((hotel, index) => {
                return (
                  <option key={index} value={hotel.name}>
                    {hotel.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit">Edit</button>
        </form>
      </div>
    </AdminLayouts>
  );
}