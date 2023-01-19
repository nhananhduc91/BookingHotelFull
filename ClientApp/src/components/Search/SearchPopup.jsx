import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchHotelsActions } from "../../redux/store";
import styles from "./SearchPopup.module.css";

export default function SearchPopup() {
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    minPricePerNight: 0,
    maxPricePerNight: 0,
    adult: 0,
    children: 0,
    room: 0,
  });

  const handleChange = (e) => {
    let { value, name } = e.target;
    const newSearchValue = { ...searchInput, [name]: value };
    setSearchInput(newSearchValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchHotelsActions.getSearchInput(searchInput));
  };

  // Popup tìm kiếm đã được responsive
  return (
    <div className="col-12 col-lg-3 mb-4">
      <form onSubmit={handleSubmit} className={styles.searchPopup}>
        <h3>SEARCH</h3>
        <h6>Destination</h6>
        <input
          required
          value={searchInput.destination}
          className={styles.destination}
          type="text"
          name="destination"
          onChange={handleChange}
        />
        <h6>Check-in Date</h6>
        <input
          required
          value={searchInput.checkIn}
          className={styles.checkIn}
          type="date"
          name="checkIn"
          onChange={handleChange}
        />
        <span>to</span>
        <input
          required
          value={searchInput.checkOut}
          className={styles.checkOut}
          type="date"
          name="checkOut"
          onChange={handleChange}
        />
        <div className={styles.options}>
          <h6>Options</h6>
          <div>
            <span>Min price per night</span>
            <input
              required
              value={searchInput.minPricePerNight}
              type="number"
              name="minPricePerNight"
              onChange={handleChange}
            />
          </div>
          <div>
            <span>Max price per night</span>
            <input
              required
              value={searchInput.maxPricePerNight}
              type="number"
              name="maxPricePerNight"
              onChange={handleChange}
            />
          </div>
          <div>
            <span>Adult</span>
            <input
              required
              value={searchInput.adult}
              type="number"
              name="adult"
              onChange={handleChange}
            />
          </div>
          <div>
            <span>Children</span>
            <input
              required
              value={searchInput.children}
              type="number"
              name="children"
              onChange={handleChange}
            />
          </div>
          <div>
            <span>Room</span>
            <input
              required
              value={searchInput.room}
              type="number"
              name="room"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
}
