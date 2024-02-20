import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleClick = (index) => {
        setActiveIndex(index); // Set the clicked button index as active
      };
  const companies = ["Square", "Navana", "Century","Agrosol","Order-Page"];
  return (
    <div>
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
      
          <div className="flex items-center">
         
            <ul className="flex  space-x-4">
              
              {companies.map((company, index) => (
                <li key={index} className="relative">
                <Link to={`/${company}`}>
                      <button 
                        className={`text-white ${activeIndex === index ? 'bg-gray-600 px-2 rounded' : ''}`}
                        onClick={() => handleClick(index)}>
                        {company}
                      </button>
                    </Link>
                  
                </li>
              ))}
              <Link to={'/cart'}>
              <li className="text-white right-8 absolute">

                <div className="rounded-1 bg-green-500 text-yellow-50 font-normal"></div>
              </li>
              
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </nav>
   
  </div>
  
  );
};

export default Navbar;
