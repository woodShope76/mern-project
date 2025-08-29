import React, { useEffect, useState, useContext, use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import { BsHeart } from "react-icons/bs";
import { CartContext } from "../Context/CartContext";
import { getAuth } from "firebase/auth";
import useScrollToTop from "../hooks/useScrollToTop"; 

const DisplayPage = () => {
  useScrollToTop(); 
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { setCartUpdated } = useContext(CartContext);
  const [isLiked, setIsLiked] = useState(false);


  useEffect(() => {
    fetch("https://mern-project-backend-2-g3px.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        const selected = data.find((item) => item._id === id);
        setProduct(selected);
      });
  }, [id]);

  const handleAddToCart = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      navigate("/authpage");
      return;
    }

    const userId = user.uid;

    try {
      const response = await fetch("https://mern-project-backend-2-g3px.onrender.com/api/cart/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: product._id, quantity }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Added to cart!");
        navigate("/cart");
      } else {
        alert(result.message || "Error adding to cart");
      }

      setCartUpdated((prev) => !prev);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong.");
    }
  };
  useEffect(() => {
  if (!product) return; // ✅ Guard clause

  const liked = JSON.parse(localStorage.getItem("likedProducts")) || [];
  const alreadyLiked = liked.find((item) => item.id === product.id);
  if (alreadyLiked) {
    setIsLiked(true);
  }
}, [product]); // ✅ Just watch `product`, not `product.id`


 const handleLike = () => {
  let liked = JSON.parse(localStorage.getItem("likedProducts")) || [];
  const alreadyLiked = liked.find((item) => item.id === product.id);
  if (!alreadyLiked) {
    liked.push(product);
    localStorage.setItem("likedProducts", JSON.stringify(liked));
    setIsLiked(true); // ✅ Set the state
 

  } else {
    alert("Product is already liked!");
  }
};


  const relatedProducts = allProducts.filter(
    (item) => item.category === product?.category && item._id !== product?._id
  );

  if (!product)
    return <div className="text-center mt-20 text-xl animate-pulse">Loading...</div>;

  return (
    <div className="max-w-screen-2xl mx-auto bg-white mt-24 px-4 sm:px-8 md:px-16 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Image */}
      <div className="w-full h-[300px] rounded-xl overflow-hidden shadow-xl">
  <img
    src={product.image}
    alt={product.title}
    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
  />
</div>

        {/* Main Info */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            {product.title}
          </h2>

          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <span className="text-gray-700 font-medium">4.0</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[#c1975b] font-bold text-2xl">₹{product.price}</span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-lg">₹{product.oldPrice}</span>
            )}
          </div>

          <p className="text-gray-600">
            <span className="font-semibold text-black">Size:</span> {product.size || '—'}
          </p>

          <p className="text-gray-600">
            <span className="font-semibold text-black">Description:</span> {product.description || 'No description available.'}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center px-3 py-2 border border-[#d6ab70] rounded-lg">
              <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))} className="text-lg px-3 py-1 text-black">-</button>
              <span className="mx-3 text-black font-semibold">{quantity}</span>
              <button onClick={() => setQuantity((prev) => prev + 1)} className="text-lg px-3 py-1 text-black">+</button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.stock || loading}
              className={`flex items-center gap-2 bg-[#c1975b] text-white px-5 py-2 rounded-md hover:bg-[#a67b45] transition-all ${!product.stock || loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <PiShoppingCartSimpleDuotone className="text-lg" />
              {loading ? "Adding..." : "Add To Cart"}
            </button>

 <button
  onClick={handleLike}
  className={`flex items-center gap-2 border border-[#8b4513] px-5 py-2 rounded-lg transition-all ${
    isLiked ? "bg-[#c1975b] text-white" : "text-[#8b4513] hover:bg-[#f3e6dc]"
  }`}
>
  <BsHeart className="text-lg" />
  {isLiked ? "Liked" : "Like"}
</button>


          </div>

          <p className="text-md text-gray-600">
            <span className="font-semibold text-black">Category:</span> {product.category}
          </p>
        </div>

        {/* Product Info Box */}
       <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg md:min-w-[280px] md:max-w-[320px] w-full mt-8 md:mt-0">
  <h3 className="text-2xl font-bold mb-6 text-[#4b3c2e] border-b pb-2">
    Product Info
  </h3>

  <p className="text-lg font-semibold text-gray-900 mb-2">{product.title}</p>

  <p className="text-xl text-[#c1975b] font-bold mb-4">
    ₹{product.price}
    {product.oldPrice && (
      <span className="text-sm text-gray-400 line-through ml-2">
        ₹{product.oldPrice}
      </span>
    )}
  </p>

  <p className="text-sm text-gray-800 mb-2">
    <span className="font-semibold text-black">Size:</span> {product.size || "—"}
  </p>

  <p className="text-sm text-gray-800 leading-relaxed">
    <span className="font-semibold text-black">Description:</span>{" "}
    {product.description || "No description available."}
  </p>
</div>

      </div>

      {/* Related Products */}
      <div className="mt-14">
        <h3 className="text-xl font-bold mb-6 text-black">Similar Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {relatedProducts.slice(0, 4).map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-lg">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#c1975b] font-bold">₹{item.price}</span>
                    {item.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">₹{item.oldPrice}</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/product/${item._id}`)}
                className="bg-[#c1975b] text-white px-4 py-2 rounded-md hover:bg-[#a67b45]"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayPage;
