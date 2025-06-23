import React from "react";
library.add(fas, fab);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { nonveg } from "../utils/links";
import { veg } from "../utils/links";
import AddToCartBtn from "./AddToCartBtn";
import { useDispatch, useSelector } from "react-redux";
import { toggleDiffRes } from "../utils/toggleSlice";
import { clearrCart } from "../utils/cartSlice";

function Dishes({
  data: {
    card: {
      card: {
        info,
        restaurant: { info: resInfo },
      },
    },
  },
}) {
  let { imageId = "", name, price, isVeg = 0 } = info;
  let {
    id,
    name: resName,
    avgRating,
    sla: { slaString },
  } = resInfo;

  const isDiffRes = useSelector((state) => state.toggleSlice.isDiffRes);
  const dispatch = useDispatch();
  function handleIsDiffRes() {
    dispatch(toggleDiffRes());
  }
  function clearCart() {
    handleIsDiffRes();
    dispatch(clearrCart());
    toast.success("Empty Cart !");
  }

  return (
    <>
      <div className="bg-white rounded-2xl p-4 m-4">
        <div className="opacity-50 flex justify-between text-sm">
          <div className=" ">
            <p>{resName}</p>
            <p className="font-bold my-2">
              {" "}
              <FontAwesomeIcon
                icon="fa-solid fa-star"
                style={{ color: "#36ec6d" }}
              />{" "}
              {avgRating} . {slaString}
            </p>
          </div>
          <i>
            <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
          </i>
        </div>
        <hr className="border-dotted" />

        <div className="my-3 md:max-w-fit flex justify-between">
          <div className="w-[50%] md:w-[168px] flex flex-col gap-2">
            <div className="w-5 h-5">
              {isVeg ? <img src={veg} alt="" /> : <img src={nonveg} alt="" />}
            </div>
            <p className="text-lg font-semibold">{name}</p>
            <p className=""> ₹{price / 100}</p>
            <button className="cursor-pointer w-max px-4 py-1 rounded-3xl border">
              More details
            </button>
          </div>
          <div className="w-[40%] cursor-pointer md:w-[40%] relative h-full">
            <img
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                imageId
              }
              alt=""
              className="aspect-square rounded-xl object-cover"
            />
            {/* <button
              // onClick={handleAddToCart}
              className="bg-white absolute bottom-[-23px] left-1/2 -translate-x-1/2 border px-8 py-2 rounded-md shadow-xl shadow-gray-200 border-gray-300 text-green-600 font-bold text-lg"
            >
              ADD
            </button> */}
            <AddToCartBtn
              info={info}
              resInfo={resInfo}
              handleIsDiffRes={handleIsDiffRes}
            />
          </div>
        </div>
      </div>
      {isDiffRes && (
        <div className="p-8 z-40 w-[520px] gap-5 h-[215px]  fixed bottom-7 left-[33%] bg-white flex flex-col justify-around ">
          <h1 className="text-start font-bold text-lg">
            Items already in cart
          </h1>
          <p className="text-start text-gray-500 font-medium">
            Your cart contains items from other restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </p>
          <div className=" flex gap-3.5 items-center justify-start w-full uppercase">
            <button
              className="cursor-pointer w-1/2 py-2 border-green-700 text-green-700 font-bold border"
              onClick={handleIsDiffRes}
            >
              N0
            </button>
            <button
              className="cursor-pointer w-1/2 py-2 bg-green-700 border-green-700 text-white font-bold border"
              onClick={clearCart}
            >
              YES, START AFRESH
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Dishes;
