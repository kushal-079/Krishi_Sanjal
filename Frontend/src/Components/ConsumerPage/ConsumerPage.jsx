// import React from 'react';
// import Navbar2 from '../Navbar2/Navbar2';
// import { Routes, Route } from 'react-router-dom';
// import Homepage2 from '../../pages/Homepage2/Homepage2';
// import Footer2 from '../Footer2/Footer2';
// import Shop from '../../pages/Shop/Shop';
// import Cart2 from '../../pages/Cart2/Cart2';
// import Profile from '../../pages/Profile/Profile';

// const ConsumerPage = () => {
//   return (
//     <div className="App">
//       <Navbar2 />
//       <Routes>
//         <Route path="/" element={<Homepage2 />} />
//         <Route path="Shop" element={<Shop />} />
//         <Route path="Cart" element={<Cart2/>}/>
//         <Route path="Profile" element={<Profile/>}/>
//       </Routes>
//       <Footer2 />
//     </div>
//   );
// };

// export default ConsumerPage;


import React from 'react';
import Navbar2 from '../Navbar2/Navbar2';
import { Routes, Route } from 'react-router-dom';
import Homepage2 from '../../pages/Homepage2/Homepage2';
import Footer2 from '../Footer2/Footer2';
import Shop from '../../pages/Shop/Shop';
import Cart2 from '../../pages/Cart2/Cart2';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import Profile2 from '../../pages/Profile2/Profile2';
import ProductDetails from '../ProductDetails/ProductDetails'; // Import ProductDetails

const ConsumerPage = () => {
  return (
    <div className="App">
      <Navbar2 />
      <Routes>
        <Route path="/" element={<Homepage2 />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/consumer/product/:name" element={<ProductDetails />} />  {/* Correct route path */}
        <Route path="/cart" element={<Cart2 />} />
        <Route path="/profile" element={<Profile2 />} />
      </Routes>
      <Footer2 />
      <ScrollToTopButton />
    </div>
  );
};

export default ConsumerPage;