import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyProducts.css';
import { assets } from '../../assets/assets';
import VegetableImage from '../../assets/vegetable.png';
import FruitImage from '../../assets/Fruits.png';
import DairyImage from '../../assets/dairy.jpg';
import MeatImage from '../../assets/Meat.png';
import GrainsImage from '../../assets/grains.jpg';
import PickleImage from '../../assets/Pickle.png';
import AddPopUp from '../../Components/AddPopUp/AddPopUp';
import List from '../../Components/List/List';

const MyProducts = () => {


        const category = [
        {
            id: 1,
            imgSrc: FruitImage,
            title: "Fruits",
            description: "Add Your Organic fruits picked with care and love",
            btn: "Add Product",
        },
        {
            id: 2,
            imgSrc: VegetableImage,
            title: "Vegetables",
            description: "Add your Fresh veggies directly from the your Farm",
            btn: "Add Product",
        },
        {
            id: 3,
            imgSrc: MeatImage,
            title: "Meat and Poultry",
            description: "Add your fresh and ethically sourced meat and eggs",
            btn: "Add Product",
        },
        {
            id: 4,
            imgSrc: GrainsImage,
            title: "Grains and Cereals",
            description: "Add your wholesome grains and cereals for a healthy diet",
            btn: "Add Product",
        },
        {
            id: 5,
            imgSrc: DairyImage,
            title: "Dairy Products",
            description: "Add your High-quality milk, cheese, butter and other dairy products",
            btn: "Add Product",
        },
        {
            id: 6,
            imgSrc: PickleImage,
            title: "Pickles and other Products",
            description: "Add your homemade pickles, natural honey and other unique products, offering authentic taste ",
            btn: "Add Product",
        },
    ];






  const [addpop, setAddPop] = useState(false);
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/farmer/my-products/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };


    const handlePopupOpen = () => {
        setAddPop(true);
    };

    const handlePopupClose = () => {
        setAddPop(false);
    };




  const handleAddProduct = async (productData) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      for (const key in productData) {
        formData.append(key, productData[key]);
      }


      if (editIndex !== null) {
        const response = await axios.put(
          `http://localhost:5000/farmer/my-products/edit/${products[editIndex]._id}`,
          productData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const updatedProducts = [...products];
        updatedProducts[editIndex] = response.data.product;
        setProducts(updatedProducts);
        setEditIndex(null);
      } else {
        const response = await axios.post('http://localhost:5000/farmer/my-products/add', 
          formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      }
        //   productData, {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
        );
        setProducts((prevProducts) => [...prevProducts, response.data.product]);
      }
      setAddPop(false);
    } catch (err) {
      console.error('Failed to save product:', err);
    }
  };

  const handleDelete = async (index) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/farmer/my-products/delete/${products[index]._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  return (
    <div className="My-Products">
      <div className='Products'>
               <div className='bg'>
                     <div className='txt2'>
                         <p>Your Produce
                             <br />Your Price
                             <br />Your Marketplace</p>
                     </div>
                     <div className='img1'>
                         <img src={assets.backimg} alt="background" />
                     </div>
                 </div>
             </div>
             <div className='plist' id='product-list'>
                 <section className="box">
                     {category.map((article) => (
                         <article key={article.id}>
                             <div className="article-wrapper">
                                 <figure>
                                     <img src={article.imgSrc} alt={article.title} />
                                 </figure>
                                 <div className="article-body">
                                     <h2>{article.title}</h2>
                                     <p>{article.description}</p>
                                     <br />
                                     <br />
                                     <button onClick={handlePopupOpen}>{article.btn}</button>
                                 </div>
                             </div>
                         </article>
                     ))}
                 </section>
             </div>
      {addpop && (
        <AddPopUp
          onClose={() => setAddPop(false)}
          onAddProduct={handleAddProduct}
          product={editProduct}
        />
      )}
      <List
        products={products}
        onEdit={(index) => {
          setEditIndex(index);
          setEditProduct(products[index]);
          setAddPop(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MyProducts;







// import React, { useState } from 'react';
// import './MyProducts.css';
// import { assets } from '../../assets/assets';
// import VegetableImage from '../../assets/vegetable.png';
// import FruitImage from '../../assets/Fruits.png';
// import DairyImage from '../../assets/dairy.jpg';
// import MeatImage from '../../assets/Meat.png';
// import GrainsImage from '../../assets/grains.jpg';
// import PickleImage from '../../assets/Pickle.png';
// import AddPopUp from '../../Components/AddPopUp/AddPopUp';
// import List from '../../Components/List/List';

// const MyProducts = () => {
//     const category = [
//         {
//             id: 1,
//             imgSrc: FruitImage,
//             title: "Fruits",
//             description: "Add Your Organic fruits picked with care and love",
//             btn: "Add Product",
//         },
//         {
//             id: 2,
//             imgSrc: VegetableImage,
//             title: "Vegetables",
//             description: "Add your Fresh veggies directly from the your Farm",
//             btn: "Add Product",
//         },
//         {
//             id: 3,
//             imgSrc: MeatImage,
//             title: "Meat and Poultry",
//             description: "Add your fresh and ethically sourced meat and eggs",
//             btn: "Add Product",
//         },
//         {
//             id: 4,
//             imgSrc: GrainsImage,
//             title: "Grains and Cereals",
//             description: "Add your wholesome grains and cereals for a healthy diet",
//             btn: "Add Product",
//         },
//         {
//             id: 5,
//             imgSrc: DairyImage,
//             title: "Dairy Products",
//             description: "Add your High-quality milk, cheese, butter and other dairy products",
//             btn: "Add Product",
//         },
//         {
//             id: 6,
//             imgSrc: PickleImage,
//             title: "Pickles and other Products",
//             description: "Add your homemade pickles, natural honey and other unique products, offering authentic taste ",
//             btn: "Add Product",
//         },
//     ];

//     const [addpop, setAddPop] = useState(false);
//     const [products, setProducts] = useState([]);
//     const [editIndex, setEditIndex] = useState(null);
//     const [editProduct, setEditProduct] = useState(null);

    
    
    
//     const handlePopupOpen = () => {
//         setAddPop(true);
//     };

//     const handlePopupClose = () => {
//         setAddPop(false);
//     };

//     const handleAddProduct = (productData) => {
//         if (editIndex !== null) {
//             const updatedProducts = [...products];
//             updatedProducts[editIndex] = productData;
//             setProducts(updatedProducts);
//             setEditIndex(null);
//             setEditProduct(null);
//         } else {
//             setProducts((prevProducts) => [...prevProducts, productData]);
//         }
//         setAddPop(false);
//     };

//     const handleEdit = (index) => {
//         setEditIndex(index);
//         setEditProduct(products[index]);
//         setAddPop(true);
//     };

//     const handleDelete = (index) => {
//         const updatedProducts = products.filter((_, i) => i !== index);
//         setProducts(updatedProducts);
//     };

//     return (
//         <div className='My-Products'>
//             <div className='Products'>
//                 <div className='bg'>
//                     <div className='txt2'>
//                         <p>Your Produce
//                             <br />Your Price
//                             <br />Your Marketplace</p>
//                     </div>
//                     <div className='img1'>
//                         <img src={assets.backimg} alt="background" />
//                     </div>
//                 </div>
//             </div>
//             <div className='plist' id='product-list'>
//                 <section className="box">
//                     {category.map((article) => (
//                         <article key={article.id}>
//                             <div className="article-wrapper">
//                                 <figure>
//                                     <img src={article.imgSrc} alt={article.title} />
//                                 </figure>
//                                 <div className="article-body">
//                                     <h2>{article.title}</h2>
//                                     <p>{article.description}</p>
//                                     <br />
//                                     <br />
//                                     <button onClick={handlePopupOpen}>{article.btn}</button>
//                                 </div>
//                             </div>
//                         </article>
//                     ))}
//                 </section>
//             </div>
//             {addpop && <AddPopUp onClose={handlePopupClose} onAddProduct={handleAddProduct} product={editProduct} />}
//             <List products={products} onEdit={handleEdit} onDelete={handleDelete} />
//         </div>
//     );
// };

// export default MyProducts;
