import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Dishes from "./Dishes";
import SearchRestaurant from "./SearchRestaurant";
import { Coordinates } from "../Context/ContextApi";
library.add(fas, fab);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const { coord, setCoord } = useContext(Coordinates);

  const filterOptions = [
    {
      filterName: "Restaurants",
    },
    {
      filterName: "Dishes",
    },
  ];
  const [activeBtn, setActiveBtn] = useState("Dishes");

  function handlefilterBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? activeBtn : filterName);
  }

  async function fetchDishes() {
    let data = await fetch(
      `https://cors-by-codethread-for-swiggy-vercel-app/cors/dapi/restaurants/search/v3?lat=${coord.lat}&lng=${coord.lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=20a2c8e1-0e5c-314e-34a0-c0761dadb74d&selectedPLTab=DISH`
    );
    let res = await data.json();
    // console.log(res)
    const data1 =
      (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(
        (data) => data?.card?.card?.info
      );
    setDishes(data1);
  }
 
  async function fetchRestaurantData() {
    let data = await fetch(
      `https://cors-by-codethread-for-swiggy-vercel-app/cors/dapi/restaurants/search/v3?lat=9.9312328&lng=76.26730409999999&str=${searchQuery}&trackingId=9fdc5ba9-91d2-9eb9-23f7-a443ffde361c&submitAction=ENTER&queryUniqueId=20a2c8e1-0e5c-314e-34a0-c0761dadb74d&selectedPLTab=RESTAURANT`
    );
    let res = await data.json();
    const data1 =
      (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(
        (data) => data?.card?.card?.info
      );
    setRestaurantData(data1);
    // console.log(restaurantData)
  }

  useEffect(() => {
    if (searchQuery === "" || searchQuery.length <= 0) {
      return;
    } else {
      fetchRestaurantData();
      fetchDishes();
    }
  }, [searchQuery]);

  function handleSearchQuery(e) {
    let val = e.target.value.trim();
    if (e.keyCode == 13) {
      setSearchQuery(val);
    }
  }

  return (
    <div className="w-full mt-10 md:w-[800px] mx-auto">
      <div className="w-full relative">
        <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="absolute text-md mt-1 ml-7 top-1/2 -translate-y-1/2" />
        <input
          onKeyDown={(e) => handleSearchQuery(e)}
          // onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          className=" text-xl w-[90%] ml-5 focus:outline-none border-2 pl-8 py-3 mt-10 mb-10"
          placeholder="Search for restaurants and food"
        />
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="absolute bottom-[41%] right-[10%]" />
      </div>

      <div className="mb-7 flex gap-3 flex-wrap ml-5">
        {filterOptions.map((option) => (
          <button
            onClick={() => handlefilterBtn(option.filterName)}
            className={
              "text-sm flex gap-2 items-center filterBtn" +
              (activeBtn === option.filterName ? " active " : " ")
            }
          >
            {option.filterName}
          </button>
        ))}
      </div>

      <div className="w-full md:w-[800px] p-4 grid grid-cols-1 md:grid-cols-2  bg-[#f4f5f7]">
        {activeBtn == "Dishes"
          ? dishes.map((data) => <Dishes data={data} />)
          : restaurantData.map((data) => <SearchRestaurant data={data} />)}
      </div>
    </div>
  );
}

export default Search;
