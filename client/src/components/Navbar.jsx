import React from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  return (
    <>
      <nav>
        <div>
          <Link to="/" className="">EcomShop</Link>

          <div className="hidden md:flex space-x-6 "> 
            <Link to="/" className="hover:text-gray-200">Home</Link>
            <Link to="/products" className="hover:text-gray-200">Products</Link>
            <Link to="/about" className="hover:text-gray-200">About</Link>
            <Link to="/contact" className="hover:text-gray-200">Contact</Link>
            <Link to="/cart" className="hover:text-gray-200">Cart</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
