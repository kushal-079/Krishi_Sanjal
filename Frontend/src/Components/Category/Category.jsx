// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Category.css';
// import fruitImage from '../../assets/fruit1.jpg';
// import vegetableImage from '../../assets/vegetable.jpg';
// import grainImage from '../../assets/grains.jpg';
// import dairyImage from '../../assets/dairy.jpg';
// import meatImage from '../../assets/Meat.jpg';
// import otherImage from '../../assets/other.jpg';

// const categories = {
//   "Fruits": {
//     image: fruitImage,
//     subcategories: ["Apple", "Banana"],
//   },
//   "Vegetables": {
//     image: vegetableImage,
//     subcategories: ["Carrot", "Tomato"],
//   },
//   "Grains": {
//     image: grainImage,
//     subcategories: ["Rice", "Wheat"],
//   },
//   "Dairy": {
//     image: dairyImage,
//     subcategories: ["Milk", "Cheese"],
//   },
//   "Meat & Poultry": {
//     image: meatImage,
//     subcategories: ["Chicken", "Beef"],
//   },
//   "Other Products": {
//     image: otherImage,
//     subcategories: ["Honey", "Tea"],
//   }
// };

// export default function Category() {
//   const navigate = useNavigate();

//   const handleCategoryClick = (category) => {
//     navigate('/shop', { state: { category } });
//   };

//   return (
//     <div className="container">
//       <h1 className="header">Welcome to Our Categories!</h1>
//       <div className="categories">
//         {Object.keys(categories).map((category, index) => (
//           <div
//             key={index}
//             className="category-card"
//             onClick={() => handleCategoryClick(category)}
//           >
//             <img
//               src={categories[category].image}
//               alt={`Image of ${category}`}
//               className="category-image"
//             />
//             <h2 className="category-name">{category}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css';
import fruitImage from '../../assets/fruit1.jpg';
import vegetableImage from '../../assets/vegetable.jpg';
import grainImage from '../../assets/grain.jpg';
import dairyImage from '../../assets/dairy-products.jpg';
import meatImage from '../../assets/Meat.jpg';
import otherImage from '../../assets/other.jpg';

const categories = [
  {
    name: "Fruits",
    image: fruitImage,
    subcategories: ["Apple", "Banana"],
  },
  {
    name: "Vegetables",
    image: vegetableImage,
    subcategories: ["Carrot", "Tomato"],
  },
  {
    name: "Grains",
    image: grainImage,
    subcategories: ["Rice", "Wheat"],
  },
  {
    name: "Dairy",
    image: dairyImage,
    subcategories: ["Milk", "Cheese"],
  },
  {
    name: "Meat & Poultry",
    image: meatImage,
    subcategories: ["Chicken", "Beef"],
  },
  {
    name: "Other Products",
    image: otherImage,
    subcategories: ["Honey", "Tea"],
  }
];

export default function Category() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('Shop', { state: { category: category.name } });
  };

  return (
    <div className="container">
      <h1 className="header">Welcome to Our Categories!</h1>
      <div className="categories">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => handleCategoryClick(category)}
          >
            <img
              src={category.image}
              alt={`Image of ${category.name}`}
              className="category-image"
            />
            <h2 className="category-name">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}