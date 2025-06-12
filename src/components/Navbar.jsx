import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Outlet, Link } from "react-router-dom";
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

  const [visible, setVisible] = useState(false);

  
  function handleVisibility() {
    setVisible(prev => !prev);
  }

  return (
    <div className="relative w-full h-full">
      {/* search-area */}

      <div className="w-full">
        <div className={"w-full bg-black/50 z-30 h-full absolute" + (visible? " visible" : " invisible")} onClick={handleVisibility}></div>
         <div className={"bg-white w-[40%] z-50 h-full absolute duration-300 " + (visible? "left-0":" -left-[40%]")}>
          <p className="bg-black text-white p-5 w-[10%]" onClick={handleVisibility}>cut</p>
         </div>
      </div>

      {/* main-background */}
      <div className="w-screen sticky z-20 top-0 bg-white shadow-md h-24 flex justify-center items-center ">
        <div className="flex w-[70%] justify-between">
          <div className="flex items-center gap-7">
            <Link to="/">
              <img
                className="w-7"
                src="https://w7.pngwing.com/pngs/55/100/png-transparent-swiggy-hd-logo-thumbnail.png"
                alt=""
              />
            </Link>
            <div
              className=" cursor-pointer flex items-center gap-2"
              onClick={() => {
                handleVisibility();
              }}
            >
              <p className=" font-bold border-b-2 text-gray-700">Other</p>
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
