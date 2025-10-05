import React from "react";
import { AcmLogo } from "./Icons/AcmLogo";

const Header = () => {
  const navLinks = ["Home", "Events", "People", "Gallery", "Blogs"];

  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <AcmLogo className="h-20 w-20" />
          <div className="text-sm font-medium text-gray-600 leading-tight">
            <div>Association for</div>
            <div>Computer Machinery</div>
            <div className="font-light text-xs mt-1">St. Joseph's student chapter</div>
            <div className="font-light text-xs">SJU | Chennai-28</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className={`text-base font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200 ${link === "Gallery" ? "text-gray-900" : ""}`}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
