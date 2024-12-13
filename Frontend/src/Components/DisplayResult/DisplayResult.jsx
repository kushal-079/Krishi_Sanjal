import React from 'react';
// import './DisplayResults.css';

const DisplayResults = ({ result }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="rating">⭐ {result.rating}</span>
        <span className="reviews">{result.reviews} reviews</span>
      </div>
      <img src={result.image} alt={result.name} className="result-image" />
      <h3 className="result-title">{result.name}</h3>
      <div className="result-price">
        Rs. {result.price}
      </div>
      <p className="description">{result.description}</p>
      <button className="button2">Add To Cart</button>
    </div>
  );
};

export default DisplayResults;