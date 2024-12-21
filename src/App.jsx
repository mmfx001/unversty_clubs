import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Shop from './pages/Shop';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './Login';
import Purchase_history from './components/Purchase_history';
import Clubs from './pages/Clubs';
import Rating from './pages/Rating';
import Reyting from './pages/Reyting';
import Posts from './pages/Posts';
import PrivateRoute from './PrivateRoute';
import Profil from './pages/Profil';
import Create from './pages/CreatePost';
import ClubProfile from './pages/ClubProfile';

const App = () => {
  const location = useLocation();
  const hideSidebarRoutes = ['/'];
  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(() => {
    const savedState = localStorage.getItem("sidebarState");
    return savedState !== "hide";
  });

  useEffect(() => {
    const checkMobile = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      if (isNowMobile) {
        setIsOpen(false); // Close sidebar when on mobile
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false); // Close the sidebar on route change for mobile devices
    }
  }, [location, isMobile]);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("sidebarState", newState ? "open" : "hide");
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {shouldShowSidebar && (
        <Sidebar
          isMobile={isMobile}
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
        />
      )}

      <div className={`flex-grow md:pb-0 ${shouldShowSidebar ? (isOpen ? 'md:ml-[250px]' : 'md:ml-[80px]') : ''} transition-all duration-300`}>
        {!isMobile && shouldShowSidebar && (
          <button
            className="fixed ml-1 mt-3 bg-indigo-500 z-50 text-white p-2 rounded-full shadow-lg hover:bg-indigo-600 transition-all"
            onClick={toggleSidebar}
          >
            {isOpen ? "←" : "→"}
          </button>
        )}

        <Routes>
          {/* Login Page */}
          <Route path="/" element={<Login />} />

          {/* Private Routes */}
          <Route
            path="/clubprofile"
            element={
              <PrivateRoute guestOnly={false}>
                <ClubProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute guestOnly={false}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute guestOnly={false}>
                <Profil />
              </PrivateRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <PrivateRoute guestOnly={false}>
                <Posts />
              </PrivateRoute>
            }
          />
        
          <Route
            path="/history"
            element={
              <PrivateRoute guestOnly={false}>
                <Purchase_history />
              </PrivateRoute>
            }
          />
          <Route
            path="/clubs"
            element={
              <PrivateRoute guestOnly={false}>
                <Clubs />
              </PrivateRoute>
            }
          />
          <Route
            path="/rating"
            element={
              <PrivateRoute guestOnly={false}>
                <Reyting />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute guestOnly={false}>
                <Create />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App