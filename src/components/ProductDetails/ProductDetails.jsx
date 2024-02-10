// import React, { useState } from 'react';

// const ProductDetails = () => {
//   const [productName, setProductName] = useState("");
//   const [price, setPrice] = useState("");
//   const [weight, setWeight] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [totalPrice, setTotalPrice] = useState("");
//   const [products, setProducts] = useState([]);

//   const calculateTotal = (e) => {
//     const inputQuantity = e.target.value;
//     if (!inputQuantity) return 'Please insert any quantity';
//     else {
//         setQuantity(inputQuantity);
//         setTotalPrice(price * inputQuantity);
//     }
// };

//   const disPlayProductDetails = (e) => {
//     const inputProduct = e.target.value.toUpperCase();

//     let defaultPrice = 0;
//     let defaultWeight = 0;
//     if(!inputProduct)return
//     if (inputProduct === "SS" || inputProduct === "SG") {
//       defaultPrice = 3182;
//       defaultWeight = 50;
//     }
//     setPrice(defaultPrice);
//     setWeight(defaultWeight*quantity);
//     setProductName(inputProduct);
//   };

//   const addProduct = () => {
//     if (!productName ||  !quantity) {
//       return; // If any input field is empty, do nothing
//     }

//     const product = {
//       name: productName,
//       price: price,
//       weight: weight,
//       quantity: quantity,
//       totalPrice: totalPrice,
//     };
//     setProducts([...products, product]);
//     // Resetting the form after adding the product
//     setProductName("");
//     setPrice("");
//     setWeight("");
//     setQuantity("");
//     setTotalPrice("");
//   };

//   return (
//     <div className="mt-9 border-red-400">
//       <input
//         type="text"
//         className="rounded shadow p-1 inputText"
//         value={productName}
//         onChange={disPlayProductDetails}
//       />
//       <input
//         type="number"
//         className="rounded shadow p-1 inputText"
//         value={quantity}
//         onChange={calculateTotal}
//       />
//       <button onClick={addProduct}>Add Product</button>

//         <div className="border-red-500">
//           <table className="border-collapse border border-slate-500 ...">
//             <thead>
//               <tr>
//                 <th className="border border-slate-600 ...">Name</th>
//                 <th className="border border-slate-600 ...">Price</th>
//                 <th className="border border-slate-600 ...">Weight</th>
//                 <th className="border border-slate-600 ...">Total Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product, index) => (
//                 <tr key={index}>
//                   <td className="border border-slate-700 ...">{product.name}</td>
//                   <td className="border border-slate-700 ...">{product.price}</td>
//                   <td className="border border-slate-700 ...">{product.weight}</td>
//                   <td className="border border-slate-700 ...">{product.totalPrice}</td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot>
//       <tr>
//         <td className="border border-slate-600 ..."></td>
//         <td className="border border-slate-600 ..."></td>
//         <td className="border border-slate-600 ..."> {products.reduce((acc, curr) => acc + curr.weight, 0) / 1000}</td>
//         <td className="border border-slate-600 ...">{products.reduce((acc, curr) => acc + curr.totalPrice, 0)}</td>
//       </tr>
//     </tfoot>
//           </table>
//         </div>

//     </div>
//   );
// };

// export default ProductDetails;

