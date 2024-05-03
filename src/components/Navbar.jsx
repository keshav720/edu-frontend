import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">Edu app</div>
        <ul className="flex space-x-4 text-white">
          <li><a href="/" className="hover:text-gray-300">Home</a></li>
          <li><a href="/courses" className="hover:text-gray-300">Courses</a></li>
          <li><a href="/tests" className="hover:text-gray-300">Tests</a></li>
          <li><a href="/profile" className="hover:text-gray-300">Profile</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
