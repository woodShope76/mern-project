import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const sliderRef = useRef();
  const intervalRef = useRef();
  const navigate = useNavigate();

  const scrollAmount = 340;

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const isEnd = scrollLeft + clientWidth >= scrollWidth - 10;
        if (isEnd) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="relative px-6 py-12 bg-[#fcfcfc] max-w-screen-2xl mx-auto">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-16">
        Discover Our Latest Arrivals
      </h2>

      {/* Arrows */}
      <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10">
        <button
          onClick={scrollLeft}
          className="bg-white shadow-md text-black rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10">
        <button
          onClick={scrollRight}
          className="bg-white shadow-md rounded-full p-2 text-black hover:bg-gray-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Product Slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        onMouseEnter={() => clearInterval(intervalRef.current)}
        onMouseLeave={() => {
          intervalRef.current = setInterval(() => {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            const isEnd = scrollLeft + clientWidth >= scrollWidth - 10;
            if (isEnd) {
              sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
            } else {
              sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
          }, 1500);
        }}
      >
        {products.map((item, index) => (
          <motion.div
            key={item._id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-w-[280px] md:min-w-[360px] bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 snap-start"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-44 object-contain mb-4 rounded"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2 truncate">
              {item.category}
            </p>
            <p className="text-xl font-bold text-[#885532] mb-4">
              ₹{item.price}
            </p>
            <button
              onClick={() => navigate(`/product/${item._id}`)}
              className="w-full bg-[#885532] text-white py-2 rounded hover:bg-[#6f4429] transition"
            >
              View Details
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;
