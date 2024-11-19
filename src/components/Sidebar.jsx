import React, { useState } from 'react';
import { Users, Home, ShoppingBag, ClubIcon as Clubs, User, FileText, Star, LogOut } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop", icon: ShoppingBag },
    { name: "Clubs", href: "/clubs", icon: Clubs },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Posts", href: "/posts", icon: FileText },
    { name: "Rating", href: "/rating", icon: Star },
  ];

  return (
    <div className={`flex flex-col h-screen ${isOpen ? 'w-[250px]' : 'w-[80px]'} bg-gradient-to-b from-indigo-500 to-indigo-700 shadow-lg text-white transition-all duration-300`}>
      {/* User Info Section */}
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

      {/* Navigation */}
      <div className="flex-1 overflow-auto p-4">
        {isOpen && (
          <div className="mb-4">
            <h3 className="px-2 text-lg font-semibold">Menyular:</h3>
          </div>
        )}
        <nav>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} w-full px-3 py-3 mb-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md`}
            >
              <item.icon className="h-5 w-5 text-white" />
              {isOpen && <span className="ml-4 font-medium">{item.name}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center justify-center transition-all"
          onClick={() => {
            console.log("Logging out...");
          }}
        >
          <LogOut className="h-5 w-5" />
          {isOpen && <span className="ml-2">Log out</span>}
        </button>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        className="absolute top-4 right-4 bg-indigo-500 text-white p-2 rounded-full shadow-lg hover:bg-indigo-600 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '←' : '→'}
      </button>
    </div>
  );
};

export default Sidebar;
