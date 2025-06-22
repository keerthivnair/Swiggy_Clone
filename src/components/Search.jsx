import React, { useState } from "react";
import { useEffect } from "react";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);

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
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=9.9312328&lng=76.26730409999999&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=20a2c8e1-0e5c-314e-34a0-c0761dadb74d&selectedPLTab=DISH`
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
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=9.9312328&lng=76.26730409999999&str=${searchQuery}&trackingId=9fdc5ba9-91d2-9eb9-23f7-a443ffde361c&submitAction=ENTER&queryUniqueId=20a2c8e1-0e5c-314e-34a0-c0761dadb74d&selectedPLTab=RESTAURANT`
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

  return (
    <div className="w-full md:w-[800px] mx-auto">
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        className="w-[90%]  focus:outline-none border-2 px-10 py-3 mt-10 mb-10"
        placeholder="Search for restaurants and food"
      />
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
          </button>
        ))}
      </div>

      <div className="w-full md:w-[800px] p-4 bg-[#f4f5f7] grid grid-cols-2 gap-3">
        {activeBtn == "Dishes"
          ? dishes.map(
              ({
                card: {
                  card: {
                    info: { imageId = "", name, price, isVeg = 0 },
                    restaurant: {
                      info: {
                        id,
                        name: resName,
                        avgRating,
                        sla: { slaString },
                      },
                    },
                  },
                },
              }) => 
                <div className="w-full  bg-white h-[400px] ">
                    <div></div>
                    <div></div>
                </div>
            )
          : restaurantData.map(
              ({
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
              }) => 
                <h1>{name}</h1>
            )}
      </div>
    </div>
  );
}

export default Search;
