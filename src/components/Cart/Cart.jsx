import { useContext } from "react";
import { cartContext } from "../../App";


const Cart = () => {
    const {cart, setCart} = useContext(cartContext);
 
console.log(cart.length,'i am from cart component ');

 
    return (
        <div>
          <h1>
            {/* {cart.name} */}
          </h1>
        </div>
    );
};

export default Cart;