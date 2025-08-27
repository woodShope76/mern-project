import React, { useState, useEffect, use } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useScrollToTop from "../hooks/useScrollToTop"; 

const Checkout = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    landmark: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "",
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        try {
          // Fetch saved addresses
          const res = await fetch(`http://localhost:5000/api/address/${user.uid}`);
          const data = await res.json();
          if (Array.isArray(data)) setSavedAddresses(data);

          // Fetch cart items if not passed
          if (cartItems.length === 0) {
            const cartRes = await fetch(`http://localhost:5000/api/cart/${user.uid}`);
            const cartData = await cartRes.json();
            const enrichedItems = await Promise.all(
              cartData.items.map(async (item) => {
                const prodRes = await fetch(`http://localhost:5000/products/${item.productId}`);
                const product = await prodRes.json();
                return { ...product, _id: item.productId, quantity: item.quantity };
              })
            );
            setCartItems(enrichedItems);
          }
        } catch (error) {
          console.error("Error loading data:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return alert("Your cart is empty.");
    if (!formData.paymentMethod) return alert("Please select a payment method.");

    if (selectedAddressIndex !== null) {
      setShowConfirmModal(true);
    } else {
      const { fullName, phone, street, landmark, address, city, state, pincode } = formData;
      if (fullName && phone && street && landmark && address && city && state && pincode) {
        setShowConfirmModal(true);
      } else {
        alert("Please fill all required fields.");
      }
    }
  };

  const finalPlaceOrder = async () => {
    try {
      const shippingInfo =
        selectedAddressIndex !== null
          ? savedAddresses[selectedAddressIndex]
          : formData;

      if (selectedAddressIndex === null) {
        await fetch("http://localhost:5000/api/address/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUser.uid,
            ...formData,
          }),
        });
      }

      const enrichedItems = cartItems.map((item) => ({
       _id: item._id,              // Match schema field
  title: item.title,          // ✅ Correct field name
  image: item.image,
  quantity: item.quantity,
  price: item.price,
      }));

      await fetch("http://localhost:5000/api/orders/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.uid,
          cartItems: enrichedItems,
          shippingInfo,
          total,
          paymentMethod: formData.paymentMethod,
          status: "Pending",
          createdAt: new Date(),
        }),
      });

      await fetch(`http://localhost:5000/api/cart/clear/${currentUser.uid}`, {
        method: "DELETE",
      });

      setShowConfirmModal(false);
      window.location.href = "/";
    } catch (err) {
      console.error("Order Error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-24 px-4 pb-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Shipping Info */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-[#885206]">Shipping Information</h2>

          {savedAddresses.length > 0 && (
            <div className="mb-4">
              <label className="font-medium mb-2 text-gray-700 block">Select a saved address:</label>
              {savedAddresses.map((addr, index) => (
                <div
                  key={index}
                  className={`border p-3 mb-2 rounded-md cursor-pointer transition-all duration-300 ${
                    selectedAddressIndex === index
                      ? "border-green-600 bg-green-500 shadow"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setSelectedAddressIndex(index)}
                >
                  <label className="flex gap-2 items-start cursor-pointer">
                    <input
                      type="radio"
                      name="savedAddress"
                      checked={selectedAddressIndex === index}
                      readOnly
                    />
                    <span>
                      {addr.fullName}, {addr.phone}, {addr.street}, {addr.landmark},{" "}
                      {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          )}

          <p className="mt-4 mb-2 font-medium text-[#885206]">Or enter a new address:</p>
          <div className="space-y-3">
            {[
              "fullName",
              "phone",
              "street",
              "landmark",
              "address",
              "city",
              "state",
              "pincode",
            ].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                disabled={selectedAddressIndex !== null}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                className="w-full border text-black border-gray-300 px-4 py-2 rounded"
              />
            ))}

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded text-black border-gray-300"
              required
            >
              <option value="">Select a payment method</option>
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4 text-[#885206]">Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between text-black border-b pb-2 mb-2">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p>₹{(item.price * item.quantity).toFixed(0)}</p>
            </div>
          ))}

          <div className="mt-4 border-t pt-4 text-black">
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-bold text-lg">₹{total.toFixed(0)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 py-3 font-semibold rounded bg-[#527853] hover:bg-[#406341] text-white"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-[#885206]">Confirm Your Order</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to place this order?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={finalPlaceOrder}
                className="px-4 py-2 bg-[#527853] text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
