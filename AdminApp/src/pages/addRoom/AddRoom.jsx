import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayouts from "../../layouts/adminLayouts/AdminLayouts";
import { apiUrl } from "../../utils/api";
import styles from "./AddRoom.module.css";

export default function AddRoom() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState();
  const fetchHotel = async () => {
    const response = await fetch(apiUrl.getAllHotels, {
      credentials: "include",
    });
    const data = await response.json();
    setHotels(data);
  };

  useEffect(() => {
    fetchHotel();
  }, []);
  const [roomInput, setRoomInput] = useState({
    title: "",
    price: "",
    maxPeople: "",
    desc: "",
    roomNumbers: [],
  });

  const handleChange = (e) => {
    let { value, name } = e.target;
    const newRoomInput = {
      ...roomInput,
      [name]: value,
      roomNumbers: value
        .split(" ")
        .join("")
        .split(",")
        .map((str) => Number(str)),
    };
    setRoomInput(newRoomInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(roomInput);
    fetch(apiUrl.postAddRoom, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomInput,
      }),
      credentials: "include",
    });
    navigate("/admin/rooms");
  };

  return (
    <AdminLayouts>
      <div className={styles.addRoomForm}>
        <h3>Add New Room</h3>
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
              value={roomInput.photos}
              required
              type="text"
              name="roomNumbers"
              placeholder="Please add comma after every number"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </AdminLayouts>
  );
}
