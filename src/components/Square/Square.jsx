import { useContext } from "react";
import { cartContext } from "../../App";



const Square = () => {
    
const {cart,setCart}=useContext(cartContext)

   
    const products = [
        { id: 1, name: "Nokia", price: 10, description: "This is about Nokia" },
        { id: 2, name: "Samsung", price: 20, description: "Samsung has the best display" },
        { id: 3, name: "Motorola", price: 30, description: "Motorolla has top notch technology" },
      
      ];

    return (
        <div>
        <h2>Products</h2>
        <div className="flex justify-center items-center bg-slate-400 p-10">
          {products.map(product => (
            <div key={product.id} className="bg-green-500 mx-2 p-8 w-72">
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>

              <div>
              {/* <button className="border-2" onClick={()=>setCart(product)}>Add to Cart</button> */}
              <button className="border-2" onClick={() => setCart(prevCart => [...prevCart, product])}>Add to Cart</button>

              </div>
            </div>
            
          ))}
        </div>
        
        
       
      </div>
    );
};

export default Square;