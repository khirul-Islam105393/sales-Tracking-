import React, { useState, useEffect } from "react";
import {getCurrentDate} from "../utility/getCurrentDate"
import "./ProductDetails.css";
import { postData,deleteProduct } from "../utility/api";
import Update from "../Update/Update";
// import { postData } from "../utility/api";

const ProductDetails = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [bankName, setBankName] = useState("");
  const [depositedAmount, setDepositedAmount] = useState(0);
  const [totalDepositedAmount, setTotalDepositedAmount] = useState(0);
  const [reload, setReload] = useState(false);

  // Update weight when quantity changes

  console.log(reload);




  useEffect(() => {
    if (quantity) {
      // Calculate weight based on quantity
      const defaultWeight = 50; // Example default weight
      setWeight(defaultWeight * quantity);
    }
  }, [quantity]);



  useEffect(() => {
    // Calculate the updated total deposited amount
    const updatedTotalDepositedAmount = products.reduce((total, item) => {
      if (typeof item.deposit === "number") {
        return total + item.deposit;
      }
      return total;
    }, 0);
  
    // Update the state with the new total deposited amount
    setTotalDepositedAmount(updatedTotalDepositedAmount);
  }, [products, reload]);






  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/sale');
        if (response.ok) {
          const fetchedData = await response.json();
          
           
          setProducts(fetchedData);
        
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        // Handle error (e.g., display error message to user)
      }
    };

    fetchData ()
  }, [reload]);

 
  const handleDeleteProduct = async (productId) => {
    
    const success = await deleteProduct(productId);
   

    if (success) {
      setReload(!reload);
    }
 
    
};

  // Other code...

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
  

  const addProduct = async() => {
    const upperCaseProductName = productName.toUpperCase();
    if (!upperCaseProductName || !quantity) return;
    if (upperCaseProductName !== "SS" && upperCaseProductName !== "SG") return;

    const product = {
      date: getCurrentDate(),
      name: productName,
      price: price,
      weight: weight,
      quantity: quantity,
      totalPrice: totalPrice,
    };
 
    
    
   const res = await postData(product)
   if (res) {
    setReload(!reload);
  }
   
    // Resetting the form after adding the product
    setProductName("");
    setPrice(0);
    setQuantity(0);
    setTotalPrice(0);
  };

  const depositAmount = async() => {
    if (!bankName || !depositedAmount) {
      return; // If any input field is empty, do nothing
    }

    const deposit = {
      date: getCurrentDate(),
      name: "",
      price: 0,
      weight: 0,
      quantity: 0,
      totalPrice: 0,
      bank: bankName,
      deposit: parseInt(depositedAmount),
    };

    //fetch api is used to call data 
    
    const res = await postData(deposit)

    if (res) {
      setReload(!reload);
    }
    setDepositedAmount(parseInt(depositAmount));
    setBankName(bankName);
    setProducts([...products, deposit]);
    // Resetting the form after adding the product
    setTotalDepositedAmount(totalDepositedAmount + parseInt(depositedAmount));
    setBankName("");
    setDepositedAmount(0);
  };



  const totalDepositAmount = products.reduce((total, item) => {
    if (typeof item.deposit == "number") {
      return total + item.deposit;
    }
    return total;
  }, 0);
 // Calculate total price
const totalPriceSum = products.reduce((acc, curr) => {
  if (!isNaN(curr.totalPrice)) {
    return acc + curr.totalPrice;
  } else {
    return acc; // Skip invalid values
  }
}, 0);

// Guard against division by zero
const totalAfterDeposit = totalPriceSum !== 0 ? totalPriceSum - totalDepositedAmount : 0;

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
        
        />
        <button onClick={depositAmount} className="deposit-btn">
          Deposit
        </button>
      </div>

      <div className="border-red-500 flex justify-center items-center mt-20">
        <table className="border-collapse border border-slate-500 ...">
          <thead className="bg-amber-300">
            <tr className="">
              <th className=" p-2 border border-slate-600 ...">Date</th>
              <th className=" p-2 border border-slate-600 ...">Name</th>
              <th className=" p-2 border border-slate-600 ...">Price</th>
              <th className="p-2 border border-slate-600 ...">Quantity</th>
              <th className="p-2 border border-slate-600 ...">Weight</th>
              <th className="p-2 border border-slate-600 ...">Bank Name</th>
              <th className="p-2 border border-slate-600 ...">
                Deposited Amount
              </th>
              <th className="p-2 border border-slate-600 ...">Total Price</th>
              <th className="p-2 border border-slate-600 ...">Action</th>
            </tr>
          </thead>
          <tbody className="bg-amber-100">
            {products.map((product, index) => (
              <tr key={product._id}>
                <td className="border border-slate-700 font-sans px-3 ...">{product.date}</td>
                <td className="border border-slate-700 ...">{product.name}</td>
                <td className="border border-slate-700 ...">{product.price}</td>
                <td className="border border-slate-700 ...">
                  {product.quantity}
                </td>
                <td className="border border-slate-700 ...">
                  {product.weight}
                </td>
                <td className="border border-slate-700 ...">{product.bank}</td>
                <td className="border border-slate-700 ...">
                  {product.deposit}
                </td>
                <td className="border border-slate-700 ...">
                  {product.totalPrice ? product.totalPrice : ""}
                </td>
                <td className="border border-slate-700 p-3">
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                  {/* <button
                    className="update-btn mx-2"
                    onClick={() => updateProduct(index)}
                  >
                    Update
                  </button> */}


                  <button>
                   <Update setReload={setReload} productId={product._id} />
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
                {(products.reduce((acc, curr) => acc + curr.weight, 0) / 1000).toString()}

              </td>
              {/* <td className="border border-slate-600 ...">
                {totalAfterdeposit}
              </td> */}
              <td
                className={`border border-slate-600 ${
                  totalAfterDeposit < 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                } ...`}
              >
                {totalAfterDeposit}
              </td>

              <td className="border border-slate-600 ...">
                {/* {products.reduce((acc, curr) => acc + curr.deposit, 0)} */}
                {totalDepositAmount}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ProductDetails;

