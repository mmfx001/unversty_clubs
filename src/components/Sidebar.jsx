import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <p>O'quvchilar haqida ma'lumot</p>
      </div>
      <div>
        <p>Menyular:</p>
        <p><Link to="/">Home</Link></p>
        <p><Link to="/shop">Shop</Link></p>
        <p><Link to="/clubs">Clubs</Link></p>
        <p><Link to="/profil">Profil</Link></p>
        <p><Link to="/posts">Posts</Link></p>
      </div>
      <div>
        <button>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
