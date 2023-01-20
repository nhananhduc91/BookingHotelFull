import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import SearchPopup from "../../components/Search/SearchPopup";
import SearchList from "../../components/Search/SearchList";
import SubscribeForm from "../../components/subscribeForm/SubscribeForm";
import styles from "./Search.module.css";
import { useSelector } from "react-redux";
import { apiUrl } from "../../utils/api";
import { useEffect } from "react";

export default function Search() {
  const [searchHotels, setSearchHotels] = useState();
  const { searchInput } = useSelector((state) => state.searchInput);

  const fetchSearchHotels = async () => {
    const response = await fetch(apiUrl.postSearch, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchInput,
      }),
    });
    const data = await response.json();
    setSearchHotels(data);
  };

  const fetchSearchHotelsInHomePage = async () => {
    const response = await fetch(apiUrl.postSearchInHomePage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchInput,
      }),
    });
    const data = await response.json();
    setSearchHotels(data);
  };

  useEffect(() => {
    fetchSearchHotels();
    fetchSearchHotelsInHomePage();
  }, [searchInput]);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          {searchHotels?.length > 0 ? (
            <div className="row">
              <SearchPopup />
              <SearchList searchHotels={searchHotels} />
            </div>
          ) : (
            <SearchPopup />
          )}
        </div>
      </div>
      <SubscribeForm />
      <Footer />
    </div>
  );
}
