import React from "react";
import { addToCart } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function AddToCartBtn({ info, resInfo, handleIsDiffRes, id }) {
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const getResInfoFromLocalStorage = useSelector(
    (state) => state.cartSlice.resInfo
  );
  const dispatch = useDispatch();
  function handleAddToCart() {
    const isAdded = cartData.find((data) => data.id === info.id);
    if (!isAdded) {
      if (
        getResInfoFromLocalStorage.name == resInfo.name ||
        getResInfoFromLocalStorage.length == 0
      ) {
        dispatch(addToCart({ info, resInfo }));
        toast.success("Item added successfully to Cart");
      } else {
        toast.error("Your cart contains items from other restaurant.");
        handleIsDiffRes();
      }
    } else {
      toast.error("Item already added to cart ");
    }
  }
  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="bg-white absolute bottom-[-23px] left-1/2 -translate-x-1/2 border px-8 py-2 rounded-md shadow-xl shadow-gray-200 border-gray-300 text-green-600 font-bold text-lg"
      >
        ADD
      </button>
    </div>
  );
}

export default AddToCartBtn;
