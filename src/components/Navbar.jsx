import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Outlet, Link } from "react-router-dom";
import { CartContext, Coordinates, Visibility } from "../Context/ContextApi";
library.add(fas, fab);
import { useSelector, useDispatch } from "react-redux";
import { toggleLoginBar, toggleSearchBar } from "../utils/toggleSlice";
import SigninBtn from "./SigninBtn";
import SignoutBtn from "./SignoutBtn";

function Navbar() {
  const navItems = [
    {
      name: "Search  ",
      image: <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />,
      path: "/search",
    },

    {
      name: "Sign In",
      image: <FontAwesomeIcon icon="fa-solid fa-person" />,
      path: "/signIn",
    },
    {
      name: "Cart",
      image: <FontAwesomeIcon icon="fa-solid fa-cart-plus" />,
      path: "/cart",
    },
  ];

  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const visible = useSelector((state) => state.toggleSlice.searchBarToggle);
  const login = useSelector((state) => state.toggleSlice.searchLoginToggle);
  const dispatch = useDispatch();

  const [searchResult, setSearchResult] = useState([]);
  const { setCoord } = useContext(Coordinates);
  const [address, setAddress] = useState("");

  function handleVisibility() {
    dispatch(toggleSearchBar());
  }
  function handleLogin() {
    dispatch(toggleLoginBar());
  }
  async function searchResultFtn(val) {
    if (val == "") return;
    const res = await fetch(
      `https://cors-by-codethread-for-swiggy-vercel-app/cors/dapi/misc/place-autocomplete?input=${val}`
    );
    const json = await res.json();
    // console.log(json.data)
    setSearchResult(json.data);
  }
  async function fetchLanAndLon(id) {
    if (id == "") return;
    const res = await fetch(
      `https://cors-by-codethread-for-swiggy-vercel-app/cors/dapi/misc/address-recommend?place_id=${id}`
    );
    const json = await res.json();
    setCoord({
      lat: json.data[0].geometry.location.lat,
      lng: json.data[0].geometry.location.lng,
    });
    setAddress(json.data[0].formatted_address);
    handleVisibility();
  }

  const userData = useSelector((state) => state.authSlice.userData);
  console.log(userData);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* search-area */}

      <div className="w-full">
        <div
          className={
            "w-full bg-black/50 z-30 h-full absolute " +
            (visible ? " visible " : " invisible")
          }
          onClick={handleVisibility}
        ></div>
        <div
          className={
            "flex overflow-y-scroll justify-end p-5 bg-white w-[100%]  md:w-[40%] z-50 h-full absolute duration-300 " +
            (visible ? "left-0" : " -left-[100%] md:-left-[40%]")
          }
        >
          <div className="flex flex-col md:w-[70%] mr-6 gap-4 mt-3 ">
            <div
              className=" flex  items-center w-[40px] h-[40px] cursor-pointer"
              onClick={handleVisibility}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </div>

            <input
              type="text"
              className="border hover:text-orange-400 border-gray-400/50 focus:shadow-2xl p-5 focus:outline-none focus:shadow-lg"
              onChange={(e) => searchResultFtn(e.target.value)}
            ></input>
            <div className="border border-gray-400/50 pb-5 pt-5 pl-5">
              <ul className="">
                {searchResult.map((result, id) => (
                  <div className="my-5">
                    <div className="flex gap-4 cursor-pointer">
                      <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                      <li
                        className=""
                        onClick={() => fetchLanAndLon(result.place_id)}
                      >
                        {result.structured_formatting.main_text}{" "}
                        <p className="text-sm opacity-65">
                          {" "}
                          {result.structured_formatting.secondary_text}{" "}
                        </p>
                        {id == searchResult.length - 1 ? (
                          " "
                        ) : (
                          <p className="opacity-25">
                            -----------------------------------------------------
                          </p>
                        )}
                      </li>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* login-area */}
      <div className="w-full">
        <div
          className={
            "w-full bg-black/50 z-30 h-full absolute " +
            (login ? " visible " : " invisible")
          }
          onClick={handleLogin}
        ></div>
        <div
          className={
            "flex overflow-y-scroll justify-end p-5 bg-white w-full md:w-[40%] z-50 h-full absolute duration-300 " +
            (login ? " right-0" : "  -right-[100%] md:-right-[40%]")
          }
        >
          <div className="flex flex-col w-[70%] mr-14 gap-7 mt-3 ">
            <div className="w-full flex justify-between items-center">
              <div
                className=" flex  items-center w-[40px] h-[40px] cursor-pointer"
                onClick={handleLogin}
              >
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
              </div>
              <img
                className="w-[75px] h-[90px]"
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                alt=""
              />
            </div>

            <h1 className="border-b-2 pb-5 border-black font-bold text-3xl">
              Login
            </h1>

            <div>
              <SigninBtn />
              <p className="text-base mt-2 opacity-70">
                By clicking on Login, I accept the Terms & Conditions & Privacy
                Policy
              </p>
            </div>
            <div>
              <SignoutBtn />
            </div>
          </div>
        </div>
      </div>

      {/* main-background */}
      <div className="w-screen p-10 sticky z-20 top-0 bg-white shadow-md h-24 flex justify-center items-center  ">
        <div className="flex w-full md:w-[80%] justify-between">
          <div className="flex items-center gap-7">
            <Link to="/">
              <div className="w-7">
                <img
                  src="https://w7.pngwing.com/pngs/55/100/png-transparent-swiggy-hd-logo-thumbnail.png"
                  alt=""
                />
              </div>
            </Link>
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={() => {
                handleVisibility();
              }}
            >
              <div className="text-sm flex gap-3">
                <span className="font-bold border-b-2 ">Other</span>{" "}
                <span className=" text-gray-700 font-medium opacity-85 line-clamp-1">
                  {address}
                </span>
              </div>
              <FontAwesomeIcon
                className="text-orange-500 mt-1"
                icon="fa-solid fa-angle-down"
              />
            </div>
          </div>
          <div className="md:flex hidden items-center gap-2 md:gap-14">
            {navItems.map((item) =>
              item.name == "Sign In" ? (
                <div onClick={handleLogin} className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    {userData ? (
                      <img
                        className="w-8 h-8 rounded-lg"
                        src={userData.photo}
                        alt=""
                      />
                    ) : (
                      <p className="mt-1 text-gray-700 text-xl">{item.image}</p>
                    )}

                    <p className="text-md font-medium text-gray-700">
                      {userData ? userData.name : item.name}
                    </p>
                    {item.name === "Cart" && cartData.length >= 0 && (
                      <p>{cartData.length}</p>
                    )}
                  </div>
                </div>
              ) : (
                <Link to={item.path} className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <p className="mt-1 text-gray-700 text-xl">{item.image}</p>
                    <p className="text-md font-medium text-gray-700">
                      {item.name}
                    </p>
                    {item.name === "Cart" && cartData.length >= 0 && (
                      <p>{cartData.length}</p>
                    )}
                  </div>
                </Link>
              )
            )}
          </div>
          <div className="md:hidden p-10 flex gap-10">
            {navItems.map((data) =>
              data.name == "Sign In" ? (
                userData ? (
                  <img
                  onClick={handleLogin}
                    className="w-8 h-8 rounded-lg cursor-pointer"
                    src={userData.photo}
                    alt=""
                  />
                ) : (
                  <p onClick={handleLogin} className="scale-150 cursor-pointer">
                    {data.image}
                  </p>
                )
              ) : (
                <Link to={data.path} className="cursor-pointer">
                  <p>{data.image}</p>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
