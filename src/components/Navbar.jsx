import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Outlet, Link } from "react-router-dom";
import { Coordinates, Visibility } from "../Context/ContextApi";
library.add(fas, fab);

function Navbar() {
  const navItems = [
    {
      name: "Swiggy Corporate",
      image: <FontAwesomeIcon icon="fa-solid fa-bag-shopping" />,
    },
    {
      name: "Search  ",
      image: <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />,
    },
    {
      name: "Offers",
      image: <FontAwesomeIcon icon="fa-solid fa-percent" />,
    },
    {
      name: "Help",
      image: <FontAwesomeIcon icon="fa-solid fa-suitcase-medical" />,
    },
    {
      name: "Sign In",
      image: <FontAwesomeIcon icon="fa-solid fa-person" />,
    },
    {
      name: "Cart",
      image: <FontAwesomeIcon icon="fa-solid fa-cart-plus" />,
    },
  ];

  const {visible,setVisible} = useContext(Visibility)
  const [searchResult,setSearchResult] = useState([])
  const {setCoord} = useContext(Coordinates)
  const [address,setAddress]= useState('')
  
  function handleVisibility() {
    setVisible(prev => !prev);
  }
  async function searchResultFtn(val){
    if (val == '') return 
    const res = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`)
    const json = await res.json()
    // console.log(json.data)
    setSearchResult(json.data)
  }
  async function fetchLanAndLon(id){
    if (id == '') return 
    const res = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`)
    const json = await res.json()
    setCoord({'lat':json.data[0].geometry.location.lat,
      'lng': json.data[0].geometry.location.lng}
    )
    setAddress(json.data[0].formatted_address)
  }





  return (
    <div className="relative w-full h-full">
      {/* search-area */}

      <div className="w-full">
        <div className={"w-full bg-black/50 z-30 h-full absolute " + (visible? " visible " : " invisible")} onClick={handleVisibility}></div>
         <div className={ " p-5 bg-white w-[40%] z-50 h-full absolute duration-300 " + (visible? "left-0":" -left-[40%]")}>
          <p className="bg-black cursor-pointer text-white p-5 w-[10%] flex justify-center items-center " onClick={handleVisibility}>cut</p>
         
          <input type="text" className="border p-3 focus:outline-none focus:shadow-lg" onChange={(e)=>searchResultFtn(e.target.value)}></input>
          <div>
            <ul>
              {searchResult.map((result) => (
                <li onClick={()=>fetchLanAndLon(result.place_id)}>{result.structured_formatting.main_text} <p className="text-sm opacity-65"> {result.structured_formatting.secondary_text} </p></li>
              ))}
            </ul>
            </div> 
         </div>
      </div>

      {/* main-background */}
      <div className="w-screen sticky z-20 top-0 bg-white shadow-md h-24 flex justify-center items-center ">
        <div className="flex w-[75%] justify-between">
          <div className="flex items-center gap-7">
            <Link to="/">
              <img
                className="w-7"
                src="https://w7.pngwing.com/pngs/55/100/png-transparent-swiggy-hd-logo-thumbnail.png"
                alt=""
              />
            </Link>
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={() => {
                handleVisibility();
              }}
            >
              <div className="text-sm flex gap-3">
                <span className="font-bold border-b-2 ">Other</span> <span className=" text-gray-700 font-medium opacity-85">{address}</span>
                </div>
              <FontAwesomeIcon
                className="text-orange-500 mt-1"
                icon="fa-solid fa-angle-down"
              />
            </div>
          </div>
          <div className="flex items-center gap-14">
            {navItems.map((item) => (
              <div className="flex items-center gap-3">
                <p className="mt-1 text-gray-700 text-xl">{item.image}</p>
                <p className="text-md font-medium text-gray-700">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
