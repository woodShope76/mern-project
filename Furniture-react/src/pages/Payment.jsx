import React, { useState, useEffect } from "react";
import { FaGooglePay, FaPhone, FaWallet } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
// import Lottie from "lottie-react";
// import paymentSuccess from "../assets/Booking-confirm.json"
import { useNavigate } from "react-router-dom";


const PaymentOptionsPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [upiOption, setUpiOption] = useState("paytm");
  const [showWallet, setShowWallet] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
   const [showSuccessModal, setShowSuccessModal] = useState(false);

   const navigate = useNavigate();

  useEffect(() => {
    // Fetch total from cart stored in localStorage
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const total = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, []);

  const onlineDiscount = selectedMethod === "upi" ? Math.round(totalPrice * 0.1) : 0;
  const finalPrice = selectedMethod === "upi" ? totalPrice - onlineDiscount : totalPrice;

  useEffect(() => {
  if (showSuccessModal) {
    const timeout = setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/"); // 🔁 redirect to homepage
    }, 5000); // after 3 seconds
    return () => clearTimeout(timeout);
  }
}, [showSuccessModal]);

  return (
<>
  {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#964e1c]/40 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            {/* <Lottie animationData={paymentSuccess} className="w-44 mx-auto mb-4" /> */}
            <h2 className="text-xl font-bold mb-4 text-green-600">Order Successful!</h2>
            <p className="text-sm text-gray-600 mt-2">Your booking has been successfully submitted.</p>
            <p className="text-sm text-gray-600 mt-2">Thank you for choosing Us!</p>
            <button
              onClick={() => {
                setShowSuccessModal(false); // Close the success modal
                // onClose(); // Close the booking form
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    <div className="max-w-md mx-auto p-4 bg-white min-h-screen lg:mt-20 mt-20">
      <h2 className="text-center text-lg font-bold mb-4 text-black">
        SELECT PAYMENT METHOD
      </h2>

      {/* COD */}
      <label
        className={`flex justify-between items-center border-2 rounded-lg p-4 mb-4 cursor-pointer ${
          selectedMethod === "cod" ? "border-[#964e1c]" : "border-gray-300"
        }`}
        onClick={() => setSelectedMethod("cod")}
      >
        <div className="flex items-center gap-3">
          <img src="public/cod.svg" alt="COD" className="w-6 h-6" />
          <span className="text-lg font-medium text-black">
            ₹{totalPrice} Cash on Delivery
          </span>
        </div>
        <input
          type="radio"
          name="payment"
          value="cod"
          checked={selectedMethod === "cod"}
          onChange={() => setSelectedMethod("cod")}
          className="accent-[#af754b] w-5 h-5"
        />
      </label>

      {/* Pay Online */}
      <div
        className={`border-2 rounded-lg p-4 mb-4 ${
          selectedMethod === "upi" ? "border-[#964e1c]" : "border-gray-300"
        }`}
        onClick={() => setSelectedMethod("upi")}
      >
        <div className="flex justify-between items-center mb-1">
          <p className="text-lg font-medium text-black flex items-center gap-2">
            ₹{finalPrice}{" "}
            <span className="text-sm text-gray-500 line-through">₹{totalPrice}</span> Pay Online
          </p>
          <input
            type="radio"
            name="payment"
            value="upi"
            checked={selectedMethod === "upi"}
            onChange={() => setSelectedMethod("upi")}
            className="accent-[#af754b] w-5 h-5"
          />
        </div>
        <p className="text-green-600 text-sm font-medium">Save ₹{onlineDiscount} (10%)</p>
        <p className="text-sm text-green-600 mb-3">
          Extra discount with bank offers{" "}
          <span className="text-purple-600 underline cursor-pointer">View Offers</span>
        </p>

        {/* UPI Options */}
        {selectedMethod === "upi" && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Pay by any UPI App</p>

            {/* Paytm */}
            <label className={`flex justify-between items-start mb-2 cursor-pointer p-2 rounded-md ${
              upiOption === "paytm" ? "bg-[rgb(211,244,234)]" : "bg-white"
            }`}>
              <div className="flex items-start gap-2 text-black">
                <img className="w-6 h-6" src="public/paytm.png" alt="" />
                <div>
                  Paytm
                  <div className="text-sm text-green-600 font-normal">
                    Upto ₹200 cashback on orders above ₹149 + ₹50 cashback on next 3 bill payments
                  </div>
                </div>
              </div>
              <input
                type="radio"
                name="upi"
                value="paytm"
                checked={upiOption === "paytm"}
                onChange={() => setUpiOption("paytm")}
                className="accent-[#af754b] w-5 h-5"
              />
            </label>

            {/* GPay */}
            <label className={`flex justify-between items-start mb-2 cursor-pointer p-2 rounded-md text-black ${
              upiOption === "gpay" ? "bg-[rgb(211,244,234)]" : "bg-white"
            }`}>
              <div className="flex items-center gap-2">
                <img className="w-6 h-6" src="public/GOOGLEPAY.jfif" alt="" />
                GPay
              </div>
              <input
                type="radio"
                name="upi"
                value="gpay"
                checked={upiOption === "gpay"}
                onChange={() => setUpiOption("gpay")}
                className="accent-[#af754b] w-5 h-5"
              />
            </label>

            {/* PhonePe */}
            <label className={`flex justify-between items-start mb-2 cursor-pointer p-2 rounded-md text-black ${
              upiOption === "phonepe" ? "bg-[rgb(211,244,234)]" : "bg-white"
            }`}>
              <div className="flex items-center gap-2">
                <img className="w-6 h-6" src="public/phonepay.png" alt="" />
                PhonePe
              </div>
              <input
                type="radio"
                name="upi"
                value="phonepe"
                checked={upiOption === "phonepe"}
                onChange={() => setUpiOption("phonepe")}
                className="accent-[#af754b] w-5 h-5"
              />
            </label>

            {/* Add UPI ID */}
            <div className="mt-2">
              <label className="text-sm text-black font-medium mb-1 block">ADD UPI ID</label>
              <input
                type="text"
                placeholder="Enter your UPI ID"
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-purple-600 placeholder:text-black text-black"
              />
            </div>

            {/* Wallet Section */}
            <div className="border-t border-black pt-4 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWallet(!showWallet);
                }}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaWallet /> Wallet <span className="text-green-600">Offers Available</span>
                </div>
                {showWallet ? <MdExpandLess /> : <MdExpandMore />}
              </button>

              {showWallet && (
                <div className="mt-2 text-sm text-gray-600">Wallet options go here (mock)</div>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-center text-gray-500 mb-4">
        Clicking on 'Continue' will not deduct any money
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between border-t pt-4 border-black">
        <p className="text-lg font-bold text-black">₹{finalPrice}</p>
      <button
  onClick={() => {
    setShowSuccessModal(true);
    localStorage.removeItem("cartItems"); // ✅ optional: clear cart after payment
    // setTimeout(() => navigate("/"), 3000); // ✅ optional: redirect after delay
  }}
  className="bg-[#c1975b] text-white px-6 py-2 rounded-md hover:text-gray-700 font-bold"
>
  Continue
</button>
      </div>
    </div>
    </>
  );
};

export default PaymentOptionsPage;

