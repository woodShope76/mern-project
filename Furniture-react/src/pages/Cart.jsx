import React, { use, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useScrollToTop from "../hooks/useScrollToTop"; 

const Cart = () => {
  useScrollToTop(); 
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`https://mern-project-backend-2-g3px.onrender.com/api/cart/${user.uid}`);
      const data = await res.json();

      const enrichedItems = await Promise.all(
        data.items.map(async (item) => {
          try {
            const productRes = await fetch(`https://mern-project-backend-2-g3px.onrender.com/api/products/${item.productId}`);
            if (!productRes.ok) throw new Error("Product not found");

            const product = await productRes.json();

            return {
              ...product,
              _id: item.productId,
              quantity: item.quantity,
            };
          } catch (err) {
            console.warn(`⚠️ Skipped invalid productId: ${item.productId}`);
            return null;
          }
        })
      );

      setCartItems(enrichedItems.filter(Boolean)); // removes nulls
    } catch (error) {
      console.error("❌ Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);


 const handleDeleteItem = async (productId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user._id) return;

  try {
    const res = await fetch("https://mern-project-backend-2-g3px.onrender.com/api/cart/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        productId,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      window.location.reload(); // 🔄 Refresh the entire cart page
    } else {
      alert(data.message || "Failed to remove item");
    }
  } catch (error) {
    console.error("❌ Error deleting item:", error);
    alert("Something went wrong.");
  }
};



  const increaseQty = (_id) => {
    const updated = cartItems.map((item) =>
      item._id === _id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCartItems(updated);
  };

  const decreaseQty = (_id) => {
    const updated = cartItems.map((item) =>
      item._id === _id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updated);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const handleProceedToCheckout = () => {
  if (cartItems.length > 0) {
    navigate("/checkout", { state: { cartItems } }); // ✅ pass cartItems via route state
  } else {
    alert("Cart is empty!");
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto pt-24 px-4 pb-28 bg-[#f9f9f9] min-h-screen">
      <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Items in the cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <h2 className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    ₹{Number(item.price).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="px-2 py-1 text-sm bg-[#d6ab70] rounded"
                >
                  −
                </button>
                <span className="text-md font-bold text-black">
                  {item.quantity || 1}
                </span>
                <button
                  onClick={() => increaseQty(item._id)}
                  className="px-2 py-1 text-sm bg-[#d6ab70] rounded"
                >
                  +
                </button>
                <button
               onClick={() => handleDeleteItem(item._id)}

                  className="ml-2 text-2xl text-gray-500"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 bg-white rounded-xl shadow p-4 text-sm">
            <div className="flex justify-between py-1 text-black">
              <span>Total Amount</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
          </div>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-inner p-4 flex justify-between items-center">
          <span className="text-pink-600 font-bold text-lg">
            ₹{total.toFixed(0)}
          </span>
          <button
            onClick={handleProceedToCheckout}
            className="bg-[#1f6321] text-white font-semibold px-6 py-2 rounded-full"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