import React, { useState, useEffect } from "react";
import "./ProductDetails.css";
const ProductDetails = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [bankName, setBankName] = useState("");
  const [depositedAmount, setDepositedAmount] = useState(0);
  // Update weight when quantity changes

  useEffect(() => {
    if (quantity) {
      // Calculate weight based on quantity
      const defaultWeight = 50; // Example default weight
      setWeight(defaultWeight * quantity);
    }
  }, [quantity]);

  const calculateTotal = (e) => {
    const inputQuantity = e.target.value;

    setQuantity(inputQuantity);
    setTotalPrice(parseFloat(price) * inputQuantity);
  };

  const disPlayProductDetails = (e) => {
    const inputProduct = e.target.value.toUpperCase();

    let defaultPrice = 0;
    let defaultWeight = 0;
    if (!inputProduct) return;
    if (inputProduct === "SS" || inputProduct === "SG") {
      defaultPrice = 3182;
      //   defaultWeight = 50;
    }
    setPrice(defaultPrice);
    // Weight will be updated through useEffect based on quantity
    setProductName(inputProduct);
  };

  const addProduct = () => {
    if (!productName || !quantity) {
      return; // If any input field is empty, do nothing
    }

    const product = {
      name: productName,
      price: price,
      weight: weight,
      quantity: quantity,
      totalPrice: totalPrice,
     
    };
    setProducts([...products, product]);
    // Resetting the form after adding the product
    setProductName("");
    setPrice(0);
    setQuantity(0);
    setTotalPrice(0);
  };
 
  const depositAmount = () => {
    if (!bankName || !depositedAmount) {
      return; // If any input field is empty, do nothing
    }
    setDepositedAmount(parseInt(depositAmount));
    setBankName(bankName);


    const deposit = {
      name: '',
      price: 0,
      weight: 0,
      quantity: 0,
      totalPrice: 0,
      bank:bankName,
      deposit: parseFloat(depositedAmount),
    };
    setProducts([...products, deposit]);
    // Resetting the form after adding the product
  
    setBankName('')
    setDepositedAmount(0)
    
  };


  



  return (
    <div className="mt-9 border-red-400">
      <div>
        {" "}
        <input
          type="text"
          className=" rounded shadow p-1  inputText"
          value={productName}
          onChange={disPlayProductDetails}
          placeholder=" prouduct name"

        />
        <input
          type="number"
          className=" rounded shadow p-1 inputText"
          value={quantity}
          onChange={calculateTotal}
          placeholder="Quantity"
        />
        <button onClick={addProduct} className="add-btn">
          Add Product
        </button>
      </div>

      {/* Deposit part */}

      <div className="mt-5">
       
        <input
          type="text"
          className=" rounded shadow p-1 inputText"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder="Bank name"
        />
        <input
          type="number"
          className=" rounded shadow p-1 inputText"
          value={depositedAmount}
          onChange={(e) => setDepositedAmount(e.target.value)}
          placeholder="money"
        />
        <button onClick={depositAmount} className="deposit-btn">
          Deposit
        </button>
      </div>

      <div className="border-red-500 flex justify-center items-center mt-20">
      <h1>Deposited Money:{}</h1>
        <table className="border-collapse border border-slate-500 ...">
          <thead className="bg-amber-300">
            <tr className="">
              <th className=" p-2 border border-slate-600 ...">Name</th>
              <th className=" p-2 border border-slate-600 ...">Price</th>
              <th className="p-2 border border-slate-600 ...">Weight</th>
              <th className="p-2 border border-slate-600 ...">Bank Name</th>
              <th className="p-2 border border-slate-600 ...">Deposited Amount</th>
              <th className="p-2 border border-slate-600 ...">Total Price</th>
              <th className="p-2 border border-slate-600 ...">Action</th>
            </tr>
          </thead>
          <tbody className="bg-amber-100">
            {products.map((product, index) => (
              <tr key={index}>
                <td className="border border-slate-700 ...">{product.name}</td>
                <td className="border border-slate-700 ...">{product.price}</td>
                <td className="border border-slate-700 ...">
                  {product.weight}
                </td>
                <td className="border border-slate-700 ...">
                  {product.bank}
                </td>
                <td className="border border-slate-700 ...">
                  {product.deposit}
                </td>
                <td className="border border-slate-700 ...">
                  {product.totalPrice}
                </td>
                <td className="border border-slate-700 p-3">
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="update-btn mx-2"
                    onClick={() => updateProduct(index)}
                  >
                    Update
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => editProduct(index)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td className="border border-slate-600 font-bold">TON</td>
              <td className="border border-slate-600 font-light text-sm">
                TOTAL AMOUNT
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              
              <td className="border border-slate-600 bg-yellow-400 ">
                {products.reduce((acc, curr) => acc + curr.weight, 0) / 1000}
              </td>
              <td className="border border-slate-600 ...">
                {products.reduce((acc, curr) => acc + curr.totalPrice, 0)}
               
              </td>
              <td className="border border-slate-600 ...">
                {/* {products.reduce((acc, curr) => acc + curr.totalPrice, 0)} */}
               
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ProductDetails;
