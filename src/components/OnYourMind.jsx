import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

function OnYourMind({ data }) {
  const [value, setValue] = useState(0);

  function handleNext() {
    value >= 155 ? "" : setValue((prev) => prev + 40);
    //  console.log(value)
  }

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 40);
  }
  return (
    <div>
      <div className="flex justify-between mt-5">
        <h1 className="text-2xl font-bold">What's on your mind?</h1>
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
        className={`flex mt-5 duration-300 `}
      >
        { data.map((item) => (
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
            width="144"
            height="180"
            alt="restaurants curated for pothichoru"
          />
        ))}
      </div>
      <hr className=" mx-auto mt-7 text-gray-100" />
    </div>
  );
}

export default OnYourMind;
