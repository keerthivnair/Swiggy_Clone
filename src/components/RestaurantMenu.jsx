import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
function RestaurantMenu() {
  const { id } = useParams();
  let mainId = id.split("-").at(-1).split("rest")[1];
  // console.log(id.split("-").at(-1).split("rest")[1]);
  const fetchData = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=10.0112&lng=76.305&restaurantId=${mainId}&submitAction=ENTER`
    );
    const json = await data.json();

    setResInfo(json?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    let actualMenu = (json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data) =>(data?.card?.card.itemCards)
    )
    console.log(actualMenu)
    setmenuData(actualMenu);
  };
  // console.log(resInfo)
  const [menuData, setmenuData] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [value, setValue] = useState(0);
  const handleNext = () => {
    setValue(value + 100);
  };
  const handlePrev = () => {
    setValue(value - 100);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[800px]  mx-auto p-4">
        <p className="text-[10px] font-bold text-slate-500 flex gap-1 ">
          {" "}
          <Link to="/">
            {" "}
            <span className="hover:text-slate-700 cursor-pointer ">Home </span>
          </Link>
          /{" "}
          <Link to="/">
            <span className="hover:text-slate-700 cursor-pointer ">
              {" "}
              {resInfo?.city}
            </span>
          </Link>{" "}
          /{" "}
          <span className="text-slate-700 font-bold hover:text-slate-700 cursor-pointer">
            {resInfo?.name}
          </span>
        </p>
        <h1 className="text-2xl pt-10 pb-5 font-bold">{resInfo?.name}</h1>
        <div className="bg-gradient-to-b from-white to-gray-300 w-full h-[206px] p-5  rounded-3xl">
          <div className=" flex flex-col gap-2 w-full border-2 p-4 border-gray-300 bg-white rounded-3xl h-full">
            <div className="flex gap-1 items-center text-md font-bold">
              <FontAwesomeIcon icon={faStar} className="text-green-600" />
              <p className="">{resInfo?.avgRating}</p>
              <p className="">({resInfo?.totalRatingsString})</p>
              <p className="flex items-center justify-center w-1 h-1 bg-gray-500 rounded-full"></p>
              <p className="">{resInfo?.costForTwoMessage}</p>
            </div>
            <div className="flex gap-1 text-md font-bold">
              <p className="text-orange-500 underline ml-1 text-sm">
                {resInfo?.cuisines?.join(", ")}
              </p>
            </div>
            <div className="flex gap-3 ml-1 mt-3">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2  rounded-full bg-gray-300"></div>
                <div className="w-0.5 h-6 bg-gray-300"></div>
                <div className="w-2 h-2  rounded-full bg-gray-300"></div>
              </div>
              <div className="flex flex-col mt-[-5px] gap-2 text-sm font-bold justify-between">
                <div className="flex gap-3">
                  <p>Outlet</p>
                  <p className="text-gray-500">{resInfo?.areaName}</p>
                </div>
                <p>{resInfo?.sla?.slaString?.toLowerCase()}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="w-full">
            <div className="flex justify-between mt-5 pt-4 pb-5 items-center">
              <h1 className="text-xl font-bold">Deals for you</h1>
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
            <div className="flex gap-5 overflow-hidden">{
              discountData.map((data)=>(
                <Discount data={data}/>
              ))
            }</div>
            
          </div>
    <h2 className="text-center text-gray-500 font-bold mt-12 text-sm"> M E N U</h2>
    <div className='w-full mt-5 bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer'>
      <div className='w-full p-4  text-md text-center font-semibold text-gray-500 '>Search for dishes</div>
      <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="text-gray-500 mr-4.5" />
    </div>

          <div>
            {
              menuData.map(({card:{card:{itemCards,title}}})=>(
                <h2>{title} ({itemCards.length})</h2>
              ))
            }
            </div>     
          <hr className=" mx-auto mt-7 text-gray-100" />
        </div>
      </div>
    </div>
  );
}

function Discount({data:{info:{header,offerLogo,couponCode}}}) {
  // console.log(header)
  return <div className="flex gap-2 items-center min-w-[329px] h-[76px] border-1 border-gray-300 rounded-3xl p-5 mt-3">
    <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerLogo} alt="" className="w-12 h-12" />
    <div>
      <h2 className="text-md font-extrabold">{header}</h2>
      <p className="text-xs text-gray-500 font-bold">{couponCode}</p>
    </div>
  </div>;
}

export default RestaurantMenu;
