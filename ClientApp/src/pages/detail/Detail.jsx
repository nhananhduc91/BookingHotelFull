import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import SubscribeForm from "../../components/subscribeForm/SubscribeForm";
import styles from "./Detail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { DOMAIN } from "../../utils/api";
import { useState } from "react";
import { useEffect } from "react";
import { getFromStorage } from "../../utils/storage";

export default function Detail() {
  const userInfo = getFromStorage("userSignIn");
  const [detail, setDetail] = useState();
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const fetchHotelDetail = async () => {
    const response = await fetch(`${DOMAIN}hotel/${hotelId}`, {
      method: "POST",
    });
    const data = await response.json();
    setDetail(data);
  };

  useEffect(() => {
    fetchHotelDetail();
  }, []);
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className="row">
          <div className="col-12 col-md-9">
            <h3>{detail?.name}</h3>
            <p className={styles.address}>
              <i className="fa fa-map-marker"></i>
              {detail?.address}
            </p>
            <p className={styles.distance}>
              Excellent location - {detail?.distance}m from center
            </p>
            <p className={styles.price}>
              Book a stay over ${detail?.cheapestPrice} and get a free airport
              taxi
            </p>
          </div>
        </div>
        <div className={styles.hotelImg}>
          <img src={detail?.photos} alt="hotel" />
        </div>
        <div>
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
                <button
                  onClick={() => {
                    if (!userInfo) {
                      alert("Please login first to confirm booking");
                      navigate("/login");
                    } else {
                      navigate(`/booking/${hotelId}`);
                    }
                  }}
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubscribeForm />
      <Footer />
    </div>
  );
}
