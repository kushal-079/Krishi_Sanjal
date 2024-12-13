import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DisplayResults from '../../Components/DisplayResult/DisplayResult';
import './ProductDetails.css';

const ProductDetails = () => {
  const { name } = useParams(); // Get the product name from the URL
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch the product details by name
        const productResponse = await fetch(`http://localhost:5000/api/products/${name}`);
        if (!productResponse.ok) {
          throw new Error('Failed to fetch product details');
        }
        const productData = await productResponse.json();
        console.log('Product Data:', productData);
        
        // Ensure the product data is valid
        if (!productData) {
          throw new Error('Product data is missing');
        }
        setProduct(productData);

        // Fetch related products by category if product exists
        const relatedResponse = await fetch(`http://localhost:5000/api/products?category=${productData.category}`);
        if (!relatedResponse.ok) {
          throw new Error('Failed to fetch related products');
        }
        const relatedData = await relatedResponse.json();
        setRelatedProducts(relatedData);

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [name]); // Re-run effect when name changes

  if (isLoading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-details">
      <div className="product-info">
        <h2>{product?.name || 'Product Name'}</h2>
        <img src={product?.image || 'default_image.jpg'} alt={product?.name || 'Product'} className="product-image" />
        <p>{product?.description || 'No description available.'}</p>
        <p>Price: Rs. {product?.price || 'N/A'}</p>
        <button>Add to Cart</button>
      </div>
      <h3>Related Products</h3>
      <div className="related-products">
        {relatedProducts?.length > 0 ? (
          relatedProducts.map((prod) => (
            <DisplayResults key={prod._id} result={prod} />
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;