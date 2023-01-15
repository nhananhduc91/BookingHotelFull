import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import SearchPopup from "../../components/Search/SearchPopup";
import SearchList from "../../components/Search/SearchList";
import SubscribeForm from "../../components/subscribeForm/SubscribeForm";
import styles from "./Search.module.css";

export default function Search() {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <div className="row">
            <SearchPopup />
            <SearchList />
          </div>
        </div>
      </div>
      <SubscribeForm />
      <Footer />
    </div>
  );
}
