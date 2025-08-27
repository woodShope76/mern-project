import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import ShopByCategory from "./Components/ShopByCategory";
import SeasonalDealBanner from "./Components/SeasonalDealBanner";
import CustomerTestimonials from "./Components/CustomerTestimonials";
import WhyChooseUs from "./Components/WhyChooseUs";
import ShopPage from "./pages/Shop";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AuthPage from "./pages/Authpage";
import DisplayPage from "./pages/DisplayPage";
import LikePage from "./pages/LikePage";
import Footer from "./Components/Footer";
import BestOffers from "./Components/BestOffers";
import FurnitureCategories from "./Components/Category";
import Loader from "./pages/Loader";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Order from "./pages/Orders"
import AdminPanel from "./pages/AdminPanel";
import AdminRoute from "./AdminRoute";

// Custom wrapper to track route changes
const RouteChangeTracker = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      {!loading && children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <RouteChangeTracker>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <FurnitureCategories />
                  <ShopByCategory />
                  <SeasonalDealBanner />
                  <WhyChooseUs />
                  <BestOffers />
                  <CustomerTestimonials />
                </>
              }
            />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/product/:id" element={<DisplayPage />} />
            <Route path="/Likepage" element={<LikePage />} />
            <Route path="/authpage" element={<AuthPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/adminpanel" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          </Routes>
        </div>
      </RouteChangeTracker>
      <Footer />
    </Router>
  );
}

export default App;
