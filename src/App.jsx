import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Clubs from './pages/Clubs';
import Profile from './pages/Profil';
import Posts from './pages/Posts';
import Reyting from './pages/Reyting';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Router>
      {/* Navbar and Sidebar */}

      <div className='flex'>
        <div>
          <Sidebar />
        </div>

        {/* Main content */}
        <div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/reyting" element={<Reyting />} />
          </Routes>
        </div>
      </div>

    </Router>
  );
};

export default App;
