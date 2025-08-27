// Navbar.jsx
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { ShoppingCart, Heart, User } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { CartContext } from "../Context/CartContext";
import { Dialog, Transition } from '@headlessui/react';
import Sidebar from "./Sidebar";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const auth = getAuth();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { cartCount, setCartCount, cartUpdated } = useContext(CartContext);
   const [likedCount, setLikedCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    if (isHome) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHome]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCartCount(0);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/cart/${user.uid}`);
        const data = await res.json();
        const totalQty = (data.items || []).reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalQty);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    });

    return () => unsubscribe();
  }, [cartUpdated]);


  useEffect(() => {
  const updateLikedCount = () => {
    const storedLikes = JSON.parse(localStorage.getItem("likedProducts")) || [];
    setLikedCount(storedLikes.length);
  };

  updateLikedCount(); // Initial call

  // Listen to storage change (when another component updates it)
  window.addEventListener("storage", updateLikedCount);

  return () => {
    window.removeEventListener("storage", updateLikedCount);
  };
}, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUser(user);
        setIsLoggedIn(true);
      } else {
        setFirebaseUser(null);
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setFirebaseUser(null);
      setIsLoggedIn(false);
      setShowSidebar(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed");
    }
  };

  const backgroundClass = isHome && !scrolled
    ? 'bg-transparent text-white'
    : 'bg-transparent backdrop-blur-lg text-gray-800';

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-50 transition duration-300 ${backgroundClass}`}>
        <div className="navbar max-w-screen-2xl mx-auto px-4">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0}
                className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 rounded-box w-52 ${isHome && !scrolled ? 'bg-black bg-opacity-70 text-white' : 'bg-white text-black'}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className='flex items-center space-x-2'>
              <Link to="/">
                <img className="pointer-events-none w-12 bg-gray-800 rounded-md" src="/logo (3).png" alt="Logo" />
              </Link>
              <p className='font-bold hidden md:block'>BALAJI <br /> FURNITURE HOUSE</p>
            </div>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-lg font-medium">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="navbar-end space-x-1 sm:space-x-2 md:space-x-4">
              <div className="relative">
      <Link to="/likepage" className="btn btn-ghost hover:text-brown-400">
        <Heart size={20} />
      </Link>

      {likedCount > 0 && (
        <span className="absolute -top-1 -right-0 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {likedCount}
        </span>
      )}
    </div>
            <Link to="/cart" className="rounded-full relative">
              <ShoppingCart size={26} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {!isLoggedIn ? (
              <Link to="/authpage" className="btn btn-ghost hover:text-brown-400">
                <User size={20} />
              </Link>
            ) : (
              <button className="btn btn-ghost btn-profile" onClick={() => setShowSidebar(true)}>
                <img
                  src={ "https://www.w3schools.com/howto/img_avatar.png"}
                  className="w-8 h-8 rounded-full"
                  alt="User"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {showSidebar && (
        <Sidebar
          firebaseUser={firebaseUser}
          toggleSidebar={() => setShowSidebar(false)}
          openLogoutModal={() => setLogoutModalOpen(true)}
        />
      )}

      <Transition appear show={logoutModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setLogoutModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                    Are you sure you want to logout?
                  </Dialog.Title>
                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
                      onClick={() => setLogoutModalOpen(false)}
                    >
                      No
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => {
                        setLogoutModalOpen(false);
                        handleLogout();
                      }}
                    >
                      Yes, Logout
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Navbar;