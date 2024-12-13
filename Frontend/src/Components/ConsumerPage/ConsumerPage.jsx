import React from 'react';
import Navbar2 from '../Navbar2/Navbar2';
import { Routes, Route } from 'react-router-dom';
import Homepage2 from '../../pages/Homepage2/Homepage2';
import Footer2 from '../Footer2/Footer2';
import Shop from '../../pages/Shop/Shop';
import Cart2 from '../../pages/Cart2/Cart2';
import Profile from '../../pages/Profile/Profile';

const ConsumerPage = () => {
  return (
    <div className="App">
      <Navbar2 />
      <Routes>
        <Route path="/" element={<Homepage2 />} />
        <Route path="Shop" element={<Shop />} />
        <Route path="Cart" element={<Cart2/>}/>
        <Route path="Profile" element={<Profile/>}/>
      </Routes>
      <Footer2 />
    </div>
  );
};

export default ConsumerPage;