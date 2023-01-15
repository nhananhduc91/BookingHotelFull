import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import styles from "./Home.module.css";
import cityData from "../../data/city.json";
import typeData from "../../data/type.json";
import hotelData from "../../data/hotel_list.json";
import SubscribeForm from "../../components/subscribeForm/SubscribeForm";
import Footer from "../../components/footer/Footer";
import SearchForm from "../../components/searchForm/SearchForm";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <SearchForm />
      {/* Phần nội dung chính show hình ảnh khách sạn */}
      <section className={styles.gallery}>
        <div className={styles.container}>
          <div className="row justify-content-between">
            {cityData.map((city, index) => {
              return (
                <div className="col-12 col-sm-6 col-lg-4" key={index}>
                  <div className={styles.cityItem}>
                    <img src={city.image} alt="city" />
                    <h3>{city.name}</h3>
                    <p>{city.subText}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <h3 className={styles.propertyTitle}>Browse by property type</h3>
          <div className="row row-cols-5">
            {typeData.map((type, index) => {
              return (
                <div key={index} className="col-6 col-md">
                  <div className={styles.typeItem}>
                    <img src={type.image} alt="type" />
                    <h4>{type.name}</h4>
                    <p>{type.count}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <h3 className={styles.propertyTitle}>Homes Guests Love</h3>
          <div className="row">
            {hotelData.map((hotel, index) => {
              return (
                <div
                  onClick={() => {
                    window.location.replace("/detail");
                  }}
                  key={index}
                  className="col-6 col-md-3 mb-2"
                >
                  <div className={styles.hotelItem}>
                    <img src={hotel.image_url} alt="hotel" />
                    <p className={styles.name}>
                      <a href="/#">{hotel.name}</a>
                    </p>
                    <p className={styles.city}>{hotel.city}</p>
                    <p className={styles.price}>Starting from ${hotel.price}</p>
                    <p>
                      <span className={styles.rate}>{hotel.rate}</span>
                      {hotel.type}
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
