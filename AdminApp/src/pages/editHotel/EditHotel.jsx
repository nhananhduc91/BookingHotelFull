import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayouts from "../../layouts/adminLayouts/AdminLayouts";
import { apiUrl, DOMAIN } from "../../utils/api";
import styles from "./EditHotel.module.css";

export default function EditHotel() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotelInput, setHotelInput] = useState({
    name: "",
    city: "",
    distance: "",
    desc: "",
    photos: "",
    type: "",
    address: "",
    rating: "",
    cheapestPrice: "",
    featured: true,
    rooms: "",
  });

  const fetchHotel = async () => {
    const response = await fetch(`${DOMAIN}hotel/${hotelId}`);
    const data = await response.json();
    setHotelInput(data);
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  const handleChange = (e) => {
    let { value, name } = e.target;
    const newHotelInput = { ...hotelInput, [name]: value };
    setHotelInput(newHotelInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(apiUrl.postUpdateHotel, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hotelId,
        hotelInput,
      }),
    });
    navigate("/admin/hotels");
  };

  return (
    <AdminLayouts>
      <div className={styles.editHotelForm}>
        <h3>Edit Hotel</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <p>Name</p>
              <input
                value={hotelInput.name}
                required
                type="text"
                name="name"
                placeholder="My Hotel"
                onChange={handleChange}
              />
              <p>City</p>
              <input
                value={hotelInput.city}
                required
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
              />
              <p>Distance from City Center</p>
              <input
                value={hotelInput.distance}
                required
                type="number"
                name="distance"
                placeholder="Distance"
                onChange={handleChange}
              />
              <p>Description</p>
              <input
                value={hotelInput.desc}
                required
                type="text"
                name="desc"
                placeholder="Description"
                onChange={handleChange}
              />
              <p>Image Url</p>
              <input
                value={hotelInput.photos}
                required
                type="text"
                name="photos"
                placeholder="Image Link"
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <p>Type</p>
              <input
                value={hotelInput.type}
                required
                type="text"
                name="type"
                placeholder="Type"
                onChange={handleChange}
              />
              <p>Address</p>
              <input
                value={hotelInput.address}
                required
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
              />
              <p>Rating</p>
              <input
                value={hotelInput.rating}
                required
                type="number"
                name="rating"
                placeholder="Rating"
                onChange={handleChange}
              />
              <p>Price</p>
              <input
                value={hotelInput.cheapestPrice}
                required
                type="number"
                name="cheapestPrice"
                placeholder="Cheapest Price"
                onChange={handleChange}
              />
              <p>Featured</p>
              <select
                value={hotelInput.featured}
                required
                name="featured"
                onChange={handleChange}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
          <p>Rooms</p>
          <div>
            <textarea
              value={hotelInput.rooms}
              required
              name="rooms"
              onChange={handleChange}
              rows="5"
            ></textarea>
          </div>
          <button type="submit">Edit</button>
        </form>
      </div>
    </AdminLayouts>
  );
}
