// import React, { useState } from 'react';
// import './Navbar2.css';
// import { assets } from '../../assets/assets';
// import { NavLink } from 'react-router-dom';

// const Navbar2 = () => {
//   const [opt, setopt] = useState("Home");

//   return (
//     <div className="nav">
//       <div className="navbar">
//         <div className="logo">
//           <img src={assets.logo} alt="Logo" />
//         </div>
//         <div className="list">
//           <ul>
//             <NavLink
//               to='/consumer'
//               className={({ isActive }) => (isActive ? "active" : "")}
//               onClick={() => setopt("Home")}
//             >
//               <span>Home</span>
//             </NavLink>
//             <NavLink
//               to='/consumer/Shop'
//               className={({ isActive }) => (isActive ? "active" : "")}
//               onClick={() => setopt("Shop")}
//             >
//               <span>Shop</span>
//             </NavLink>
//             <NavLink
//               to='/consumer/Cart'
//               className={({ isActive }) => (isActive ? "active" : "")}
//               onClick={() => setopt("Cart")}
//             >
//               <span>Cart</span>
//             </NavLink>
//             <NavLink
//               to='/consumer/Profile'
//               className={({ isActive }) => (isActive ? "active" : "")}
//               onClick={() => setopt("Profile")}
//             >
//               <span>Profile</span>
//             </NavLink>
//             <a
//               href="#ContactUs"
//               onClick={() => {
//                 setopt("Contact Us");
//               }}
//               className={opt === "Contact Us" ? "active contact-us" : ""}
//             >
//               <span>Contact Us</span>
//             </a>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar2;


import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import './Navbar2.css';
import { assets } from '../../assets/assets';

const Navbar2 = () => {
  const location = useLocation();

  return (
    <div className="nav">
      <div className="navbar">
        <div className="logo">
          <img src={assets.logo} alt="Logo" />
        </div>
        <div className="list">
          <ul>
            <NavLink
              to='/consumer'
              className={location.pathname === '/consumer' ? 'active' : ''}
              end
            >
              <span>Home</span>
            </NavLink>
            <NavLink
              to='/consumer/Shop'
              className={location.pathname === '/consumer/Shop' ? 'active' : ''}
            >
              <span>Shop</span>
            </NavLink>
            <NavLink
              to='/consumer/Cart'
              className={location.pathname === '/consumer/Cart' ? 'active' : ''}
            >
              <span>Cart</span>
            </NavLink>
            <NavLink
              to='/consumer/Profile'
              className={location.pathname === '/consumer/Profile' ? 'active' : ''}
            >
              <span>Profile</span>
            </NavLink>
            <a href="#ContactUs" className="contact-us">
              <span>Contact Us</span>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;