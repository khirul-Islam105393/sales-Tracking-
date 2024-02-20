import { Outlet } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Navbar from "./components/Nabvar/Navbar";
import { createContext, useState } from "react";

export const cartContext = createContext()
const App = () => {


  const [cart, setCart]=useState([])


 



  return (
    <cartContext.Provider value={{cart, setCart}}>

<div className="App">
      <Navbar />
      <Outlet />
    </div>

    </cartContext.Provider>
   
  );
};

export default App;
