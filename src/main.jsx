import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Square from './components/Square/Square.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import Cart from './components/Cart/Cart.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  children: [
  {
  path:"Square",
  element:<Square />
  
  },
  {
  path:"Order-Page",
  element:<ProductDetails />
  
  },
  {
  path:"cart",
  element:<Cart />
  
  }
   
  ]

  }
 
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
