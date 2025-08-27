// import React, { useState } from 'react';
// import CategorySidebar from './CategorySidebar';
// import ProductSlider from './ProductSlider';

// const productData = {
//   'Wooden Cot': [  {
//       name: "Study Desk",
//       image: "https://i.ibb.co/k28cbGf/study-table.jpg",
//       price: 150,
//       oldPrice: 180,
//       discount: "16.7%",
//     },
//      {
//       name: "Study Desk",
//       image: "https://i.ibb.co/k28cbGf/study-table.jpg",
//       price: 150,
//       oldPrice: 180,
//       discount: "16.7%",
//     },
//      {
//       name: "Study Desk",
//       image: "https://i.ibb.co/k28cbGf/study-table.jpg",
//       price: 150,
//       oldPrice: 180,
//       discount: "16.7%",
//     }
//   ],
//   "Rolling Chair": [
//     {
//       name: "Office Chair",
//       image: "https://i.ibb.co/s5gF8Z9/office-chair.jpg",
//       price: 90,
//       oldPrice: 95,
//       discount: "5.3%",
//     },
//     {
//       name: "Leather Office Chair",
//       image: "https://i.ibb.co/JtmdC9k/leather-chair.jpg",
//       price: 85,
//       oldPrice: 90,
//       discount: "5.6%",
//     }], // replace with actual products
//   'Modern Wardrobe': [  {
//       name: "Study Desk",
//       image: "https://i.ibb.co/k28cbGf/study-table.jpg",
//       price: 150,
//       oldPrice: 180,
//       discount: "16.7%",
//     }
//   ],
//   "Rolling Chair": [
//     {
//       name: "Office Chair",
//       image: "https://i.ibb.co/s5gF8Z9/office-chair.jpg",
//       price: 90,
//       oldPrice: 95,
//       discount: "5.3%",
//     },
//     {
//       name: "Leather Office Chair",
//       image: "https://i.ibb.co/JtmdC9k/leather-chair.jpg",
//       price: 85,
//       oldPrice: 90,
//       discount: "5.6%",
//     }],
//   'Study Table': [  {
//       name: "Study Desk",
//       image: "https://i.ibb.co/k28cbGf/study-table.jpg",
//       price: 150,
//       oldPrice: 180,
//       discount: "16.7%",
//     }
//   ],
//   "Rolling Chair": [
//     {
//       name: "Office Chair",
//       image: "https://i.ibb.co/s5gF8Z9/office-chair.jpg",
//       price: 90,
//       oldPrice: 95,
//       discount: "5.3%",
//     },
//     {
//       name: "Leather Office Chair",
//       image: "https://i.ibb.co/JtmdC9k/leather-chair.jpg",
//       price: 85,
//       oldPrice: 90,
//       discount: "5.6%",
//     }],
//   'Rolling Chair': [  {
//       name: "Study Desk",
//       image: "https://i.ibb.co/k28cbGf/study-table.jpg",
//       price: 150,
//       oldPrice: 180,
//       discount: "16.7%",
//     }
//   ],
//   "Rolling Chair": [
//     {
//       name: "Office Chair",
//       image: "https://i.ibb.co/s5gF8Z9/office-chair.jpg",
//       price: 90,
//       oldPrice: 95,
//       discount: "5.3%",
//     },
//     {
//       name: "Leather Office Chair",
//       image: "https://i.ibb.co/JtmdC9k/leather-chair.jpg",
//       price: 85,
//       oldPrice: 90,
//       discount: "5.6%",
//     }],
//   'Wooden Table': [  {
//       name: "Study Desk",
//       image: "https://i.ibb.co/k28cbGf/study-table.jpg",
//       price: 150,
//       oldPrice: 180,
//       discount: "16.7%",
//     }
//   ],
//   "Rolling Chair": [
//     {
//       name: "Office Chair",
//       image: "https://i.ibb.co/s5gF8Z9/office-chair.jpg",
//       price: 90,
//       oldPrice: 95,
//       discount: "5.3%",
//     },
//     {
//       name: "Leather Office Chair",
//       image: "https://i.ibb.co/JtmdC9k/leather-chair.jpg",
//       price: 85,
//       oldPrice: 90,
//       discount: "5.6%",
//     }],
//   'Wooden Sofa': [  {
//       name: "Study Desk",
//       image: "https://i.ibb.co/k28cbGf/study-table.jpg",
//       price: 150,
//       oldPrice: 180,
//       discount: "16.7%",
//     }
//   ],
//   "Rolling Chair": [
//     {
//       name: "Office Chair",
//       image: "https://i.ibb.co/s5gF8Z9/office-chair.jpg",
//       price: 90,
//       oldPrice: 95,
//       discount: "5.3%",
//     },
//     {
//       name: "Leather Office Chair",
//       image: "https://i.ibb.co/JtmdC9k/leather-chair.jpg",
//       price: 85,
//       oldPrice: 90,
//       discount: "5.6%",
//     }],
// };

// const FurnitureShowcase = () => {
//   const [selectedCategory, setSelectedCategory] = useState('Rolling Chair');

//   return (
//     <div className="flex w-full">
//       <CategorySidebar
//         categories={Object.keys(productData)}
//         selected={selectedCategory}
//         onSelect={setSelectedCategory}
//       />
//       <ProductSlider products={productData[selectedCategory]} />
//     </div>
//   );
// };

// export default FurnitureShowcase;
