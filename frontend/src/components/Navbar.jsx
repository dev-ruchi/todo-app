import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <span className="ml-2 text-xl font-semibold text-gray-900">
            TodoApp
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
