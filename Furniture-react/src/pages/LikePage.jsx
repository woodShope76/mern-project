import React, { use, useEffect, useState } from "react";
import { Heart, XCircle } from "lucide-react";
import useScrollToTop from "../hooks/useScrollToTop"; 

const LikePage = () => {
  useScrollToTop(); 
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedProducts")) || [];
    setLikedProducts(storedLikes);
  }, []);

  const handleUnlike = (id) => {
    const updatedLikes = likedProducts.filter((item) => item.id !== id);
    setLikedProducts(updatedLikes);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
  };

  return (
    <div className="px-6 md:px-20 mt-24 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800">❤️ Your Liked Products</h1>
        {likedProducts.length > 0 && (
          <span className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm font-semibold">
            {likedProducts.length} item{likedProducts.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {likedProducts.length === 0 ? (
        <p className="text-gray-600 text-lg">You haven't liked any products yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {likedProducts.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 bg-white"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

              {/* Product Info */}
              <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                <h4 className="text-lg font-semibold truncate">{item.title}</h4>
                <p className="text-sm text-gray-200">{item.category}</p>
                <p className="text-lg font-bold mt-1">₹{item.price}</p>
              </div>

              {/* Unlike Button */}
              <button
                onClick={() => handleUnlike(item.id)}
                className="absolute top-3 right-3 z-30 text-white hover:text-red-500 transition"
                title="Remove from Likes"
              >
                <XCircle className="w-7 h-7" />
              </button>

              {/* Like icon (bottom-left float) */}
              <div className="absolute top-3 left-3 z-30 bg-white/80 rounded-full p-1 shadow">
                <Heart className="w-5 h-5 text-pink-600 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikePage;
