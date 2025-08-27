// src/Components/Loader.jsx
import React from 'react';
import Lottie from 'lottie-react';
import furnitureLoader from '../../public/animation/furniture-loader.json'; // adjust path if needed

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="w-52 h-52">
        <Lottie animationData={furnitureLoader} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
