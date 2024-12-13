// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Cart2.css';
// import Widget from '../../Components/Widget/Widget';
// import { assets } from '../../assets/assets';

// function Cart2() {
//   const navigate = useNavigate();

//   const handleStartShopping = () => {
//     navigate('/consumer/Shop');
//   };

//   const [cart, setCart] = useState([]);

//   const addItemToCart = (item) => {
//     setCart([...cart, item]);
//   };

//   return (
//     <div className="cart2">
//       <h2 className="cart2-title">Your Cart</h2>
//       <div className="cart2-content">
//         <img
//           alt="empty-cart"
//           src= {assets.cart111}
//           className="cart2-image"
//         />
//         <p className="cart2-message">Your cart is feeling lonely</p>
//         <button className="cart2-button" onClick={handleStartShopping}>
//           Start Shopping
//         </button>
//       </div>
//       <div>

//         <Widget itemsInCart={cart} />
//       </div>
//     </div>
//   );
// }

// export default Cart2;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart2.css';
import { assets } from '../../assets/assets';
import Cartinitial from '../../Components/Cartinitial/Cartinitial';

function Cart2() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const handleStartShopping = () => {
    navigate('/consumer/Shop');
  };

  const addItemToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <div className="cart2">
      <h2 className="cart2-title">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="cart2-empty">
          <img alt="empty-cart" src={assets.cart111} className="cart2-image" />
          <p className="cart2-message">Your cart is feeling lonely</p>
          <button className="cart2-button" onClick={handleStartShopping}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="cart2-items">
          <Cartinitial itemsInCart={cart} />
        </div>
      )}
    </div>
  );
}

export default Cart2;