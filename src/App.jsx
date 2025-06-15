import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { Routes, Route } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";

import { useState, useEffect } from "react";
import { CartContext, Coordinates, Visibility } from "./Context/ContextApi";
import Cart from "./components/Cart";

function App() {
  const [visible,setVisible] = useState(false)
  const [coord,setCoord] = useState({lat:10.0013655,lng:76.310081})
  const [cartData,setCartData] = useState([])
  
  function get_Data_From_Local_Storage(){
    let data = JSON.parse(localStorage.getItem("cartData")) || []
    setCartData(data)
  }

  useEffect(()=>{
    get_Data_From_Local_Storage()
  },[])
  
  return (
    <CartContext.Provider value={{cartData,setCartData}}>
    <Coordinates.Provider value={{coord,setCoord}}>
    <Visibility.Provider value ={{visible,setVisible}}>
    <div className={visible? " overflow-hidden max-h-screen" : " "}>
      <Routes>
        <Route path="/" element={<Navbar />}>
         <Route path="/" element={<Body />}/>
         <Route path="/restaurantmenu/:id" element={<RestaurantMenu />}/>
         <Route path="/cart" element={<Cart/>}/>
         <Route path="*" element={<h1>coming soon .........</h1>}/>
        </Route>
      </Routes>
    </div>
    </Visibility.Provider>
    </Coordinates.Provider>
    </CartContext.Provider>
  );
}

export default App;
