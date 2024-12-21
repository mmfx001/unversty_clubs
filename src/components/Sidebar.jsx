import React from "react";
import {
  Home,
  ShoppingBag,
  ClubIcon as Clubs,
  User,
  FileText,
  Star,
  LogOut,
  Menu,
  Coins,
  CoinsIcon,
  FilePlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FiInfo } from "react-icons/fi";

const Sidebar = ({ isMobile, isOpen, toggleSidebar }) => {
  const navigation = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Clubs", href: "/clubs", icon: Clubs },
    { name: "Abaut", href: "/abaut", icon: FiInfo },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Posts", href: "/posts", icon: FileText },
    { name: "Create", href: "/create", icon: FilePlus },
    { name: "Rating", href: "/rating", icon: Star },
  ];

  // Get logged-in user details from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    console.log("Logged out!");
  };

  return (
    <div className="fixed z-20 top-0 left-0">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-500 text-white p-2 rounded-full shadow-lg hover:bg-indigo-600 transition-all"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out z-40 ${isMobile ? "fixed inset-y-0 left-0" : "relative"
          } ${isOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col h-screen ${isOpen ? "w-[250px]" : "w-[80px]"} bg-gradient-to-b from-indigo-500 to-indigo-700 shadow-lg text-white md:translate-x-0`}
      >
          
        {/* User Info */}
        <div className="p-4">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-400 shadow-lg">
              {/* Optionally, you can add an avatar image here */}
              {loggedInUser.logo ? (
                <img
                  src={loggedInUser.logo}
                  alt={loggedInUser.name || "User"}
                  className="w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-blue-500"
                />
              ) : (
                <User className="h-8 w-8 text-white" />
              )}
            </div>
            {isOpen && (
              <div className="space-y-1">
                <h2 className="text-lg font-medium">
                  {loggedInUser.name || "Guest"}
                </h2>
              
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-4">
          <nav>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center ${isOpen ? "justify-start" : "justify-center"
                  } w-full px-3 py-3 mb-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md`}
              >
                <item.icon className="h-5 w-5 text-white" />
                {isOpen && <span className="ml-4 font-medium">{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <Link to="/" className="block">
            <button
              className={`w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center justify-center transition-all ${!isOpen && "justify-center"
                }`}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              {isOpen && <span className="ml-2">Log out</span>}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
