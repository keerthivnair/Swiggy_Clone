import React, { useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import RestaurantCard from "./RestaurantCard";
library.add(fas, fab);

function TopRestaurants({data}) {
  const [value, setValue] = useState(0);
  function handleNext() {
    value >= 155 ? "" : setValue((prev) => prev + 50);
    //  console.log(value)
  }

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 50);
  }
  return (
    <div className="mt-12">
      <div className="flex justify-between mt-5">
        <h1 className="text-2xl font-bold">Top Restaurants chains in Kochi</h1>
        <div className="flex gap-3">
          <div
            className={`bg-gray-200 py-3 px-3 cursor-pointer rounded-full flex items-center justify-center ${
              value <= 0 ? " opacity-50" : ""
            }`}
            onClick={() => {
              handlePrev();
            }}
          >
            <FontAwesomeIcon
              className="text-sm"
              icon="fa-solid fa-arrow-left"
            />
          </div>
          <div
            className={`bg-gray-200 py-3 px-3 cursor-pointer rounded-full flex items-center justify-center ${
              value >= 155 ? " opacity-50" : ""
            }`}
            onClick={() => {
              handleNext();
            }}
          >
            <FontAwesomeIcon
              className="text-sm"
              icon="fa-solid fa-arrow-right"
            />
          </div>
        </div>
      </div>
      <div
        style={{ translate: `-${value}%` }}
        className={`flex mt-5 duration-300 gap-5`}
      >
        {data.map(({ info,cta:{link} }) => (
          <RestaurantCard  {...info} link={link}/>
        ))}
      </div>

      <hr className=" mx-auto mt-7 text-gray-100" />
    </div>
  );
}

export default TopRestaurants;
