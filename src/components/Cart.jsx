import React, { useContext } from "react";
import { CartContext } from "../Context/ContextApi";
import { Link } from "react-router-dom";

function Cart() {
  const { cartData, setCartData } = useContext(CartContext);

  if (cartData.length <= 0) {
    return (
      <div className="flex flex-col gap-7 justify-center items-center w-full mt-[120px]">
        <img
          className="h-[200px]"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
          alt=""
        />
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-gray-700 text-xl">Your cart is empty</h1>
          <p className="font-semibold text-gray-500 ">You can go to home page to view more restaurants</p>
        </div>

        <Link to="/">
          <button className="cursor-pointer p-5 bg-orange-600 font-bold text-lg text-white">
            SEE RESTAURANTS NEAR YOU
          </button>
        </Link>
      </div>
    );
  }

  function handleRemoveFromCart(i){
    let newArr = [...cartData]
     newArr.splice(i,1)
     setCartData(newArr)
  }

  return (
    <div className="w-full">
      <div className="w-[50%] mx-auto">
        {cartData.map((data,i) => (
          <div className="flex w-full justify-between my-5 p-2">
            <h2 className="w-[70%] text-2xl">{data.name}</h2>
            <div className="cursor-pointer w-[20%] relative h-full">
              {data.imageId ? (
                <>
                  <img
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                      data.imageId
                    }
                    alt=""
                    className="aspect-square rounded-xl"
                  />
                  <button
                    // onClick={handleAddToCart}
                    className="cursor-pointer bg-red-400 absolute bottom-[-23px] left-10 border px-2 py-2 rounded-md shadow-xl shadow-gray-200 border-gray-300 text-white font-bold text-sm"
                    onClick={() => handleRemoveFromCart(i)}
                  >
                    REMOVE
                  </button>
                </>
              ) : (
                <button
                  //   onClick={handleAddToCart}
                  className="cursor-pointer bg-red-400 absolute bottom-[-120px] left-10 border px-2 py-2 rounded-md shadow-xl shadow-gray-200 border-gray-300 text-white font-bold text-sm"
                  onClick={() => handleRemoveFromCart(i)}
                >
                  ADD
                </button> 
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
