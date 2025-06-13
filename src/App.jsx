import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { Routes, Route } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";

import { useState } from "react";
import { Coordinates, Visibility } from "./Context/ContextApi";

function App() {
  const [visible,setVisible] = useState(false)
  const [coord,setCoord] = useState({lat:10.0013655,lng:76.310081})
  return (
    <Coordinates.Provider value={{coord,setCoord}}>
    <Visibility.Provider value ={{visible,setVisible}}>
    <div className={visible? " overflow-hidden max-h-screen" : " "}>
      <Routes>
        <Route path="/" element={<Navbar />}>
         <Route path="/" element={<Body />}/>
         <Route path="/restaurantmenu/:id" element={<RestaurantMenu />}/>
        </Route>
      </Routes>
    </div>
    </Visibility.Provider>
    </Coordinates.Provider>
  );
}

export default App;
