import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const Role = user?.role;
  const navigate = useNavigate();
 const isAdmin=Role==="admin"?true:false;
  const handleLogout = () => {
    dispatch(logout());
    navigate(`/${Role}/login`);
  };

  return (
    <nav className="bg-orange-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">Edu app</div>
        <ul className="flex space-x-4 text-white">
          <li><Link to={`/${Role}/courses`} className="hover:text-gray-300">Home</Link></li>
          <li><Link to={`/${Role}/courses`} className="hover:text-gray-300">Courses</Link></li>
          <li><Link to={`/${Role}/courses`} className="hover:text-gray-300">Tests</Link></li>
          <li><Link to={`/${Role}/profile`} className="hover:text-gray-300">Profile</Link></li>
          <li><Link to={`/${Role}/subscriptions`} className="hover:text-gray-300">Subscription</Link></li>

         { !isAdmin && <li><Link to={`/${Role}/my-courses`} className="hover:text-gray-300">My Courses</Link></li>}

          <li>
            <button onClick={handleLogout} className="hover:text-gray-300 focus:outline-none">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
