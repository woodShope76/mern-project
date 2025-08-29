import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useScrollToTop from "../hooks/useScrollToTop"; 

const OrdersPage = () => {
  useScrollToTop(); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        setError("User not logged in.");
        return;
      }

      try {
        const res = await axios.get(`https://mern-project-backend-2-g3px.onrender.com/api/orders/${user.uid}`);
        setOrders(res.data);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading your orders...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto pt-24 px-4 pb-20">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#4B5563]">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-md font-semibold text-[#374151]">Order #{order._id.slice(-6).toUpperCase()}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {order.status}
                </span>
              </div>

              <div className="mb-2">
                <h4 className="font-medium text-sm text-gray-800">Shipping To:</h4>
                <p className="text-xs text-gray-600">
                  {order.shippingInfo.fullName} ({order.shippingInfo.phone})<br />
                  {order.shippingInfo.street}, {order.shippingInfo.landmark}, {order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pincode}
                </p>
              </div>

              <div className="mt-3">
                <h4 className="font-medium text-sm text-gray-800 mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.cartItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <img src={item.image || "/placeholder.png"} alt={item.title} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.productName || item.title}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right font-semibold text-gray-700">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center border-t pt-2 text-sm">
                <span className="text-gray-600">Payment: <strong>{order.paymentMethod}</strong></span>
                <span className="text-gray-900 font-bold">₹{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
