import React, { useState, useEffect, useContext } from "react";
import OnYourMind from "./OnYourMind";
import TopRestaurants from "./TopRestaurants";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import { Coordinates } from "../Context/ContextApi";
import { useSelector } from "react-redux";


function Body() {
  const [topRestaurantsData, setTopRestaurantsData] = useState([]);
  const [topResTitle, setTopResTitle] = useState('');
  const [onlineTitle, setOnlineTitle] = useState('');
  const [onYourMindData, setOnYourMindData] = useState([]);
  const {coord,setCoord} = useContext(Coordinates)
  const [data,setData] = useState({})
  console.log(coord.lat,coord.lng)
  async function fetchData() {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coord.lat}&lng=${coord.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    
    // https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=10.0013655&lng=76.310081&restaurantId=763910&catalog_qa=undefined&submitAction=ENTER
    const json = await response.json();
    // console.log(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setTopResTitle(json?.data?.cards[1]?.card?.card?.header?.title)
    setOnlineTitle(json?.data?.cards[2]?.card?.card?.title)
    setTopRestaurantsData(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setData(json?.data)
    setOnYourMindData(json?.data?.cards[0]?.card?.card?.imageGridCards?.info);
  }

  useEffect(() => {
    fetchData();
  }, [coord.lat,coord.lng]);


  const filterVal = useSelector((state) => state.filterSlice.filterVal)

  const filteredData = topRestaurantsData?.filter(item=>{
        if (!filterVal) return true;

        switch (filterVal) {
          case "Ratings 4.0+": return item?.info.avgRating > 4
          case "Offers": return item?.info?.aggregatedDiscountInfoV3?.subHeader != null
          case "Rs 300-Rs. 600": return item?.info?.costForTwo?.split(' ')[0].slice(1)>= '300' && item?.info?.costForTwo?.split(' ')[0].slice(1) <='600'
          case "Less than Rs. 300": return item?.info?.costForTwo?.split(' ')[0].slice(1) <'300'
          default : return true;
        }

  })

  if (data && data.communication) {
    return <div className="flex flex-col mt-48 overflow-hiddenflex-col justify-center items-center gap-5">
      <img className="w-72" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="" />
      <h1 className="font-bold text-lg">Location Unserviceable</h1>
      <p className="text-gray-700 font-semibold">We don’t have any services here till now. Try changing location.</p>
    </div>
  }
  
  return (
    <div className="w-full overflow-y-visible">
      <div className="w-[100%]  px-10  sm:w-[95%] lg:w-[85%] flex mx-auto mt-3 border-b border-gray-200  overflow-hidden  flex-col">
        <OnYourMind data={onYourMindData}  />
        <TopRestaurants data={topRestaurantsData}  title={topResTitle}/>
        <OnlineFoodDelivery data={filterVal ?filteredData: topRestaurantsData} title={onlineTitle}/> 
      </div>
    </div>
  );
}

export default Body;
