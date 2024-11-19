import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Shop from './pages/Shop';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './Login';
import GetPosts from './pages/Products';
import Purchase_history from './components/Purchase_history';
import Clubs from './pages/Clubs';
import Rating from './pages/Rating';
import Reyting from './pages/Reyting';
import Posts from './pages/Posts';

const App = () => {
  const location = useLocation(); // Hozirgi joylashuvni olish

  const hideSidebarRoutes = ['/login']; // Sidebar ko'rinmasligi kerak bo'lgan yo'nalishlar

  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname); // Sidebarni ko'rsatish yoki yashirish

  return (
    <div className='flex flex-col min-h-screen md:flex-row'>
      {shouldShowSidebar && <Sidebar />}
      <div className={`flex-grow pb-20 md:pb-0 ${shouldShowSidebar ? '' : ''}`}>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path='/history' element={<Purchase_history />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/rating" element={<Reyting />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
