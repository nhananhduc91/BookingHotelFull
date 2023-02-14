import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { apiUrl, DOMAIN } from "../../utils/api";
import { getFromStorage } from "../../utils/storage";
import styles from "./Booking.module.css";
import format from "date-fns/format";

export default function Booking() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(getFromStorage("userSignIn"));
  const [detail, setDetail] = useState();
  const { hotelId } = useParams();
  const [checkedRoom, setCheckRoom] = useState([]);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const difference = range[0].endDate.getTime() - range[0].startDate.getTime();
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24));

  const [bookingData, setBookingData] = useState({
    userId: userInfo?.id,
    hotel: "",
    room: [],
    dateStart: format(range[0].startDate, "dd/MM/yyyy"),
    dateEnd: format(range[0].endDate, "dd/MM/yyyy"),
    price: "",
    payment: "",
    status: "",
  });

  const fetchHotelDetail = async () => {
    const response = await fetch(`${DOMAIN}hotel/${hotelId}`, {
      method: "POST",
    });
    const data = await response.json();
    setDetail(data);
    setBookingData({
      ...bookingData,
      hotel: data.name,
    });
  };
  useEffect(() => {
    fetchHotelDetail();
  }, []);

  useEffect(() => {
    setBookingData({
      ...bookingData,
      dateStart: format(range[0].startDate, "dd/MM/yyyy"),
      dateEnd: format(range[0].endDate, "dd/MM/yyyy"),
      room: checkedRoom,
      price: detail?.cheapestPrice * totalDays * checkedRoom.length,
    });
  }, [range, checkedRoom]);

  const handleChangeInfo = (e) => {
    let { value, name } = e.target;
    const newUserData = { ...userInfo, [name]: value };
    setUserInfo(newUserData);
  };

  const handleChangeBooking = (e) => {
    let { value, name } = e.target;
    const newBooking = { ...bookingData, [name]: value };
    setBookingData(newBooking);
  };

  const handleCheckedRoom = (e) => {
    let { value, checked } = e.target;
    if (checked === true) {
      setCheckRoom([...checkedRoom, value]);
    } else {
      setCheckRoom(checkedRoom.filter((room) => room !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(apiUrl.postTransaction, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingData,
      }),
    });
    navigate(`/transaction/${userInfo.id}`);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className="row">
          <div className="col-12 col-md-8">
            <h3>{detail?.title}</h3>
            <p>{detail?.desc}</p>
          </div>
          <div className="col-12 col-md-4">
            <div className={styles.booking}>
              <p className={styles.price}>
                ${detail?.cheapestPrice} <span>(1 night)</span>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5">
            <h3 className="my-3">Dates</h3>
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={range}
              direction="horizontal"
              className="calendarElement"
              onChange={(item) => {
                setRange([item.selection]);
              }}
            />
          </div>
          <div className="col-12 col-md-7">
            <div className={styles.bookingForm}>
              <h3 className="my-3">Reserve Info</h3>
              <form>
                <p>Your Full Name</p>
                <input
                  value={userInfo?.fullName}
                  onChange={handleChangeInfo}
                  name="fullName"
                  type="text"
                  placeholder="Enter your fullname"
                />
                <p>Your Email</p>
                <input
                  value={userInfo?.email}
                  onChange={handleChangeInfo}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
                <p>Your Phone Number</p>
                <input
                  value={userInfo?.phoneNumber}
                  onChange={handleChangeInfo}
                  name="fullName"
                  type="text"
                  placeholder="Enter your phone number"
                />
              </form>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <h3 className="my-3">Select Rooms</h3>
            {detail?.rooms.map((room, index) => {
              return (
                <div key={index} onChange={handleCheckedRoom}>
                  <input
                    value={room}
                    type="checkbox"
                    name="room"
                    className="me-2"
                  />
                  <label htmlFor="room">{room}</label>
                </div>
              );
            })}
          </div>
          <h4 className="my-3 fw-bold">Total Bill: ${bookingData.price}</h4>
          <div className={styles.paymentMethod}>
            <select
              className="me-2"
              required
              value={bookingData.status}
              name="status"
              onChange={handleChangeBooking}
            >
              <option disabled={true} value="">
                Select Status
              </option>
              <option value="Booked">Booked</option>
              <option value="Check In">Check In</option>
              <option value="Check Out">Check Out</option>
            </select>
            <select
              required
              value={bookingData.payment}
              name="payment"
              onChange={handleChangeBooking}
            >
              <option disabled={true} value="">
                Select Payment Method
              </option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
            </select>
            <button type="submit" className={styles.reserveButton}>
              Reserve Now
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
