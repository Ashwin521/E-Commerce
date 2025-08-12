import React from "react";

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="mb-4 ">
          &copy; {new Date().getFullYear()} EcomShop. All rights reserved.
        </p>
        <div className="space-x-4 flex items-center justify-center">
          <p className="hover:underline hover:cursor-pointer">Privacy Policy</p>
          <p className="hover:underline hover:cursor-pointer">
            Terms of Service
          </p>
          <a href="/contact" className="hover:underline hover:cursor-pointer">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
