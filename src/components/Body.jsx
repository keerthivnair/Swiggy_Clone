import React, { useState, useEffect } from "react";
import OnYourMind from "./OnYourMind";
import TopRestaurants from "./TopRestaurants";
import OnlineFoodDelivery from "./OnlineFoodDelivery";

function Body() {
  const [topRestaurantsData, setTopRestaurantsData] = useState([]);
  const [onYourMindData, setOnYourMindData] = useState([]);

  async function fetchData() {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=9.94060&lng=76.26530&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await response.json();
    // console.log(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setTopRestaurantsData(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setOnYourMindData(json?.data?.cards[0]?.card?.card?.imageGridCards?.info);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[82%] flex mx-auto mt-3 border-b border-gray-200  overflow-hidden  flex-col">
        <OnYourMind data={onYourMindData} />
        <TopRestaurants data={topRestaurantsData} />
        <OnlineFoodDelivery data={topRestaurantsData} /> 
      </div>
    </div>
  );
}

export default Body;
