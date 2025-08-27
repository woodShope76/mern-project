import React from 'react';
import { Truck, ShoppingBag, Headphones, RotateCcw } from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-6 h-6 " />,
    title: 'Fast & Free Shipping',
    description: 'Get your furniture delivered quickly and for free on all eligible orders.',
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: 'Easy to Shop',
    description: 'Simple navigation and smooth checkout for a hassle-free experience.',
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: '24/7 Support',
    description: 'Our team is always ready to assist you, day or night.',
  },
  {
    icon: <RotateCcw className="w-6 h-6" />,
    title: 'Hassle Free Returns',
    description: 'Not satisfied? Return your item easily within 7 days.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#f7fbfb] py-16 px-6 md:px-16 max-w-screen-2xl mx-auto">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 mb-10">
            Discover why thousands of happy customers love shopping with us.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full shadow-sm text-gray-700 hover:-rotate-12 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <img
            src="public/black-chairs.avif"
            alt="Furniture"
            className="rounded-xl shadow-lg"
          />
          <div className="absolute top-0 left-0 w-24 h-24 bg-yellow-400 opacity-20 rounded-full -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
