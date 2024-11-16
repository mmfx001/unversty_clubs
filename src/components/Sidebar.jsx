import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [userData, setUserData] = useState(null);

  // Fetch user data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://unversty-2.onrender.com/users');
        // Assume the first user for simplicity, change as needed
        setUserData(response.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-64 h-screen bg-purple-100 p-6 flex flex-col items-center justify-between">
      {/* User Profile Picture */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
          <img
            src={userData?.img || 'https://joybox.uz/wp-content/uploads/default-user.png'}
            alt="User Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <button className="bg-orange-200 px-4 py-2 rounded mb-4">
          o'quvchi haqida malumotlar
        </button>
      </div>

      {/* Menu Links */}
      <div className="bg-orange-200 p-4 rounded mb-4 w-full text-center">
        <p className="font-semibold mb-2">Menyular:</p>
        <p className="mb-1">
          <Link to="/" className="hover:text-blue-500">Home</Link>
        </p>
        <p className="mb-1">
          <Link to="/shop" className="hover:text-blue-500">Shop</Link>
        </p>
        <p className="mb-1">
          <Link to="/clubs" className="hover:text-blue-500">Clubs</Link>
        </p>
        <p className="mb-1">
          <Link to="/profil" className="hover:text-blue-500">Profil</Link>
        </p>
        <p className="mb-1">
          <Link to="/posts" className="hover:text-blue-500">Posts</Link>
        </p>
        <p className="mb-1">
          <Link to="/reyting" className="hover:text-blue-500">Posts</Link>
        </p>
      </div>

      {/* Log Out Button */}
      <div>
        <button className="bg-yellow-400 text-black px-6 py-2 rounded">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
