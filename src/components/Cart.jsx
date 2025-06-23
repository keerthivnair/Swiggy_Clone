import React, { useContext } from "react";
import { CartContext } from "../Context/ContextApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, clearrCart } from "../utils/cartSlice";
import toast from "react-hot-toast";
import { toggleLoginBar } from "../utils/toggleSlice";

let nonveg =
  "https://packagingguruji.com/wp-content/uploads/2022/09/New-Non-Logo.png";
let veg =
  " https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg";

function Cart() {
  let totalPrice = 0;
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);

  for (let i = 0; i < cartData.length; i++) {
    totalPrice += cartData[i].price / 100 || cartData[i].defaultPrice / 100;
  }

  function clearCart() {
    dispatch(clearrCart());
    toast.success("Empty Cart !");
  }
  if (cartData.length <= 0) {
    return (
      <div className="flex flex-col gap-7 justify-center items-center w-full mt-[120px]">
        <img
          className="h-[200px]"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
          alt=""
        />
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-gray-700 text-xl">
            Your cart is empty
          </h1>
          <p className="font-semibold text-gray-500 ">
            You can go to home page to view more restaurants
          </p>
        </div>

        <Link to="/">
          <button className="cursor-pointer p-5 bg-orange-600 font-bold text-lg text-white">
            SEE RESTAURANTS NEAR YOU
          </button>
        </Link>
      </div>
    );
  }
  const dispatch = useDispatch();
  function handleRemoveFromCart(i) {
    let newArr = [...cartData];
    newArr.splice(i, 1);
    if (newArr.length <= 0) {
      clearCart();
    }
    dispatch(deleteItem(newArr));
    toast.success("Item removed from cart");
    // setCartData(newArr);
  }

  const userData = useSelector((state) => state.authSlice.userData);
  function handlePlaceOrder() {
    if (!userData) {
      toast.error("Please login to place order");
      dispatch(toggleLoginBar());
      return;
    }
    toast.success("Your order has been placed");
  }

  return (
    <div className="w-full md:w-[80%] mx-auto">
      <div className="w-[75%] mx-auto">
        <Link to={`/restaurantMenu/rest${resInfo.id}`}>
          <div className="my-10 flex gap-5">
            <img
              className="rounded-xl w-40 aspect-square"
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                resInfo.cloudinaryImageId
              }
              alt=""
            />
            <div>
              <p className="text-5xl border-b-2 border-black pb-3 ">
                {resInfo.name}
              </p>
              <p className="mt-3 text-xl ">{resInfo.areaName}</p>
            </div>
          </div>
        </Link>
        <hr className="my-5 border-2" />
        <div>
          {cartData.map(
            (
              {
                name,
                defaultPrice,
                price,
                itemAttribute,
                ratings: {
                  aggregatedRating: { rating, ratingCountV2 },
                },
                description,
                imageId,
              },
              i
            ) => {
              return (
                <>
                  <div
                    key={imageId}
                    className="flex w-full my-5 justify-between min-h-[182px]"
                  >
                    <div className="w-[55%] md:w-[70%]">
                      <img
                        className="w-5 rounded-sm"
                        src={
                          itemAttribute && itemAttribute.vegClassifier == "VEG"
                            ? veg
                            : nonveg
                        }
                        alt=""
                        srcset=""
                      />
                      <h2 className="font-bold text-lg">{name}</h2>
                      <p className="font-bold text-lg">
                        ₹{defaultPrice / 100 || price / 100}{" "}
                      </p>

                      <div className="flex items-center gap-1">
                        {" "}
                        <i className={"fi mt-1 text-xl fi-ss-star"}></i>{" "}
                        <span>
                          {rating} ({ratingCountV2})
                        </span>
                      </div>

                      <div className="line-clamp-2">{description}</div>
                    </div>
                    <div className="w-[40%] md:w-[20%] relative h-full">
                      <img
                        className="rounded-xl aspect-square"
                        src={
                          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                          imageId
                        }
                        alt=""
                      />
                      <button
                        onClick={() => handleRemoveFromCart(i)}
                        className="bg-white absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-base text-red-500 font-bold rounded-xl border px-5 py-2 drop-shadow"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <hr className="my-10" />
                </>
              );
            }
          )}
        </div>

        <h1 className="text-2xl">
          Total - <span className="font-bold">₹{totalPrice}</span>
        </h1>
        <div className="flex justify-between">
          <button
            onClick={handlePlaceOrder}
            className="p-3 bg-green-600 rounded-lg my-7"
          >
            Place order
          </button>
          <button
            onClick={clearCart}
            className="p-3 bg-green-600 rounded-lg my-7"
          >
            clear cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
