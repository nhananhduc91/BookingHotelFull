import React from "react";
import styles from "./SearchForm.module.css";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import format from "date-fns/format";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function SearchForm() {
  //Thiết lập trạng thái mặc định cho lịch
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  //Thiết lập trạng thái ẩn hiện lịch
  const [showDateRange, setShowDateRange] = useState(false);

  //Update thay đổi ngày bằng useRef
  const ref = useRef(null);

  //Sử dụng useEffect để xử lý đóng lịch khi click chuột ngoài lịch hoặc nhấn escape
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setShowDateRange(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShowDateRange(false);
    }
  };

  const toSearchPage = () => {
    window.location.replace("/search");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} id={styles.searchForm}>
          <div className="row align-items-center ">
            <div className="col-12 col-md-6 col-lg-3 mb-1">
              <i className="fa fa-bed"></i>
              <input type="text" placeholder="Where are you going?" />
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-1">
              <div className="d-flex align-items-center">
                <i className="fa fa-calendar"></i>
                <input
                  value={`${format(
                    range[0].startDate,
                    "MM/dd/yyyy"
                  )} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
                  placeholder="When will you going?"
                  onClick={() => setShowDateRange(true)}
                />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-1">
              <div className="d-flex align-items-center">
                <i className="fa fa-female"></i>
                <div className={styles.peopleItem}>
                  <input type="number" placeholder="1" />
                  <p>adult</p>
                </div>
                <div className={styles.peopleItem}>
                  <input type="number" placeholder="0" />
                  <p>children</p>
                </div>
                <div className={styles.peopleItem}>
                  <input type="number" placeholder="0" />
                  <p>room</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-1 mb-1">
              <button
                className={styles.submitBtn}
                type="submit"
                onClick={toSearchPage}
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <div className={styles.dateRange} ref={ref}>
          {showDateRange && (
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={1}
              direction="horizontal"
              className="calendarElement"
              onChange={(item) => setRange([item.selection])}
            />
          )}
        </div>
      </div>
    </div>
  );
}
