// import React from 'react';
// import './Productcard.css';

// const ProductCard = ({ product }) => {
//   return (
//     <div className="card">
//       <img src={product.image} alt={product.name} className="product-image" />
//       <h3 className="product-title">{product.name}</h3>
//     </div>
//   );
// };

// export default ProductCard;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Productcard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigating to the product details page with product info
    navigate(`/consumer/product/${product.name}, { state: { product } }`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-title">{product.name}</h3>
    </div>
  );
};

export default ProductCard;
