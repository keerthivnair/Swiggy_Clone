import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { Routes, Route } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import {useSelector} from 'react-redux'
import { useState, useEffect } from "react";
import { CartContext, Coordinates, Visibility } from "./Context/ContextApi";
import Cart from "./components/Cart";
import SigninPage from "./components/SigninBtn";
import Search from "./components/Search";

function App() {
  
  const [coord,setCoord] = useState({lat:10.0013655,lng:76.310081})
  const visible = useSelector((state) => state.toggleSlice.searchBarToggle)
  const login = useSelector((state) => state.toggleSlice.searchLoginToggle)


  
  return (
    <Coordinates.Provider value={{coord,setCoord}}>
    <div className={visible || login ? " overflow-hidden max-h-screen" : " "}>
      <Routes>
        <Route path="/" element={<Navbar />}>
         <Route path="/" element={<Body />}/>
         <Route path="/restaurantmenu/:id" element={<RestaurantMenu />}/>
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/search" element={<Search/>}/>
         
         <Route path="*" element={<h1>coming soon .........</h1>}/>
        </Route>
      </Routes>
    </div>
    {/* </Visibility.Provider> */}
    </Coordinates.Provider>
    // </CartContext.Provider>
  );
}

export default App;
