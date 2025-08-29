import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop"; 

const ShopPage = () => {
  useScrollToTop(); 
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://mern-project-backend-2-g3px.onrender.com/api/products");
        const data = await res.json();
        setProducts(data);

        if (initialCategory && initialCategory !== selectedCategory) {
          setSelectedCategory(initialCategory);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [initialCategory]);

  const categories = ["All", ...new Set(products.map((item) => item.category))];

  const filtered = products
    .filter((item) =>
      selectedCategory === "All" ? true : item.category === selectedCategory
    )
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="bg-[#f9fbfc] py-10 px-6 md:px-20 md:mt-20 mt-16 max-w-screen-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">All Products</h1>
      <p className="text-sm text-gray-500 mb-6 font-semibold">
        Explore our premium furniture collection for every corner of your home.
      </p>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide md:flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full border md:text-sm text-xs font-bold transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-[#e9dcc9] text-[#4b3c2e] border-[#a18b6e]"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#a18b6e]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full md:w-1/2 px-4 py-2 border text-gray-700 font-semibold border-gray-300 rounded-full mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#9e9171]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <div className="group relative bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300">
              <div className="overflow-hidden h-auto w-full aspect-square bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base md:text-lg font-bold text-gray-800 truncate">
                  {product.title}
                </h3>
                <p className="text-xs text-gray-500 mb-1 truncate">
                  {product.category}
                </p>
                <p className="text-xs text-gray-500 mb-2 truncate">
                  Size: {product.size}
                </p>

                <div className="mb-2 flex flex-col items-start text-sm">
                  {product.oldPrice && (
                    <p className="text-gray-500 line-through">
                      ₹{product.oldPrice}
                    </p>
                  )}
                  <p className="text-lg font-bold text-[#7b4d2c]">
                    ₹{product.price}
                  </p>
                </div>
                <button className="w-full mt-3 bg-[#7b4d2c] hover:bg-[#5e3920] text-white text-sm py-2 rounded transition">
                  View Details
                </button>
              </div>

              {/* Ribbon Offer */}
              {product.oldPrice && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded shadow-md">
                  {Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) * 100
                  )}
                  % OFF
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-12">No products found.</p>
      )}
    </div>
  );
};

export default ShopPage;
