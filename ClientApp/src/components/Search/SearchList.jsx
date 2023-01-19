import React from "react";
import SearchListItem from "./SearchListItem";

export default function SearchList(props) {
  const { searchHotels } = props;
  return (
    <div className="col-12 col-lg-9">
      {searchHotels?.map((item, index) => {
        return (
          <div key={index}>
            <SearchListItem item={item} />
          </div>
        );
      })}
    </div>
  );
}
