import React, { use } from 'react';
import useScrollToTop from "../hooks/useScrollToTop"; 

const AboutUs = () => {
  useScrollToTop();
  return (
    <div className="bg-white max-w-screen-2xl mx-auto text-gray-800 mt-16">
      {/* Banner Section */}
      <div className="pt-8">
        <img
          src="https://www.shutterstock.com/image-illustration/laptop-flying-furniture-shopping-online-260nw-2236966119.jpg"
          alt="Banner"
          className="w-full h-[400px] rounded-xl object-cover brightness-75"
        />
        <div className="inset-0 flex items-center justify-center pt-5">
          <h1 className="text-gray-800 lg:text-5xl text-3xl lg:font-bold drop-shadow-lg">About WoodStore</h1>
        </div>
      </div>

      {/* About Content Section */}
      <div className="py-16 px-4 lg:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <img
              src="public/sofa-set (2).png"
              alt="Furniture showroom"
              className="w-full rounded-2xl "
            />

            <div>
              <h3 className="text-2xl font-semibold mb-4">Crafting Comfort & Elegance</h3>
              <p className="text-lg text-gray-600 mb-6">
                At <span className="font-bold text-brown-700">WoodStore</span>, we believe your home should reflect your style and personality. That’s why we design and craft furniture that blends timeless elegance with everyday comfort.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With over 10 years of experience in the industry, our skilled artisans use premium wood and sustainable materials to create pieces that are not just beautiful, but built to last.
              </p>
              <p className="text-lg text-gray-600">
                Whether you're furnishing your dream home or revamping your space, WoodStore is here to bring your vision to life.
              </p>
            </div>
          </div>

          {/* Craftsmanship Info Section */}
          <div className="mt-24 bg-[#f9f4f0] p-10 rounded-xl shadow-inner">
            <h2 className="text-3xl font-semibold mb-6 text-center text-[#8b4513]">Our Craftsmanship</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-gray-700 text-lg mb-4">
                  Our furniture is handcrafted with precision and passion by seasoned artisans who follow traditional woodworking techniques blended with modern design sensibilities.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                  We source premium-grade wood like teak, sheesham, and oak, ensuring each piece reflects durability and natural elegance. Every curve, joint, and finish is done by hand, tested for strength, and polished for perfection.
                </p>
                <p className="text-gray-700 text-lg">
                  It’s not just furniture — it’s a story of skill, care, and commitment that lives in every piece we create.
                </p>
              </div>
              <img
                src="https://img.freepik.com/free-photo/worker-making-wooden-furniture-workshop_23-2149211835.jpg"
                alt="Craftsmanship"
                className="w-full h-full rounded-lg shadow-md object-cover"
              />
            </div>
          </div>

          {/* Visit Us Section */}
          <div className="mt-20 text-center">
            <h4 className="text-xl font-semibold mb-2">Visit Us</h4>
            <p className="text-gray-600">123 Classic Street, Furniture City, India</p>
            <p className="text-gray-600">Call us: +91-9876543210 | Email: support@woodstore.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
