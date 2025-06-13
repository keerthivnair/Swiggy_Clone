import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { Routes, Route } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";

import { useState } from "react";
import { Visibility } from "./Context/ContextApi";

function App() {
  const [visible,setVisible] = useState(false)
  return (
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
  );
}

export default App;
