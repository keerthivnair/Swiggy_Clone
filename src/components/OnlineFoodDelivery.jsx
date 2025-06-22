import React from "react";
import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterVal } from "../utils/filterSlice";



function OnlineFoodDelivery({ data, title }) {
  const filterOptions = [
  {
    filterName: "Ratings 4.0+",
  },
  {
    filterName: "Offers",
  },
  {
    filterName: "Rs 300-Rs. 600",
  },
  {
    filterName: "Less than Rs. 300",
  },
];
  const [activeBtn, setActiveBtn] = useState(null);
  const dispatch = useDispatch();

  function handlefilterBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? null : filterName);
  }
  dispatch(setFilterVal(activeBtn));

  return (
    <div className="mt-12 w-full flex flex-col gap-7 ">
      <p className="text-2xl font-bold">{title}</p>

      <div className="mb-7 flex gap-3 flex-wrap">
        {filterOptions.map((option) => (
          <button
            onClick={() => handlefilterBtn(option.filterName)}
            className={
              "text-sm flex gap-2 items-center filterBtn" +
              (activeBtn === option.filterName ? " active" : " ")
            }
          >
            {option.filterName}
            <i className="fa-solid fa-xmark hidden"></i>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7">
        {data &&
          data.map(({ info, cta: { link } }) => (
            <RestaurantCard {...info} link={link} />
          ))}
      </div>
    </div>
  );
}

export default OnlineFoodDelivery;
