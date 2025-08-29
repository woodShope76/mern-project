import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const BestCategories = () => {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState({});

useEffect(() => {
  // Static desired categories (in order)
  setCategories(["Bed", "Sofa", "Table", "Shelf", "Almira"]);
}, []);


  const toggleDropdown = async (category) => {
    if (openCategory === category) {
      setOpenCategory(null); // Close if clicked again
      return;
    }

    // Only fetch if not already present
    if (!categoryProducts[category]) {
      try {
        const res = await axios.get(
          `https://mern-project-backend-2-g3px.onrender.com/api/products?category=${encodeURIComponent(category.trim())}`
        );
        setCategoryProducts((prev) => ({
          ...prev,
          [category]: res.data || [],
        }));
      } catch (error) {
        console.error("Error fetching products for", category, error);
        setCategoryProducts((prev) => ({ ...prev, [category]: [] }));
      }
    }

    setOpenCategory(category); // Open new dropdown
  };

  return (
    <div className="p-6 max-w-screen-2xl mx-auto rounded-lg bg-white my-4">
      <h2 className="text-3xl font-bold mb-4 text-[#523022]">
        Browse by Category
      </h2>
      <p className="text-gray-500 mb-6">
        Explore our furniture collections based on category.
      </p>

      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-white p-4 rounded-lg shadow-md transition-all duration-300"
          >
            <div
              onClick={() => toggleDropdown(category)}
              className="flex justify-between items-center cursor-pointer text-black"
            >
              <h3 className="text-lg font-bold">{category}</h3>
              {openCategory === category ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {/* Only render if this is the open category */}
            {openCategory === category && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 transition-all duration-300">
                {(categoryProducts[category] || []).map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="border border-amber-600 rounded p-3 hover:shadow-md transition"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-28 object-contain mb-2"
                    />
                    <h4 className="text-sm font-semibold text-amber-900 truncate">
                      {product.title}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      ₹{product.price}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestCategories;
