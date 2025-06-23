import React from "react";
library.add(fas, fab);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

function SearchRestaurant({
  data: {
    card: {
      card: {
        info: {
          id,
          cloudinaryImageId,
          cuisines,
          promoted = false,
          costForTwoMessage,
          aggregatedDiscountInfoV3 = {},
          name,
          avgRating,
          sla: { slaString },
        },
      },
    },
  },
}) {
  return (
    <div className=" m-4 p-4 bg-white flex gap-5 items-center md:max-w-fit">
      <div className=" w-[30%]">
        <img
          className="aspect-square rounded-lg"
          src={
            `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${cloudinaryImageId}`
          }
          alt=""
        />
      </div>
      <div className="w-[60%]">
        <p className="font-bold line-clamp-1">{name}</p>
        <p className=" my-1">
          {" "}
          <FontAwesomeIcon
            icon="fa-solid fa-star"
            style={{ color: "#36ec6d" }}
          />{" "}
          {avgRating} . {costForTwoMessage}
        </p>
        <p className="line-clamp-1">{cuisines.join(", ")}</p>
      </div>
    </div>
  );
}

export default SearchRestaurant;
