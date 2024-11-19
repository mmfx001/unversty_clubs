import React from "react";
import { Users, Home, ShoppingBag, ClubIcon as Clubs, User, FileText, Star, LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Sidebar = ({ isMobile, isOpen, toggleSidebar }) => {
  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop", icon: ShoppingBag },
    { name: "Clubs", href: "/clubs", icon: Clubs },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Posts", href: "/posts", icon: FileText },
    { name: "Rating", href: "/rating", icon: Star },
  ];

  return (
    <div className="fixed z-20 top-0 left-0">
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-500 text-white p-2 rounded-full shadow-lg hover:bg-indigo-600 transition-all"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out z-40
          ${isMobile ? "fixed inset-y-0 left-0" : "relative"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col h-screen
          ${isOpen ? "w-[250px]" : "w-[80px]"}
          bg-gradient-to-b from-indigo-500 to-indigo-700 shadow-lg text-white
          md:translate-x-0 fixed top-0 left-0`}
      >
        {/* User Info */}
        <div className="p-4">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-400 shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            {isOpen && (
              <div className="space-y-1">
                <h2 className="text-lg font-medium">O'quvchi haqida</h2>
                <p className="text-sm text-indigo-200">Malumotlar</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-4">
          {isOpen && (
            <div className="mb-4">
              <h3 className="px-2 text-lg font-semibold">Menyular:</h3>
            </div>
          )}
          <nav>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}  // Use Link from react-router-dom
                className={`flex items-center ${isOpen && "justify-start"} w-full px-3 py-3 mb-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md`}
              >
                <item.icon className="h-5 w-5 text-white" />
                {isOpen && <span className="ml-4 font-medium">{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <button
            className={`w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center justify-center transition-all ${!isOpen && "justify-center"}`}
            onClick={() => {
              console.log("Logging out...");
            }}
          >
            <Link to="/login">
              {isOpen && <span className="ml-2">Log out</span>}
            </Link>
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
