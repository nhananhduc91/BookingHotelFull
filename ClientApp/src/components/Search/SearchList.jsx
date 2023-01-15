import React from "react";
import searchData from "../../data/search.json";
import SearchListItem from "./SearchListItem";

export default function SearchList() {
  return (
    <div className="col-12 col-lg-9">
      {searchData.map((item, index) => {
        return (
          <div key={index}>
            <SearchListItem item={item} />
          </div>
        );
      })}
    </div>
  );
}
