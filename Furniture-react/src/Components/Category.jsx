import React from 'react';
import { useNavigate } from 'react-router-dom';

// Static Categories Array
const categories = [
  {
    name: "Chair",
    image: "https://res.cloudinary.com/dadclqksp/image/upload/v1751865949/chair_exaxol.png",
    category: "Chair",
  },
  {
    name: "Sofa",
    image: "https://res.cloudinary.com/dadclqksp/image/upload/v1751865969/sofa_vc0m7v.webp",
    category: "Sofa",
  },
  {
    name: "Table",
    image: "https://res.cloudinary.com/dadclqksp/image/upload/v1751865985/table_roscle.png",
    category: "Table",
  },
  {
    name: "Bed",
    image: "https://res.cloudinary.com/dadclqksp/image/upload/v1751866004/bed_yuhyeh.webp",
    category: "Bed",
  },
  {
    name: "Wardrobe",
    image: "https://res.cloudinary.com/dadclqksp/image/upload/v1751865899/Wardrobe_bkh876.webp",
    category: "Almira",
  },
  {
    name: "Bookshelf",
    image: "https://res.cloudinary.com/dadclqksp/image/upload/v1751866021/bookshelf_otvjoo.avif",
    category: "Shelf",
  },
];

// Single Card
const FurnitureCategoryCard = ({ name, image, onClick }) => {
  return (
    <div
      className="flex flex-col items-center relative cursor-pointer"
      onClick={onClick}
    >
      <div className="w-28 h-28 bg-[#c59a84] rounded-full relative overflow-visible">
        <img
          src={image}
          alt={name}
          className="absolute -top-18 left-1/2 transform -translate-x-1/2 h-56 object-contain"
        />
      </div>
      <p className="mt-3 text-lg font-semibold text-gray-800">{name}</p>
    </div>
  );
};

// Main Component
const FurnitureCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="py-10 px-4 bg-white max-w-screen-2xl mx-auto">
      <h2 className="text-3xl text-gray-700 font-bold text-center mb-10">
        Explore by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-10 justify-items-center">
        {categories.map((item, index) => (
          <FurnitureCategoryCard
            key={index}
            name={item.name}
            image={item.image}
            onClick={() => handleCategoryClick(item.category)}
          />
        ))}
      </div>
    </section>
  );
};

export default FurnitureCategories;
