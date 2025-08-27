import React, { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ProductSlider = ({ products }) => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-3/4 p-6 overflow-hidden">
      <h2 className="text-3xl font-bold mb-4">Explore The Essence</h2>

      <div className="absolute top-0 right-4 flex gap-3 z-10">
        <button onClick={() => scroll('left')} className="p-2 border rounded-full">
          <FaArrowLeft />
        </button>
        <button onClick={() => scroll('right')} className="p-2 border rounded-full">
          <FaArrowRight />
        </button>
      </div>

      <div ref={containerRef} className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar">
        {products.map((product, i) => (
          <div key={i} className="min-w-[250px] bg-white p-4 rounded-xl shadow hover:shadow-lg">
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
              <span className="absolute top-2 left-2 bg-[#8a5a36] text-white text-sm px-2 py-0.5 rounded">
                {product.discount} OFF
              </span>
            </div>
            <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500 line-through">${product.oldPrice}</p>
            <p className="text-md font-bold">${product.newPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
