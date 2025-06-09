import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
library.add(fas, fab);

function RestaurantCard(info) {
  // console.log('hello',info?.link.split("/")[5]);
  return (
    <Link to={`/restaurantmenu/${info?.link.split("/")[5]}`}>
    <div className="hover:scale-95 duration-300">
      <div className="min-w-[295px] h-[182px] relative cursor-pointer">
        <img
          className="w-full h-full rounded-2xl object-cover"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${info?.cloudinaryImageId}`}
          alt="restaurant"
        />
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black from-0.2% to-transparent to-40% rounded-2xl ">
          <p className="absolute bottom-0 ml-5 mb-4 text-white text-2xl font-bold ">
            {info?.aggregatedDiscountInfoV3?.header
              ? info?.aggregatedDiscountInfoV3?.header +
                " " +
                info?.aggregatedDiscountInfoV3?.subHeader
              : ""}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-lg font-bold">{info?.name}</h2>
        <p className="flex items-center gap-1  font-semibold text-black">
          <FontAwesomeIcon
            icon="fa-solid fa-star"
            style={{ color: "#36ec6d" }}
          />{" "}
          {info?.avgRating}.
          <span className="font-semibold text-black">
            {info?.sla?.slaString} min
          </span>
        </p>
        <p className="text-md text-gray-500 font-semibold line-clamp-1">
          {info?.cuisines?.join(", ")}
        </p>
        <p className="text-sm text-gray-500 font-semibold line-clamp-1">
          {info?.locality}
        </p>
      </div>
    </div>
    </Link>
  );
}

export default RestaurantCard;
