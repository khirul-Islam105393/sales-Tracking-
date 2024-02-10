
import { useState } from "react";
import "./Form.css"
const Form = () => {

    const [text,setText]=useState('')
     console.log(Text);
    return (
        <form className="form">
            <input 
            type="text" 
            className="textField"
            value={text}
            onChange={(e)=>setText(e.target.v)}
            />
            <button className="submit-btn">Submit</button>
        </form>
    );
};

export default Form;