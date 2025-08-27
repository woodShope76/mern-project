import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ firebaseUser, toggleSidebar, openLogoutModal }) => {
  const isAdmin = firebaseUser?.email === "woodshope76@gmail.com";
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSidebar]);

  return (
    <div
      ref={sidebarRef}
      className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transition-all sidebar-panel"
    >
      <div className="p-4 border-b flex justify-between items-center">
        <p className="text-lg text-gray-800 font-semibold">
          👋 Hello, {firebaseUser?.displayName || "User"}
        </p>
        <button onClick={toggleSidebar}>✕</button>
      </div>
      <ul className="p-4 space-y-4 text-gray-800">
        <li>
          <Link to="/profile" onClick={toggleSidebar}>👤 Profile</Link>
        </li>
        <li>
          <Link to="/orders" onClick={toggleSidebar}>📦 My Orders</Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/adminpanel" onClick={toggleSidebar}>🛠️ Admin Panel</Link>
          </li>
        )}
        <li>
          <button
            onClick={openLogoutModal}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            🚪 Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
