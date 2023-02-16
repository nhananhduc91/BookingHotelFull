import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import styles from "./Home.module.css";
import typeData from "../../data/type.json";
import SubscribeForm from "../../components/subscribeForm/SubscribeForm";
import Footer from "../../components/footer/Footer";
import SearchForm from "../../components/searchForm/SearchForm";
import { useEffect, useState } from "react";
import { apiUrl } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [hotelByRegion, setHotelByRegion] = useState();
  const fetchHotelByRegion = async () => {
    const response = await fetch(apiUrl.getHotelByRegion);
    const data = await response.json();
    setHotelByRegion(data);
  };

  //Lọc danh sách các khách sạn theo thành phố
  const hotelInHaNoi = hotelByRegion?.filter(
    (hotel) => hotel.city === "Ha Noi"
  );
  const hotelInHoChiMinh = hotelByRegion?.filter(
    (hotel) => hotel.city === "Ho Chi Minh"
  );
  const hotelInDaNang = hotelByRegion?.filter(
    (hotel) => hotel.city === "Da Nang"
  );

  //Sắp xếp rating khách sạn từ cao xuống thấp
  const hotelRatingDescending = hotelByRegion?.sort((a, b) => {
    return b.rating - a.rating;
  });

  useEffect(() => {
    fetchHotelByRegion();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <SearchForm />
      {/* Phần nội dung chính show hình ảnh khách sạn */}
      <section className={styles.gallery}>
        <div className={styles.container}>
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-4">
              <div className={styles.cityItem}>
                <img
                  src={require("../../data/cityImage/HaNoi.jpg")}
                  alt="Ha Noi"
                />
                <h3>Ha Noi</h3>
                <p>{hotelInHaNoi?.length} properties</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <div className={styles.cityItem}>
                <img
                  src={require("../../data/cityImage/HCM.jpg")}
                  alt="Ho Chi Minh"
                />
                <h3>Ho Chi Minh</h3>
                <p>{hotelInHoChiMinh?.length} properties</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <div className={styles.cityItem}>
                <img
                  src={require("../../data/cityImage/DaNang.jpg")}
                  alt="Ho Chi Minh"
                />
                <h3>Da Nang</h3>
                <p>{hotelInDaNang?.length} properties</p>
              </div>
            </div>
          </div>
          <h3 className={styles.propertyTitle}>Browse by property type</h3>
          <div className="row row-cols-5">
            {typeData.map((type, index) => {
              return (
                <div key={index} className="col-6 col-md">
                  <div className={styles.typeItem}>
                    <img src={type.image} alt="type" />
                    <h4>{type.name}</h4>
                    <p>
                      {type.name === "Hotels"
                        ? `${hotelByRegion?.length} ${type.name}`
                        : `${type.count} ${type.name}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <h3 className={styles.propertyTitle}>Homes Guests Love</h3>
          <div className="row">
            {hotelByRegion?.map((hotel, index) => {
              return (
                <div
                  onClick={() => {
                    navigate(`hotel/${hotel._id}`);
                  }}
                  key={index}
                  className="col-6 col-md-4 col-lg-3 mb-2"
                >
                  <div className={styles.hotelItem}>
                    <img src={hotel.photos} alt="hotel" />
                    <p className={styles.name}>
                      <a href="/#">{hotel.name}</a>
                    </p>
                    <p className={styles.city}>{hotel.city}</p>
                    <p className={styles.price}>
                      Starting from ${hotel.cheapestPrice}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <SubscribeForm />
      <Footer />
    </div>
  );
};

export default Home;
