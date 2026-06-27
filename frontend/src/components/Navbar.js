import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">Drone Delivery</Link>
        {user && (
          <div className="space-x-4">
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/create-delivery" className="hover:text-gray-300">New Delivery</Link>
            <Link to="/deliveries" className="hover:text-gray-300">My Deliveries</Link>
            <Link to="/drones" className="hover:text-gray-300">Drones</Link>
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};


export default Navbar;