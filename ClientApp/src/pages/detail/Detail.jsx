import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import SubscribeForm from "../../components/subscribeForm/SubscribeForm";
import styles from "./Detail.module.css";
import detail from "../../data/detail.json";

export default function Detail() {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className="row">
          <div className="col-12 col-md-9">
            <h3>{detail.name}</h3>
            <p className={styles.address}>
              <i className="fa fa-map-marker"></i>
              {detail.address}
            </p>
            <p className={styles.distance}>{detail.distance}</p>
            <p className={styles.price}>{detail.price}</p>
          </div>
          <button className="col-12 col-md-3 mb-3">Reserve or Book Now!</button>
        </div>
        <div className={styles.hotelImg}>
          {detail.photos.map((img, index) => {
            return <img key={index} src={img} alt="hotel" />;
          })}
        </div>
        <div>
          <div className="row">
            <div className="col-12 col-md-8">
              <h3>{detail.title}</h3>
              <p>{detail.description}</p>
            </div>
            <div className="col-12 col-md-4">
              <div className={styles.booking}>
                <h4>Perfect for a 9-nights stay!</h4>
                <p>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </p>
                <p className={styles.price}>
                  ${detail.nine_night_price} <span>(9 nights)</span>
                </p>
                <button>Reserve or Book Now!</button>
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
