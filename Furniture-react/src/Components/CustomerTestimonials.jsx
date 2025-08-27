import React from 'react';
import Slider from 'react-slick';
import { FaQuoteLeft } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    name: 'Anna Wright',
    title: 'CEO',
    image: 'public/pro-1 (1).jpg',
    feedback:
      'FixitGo helped us find the perfect furniture setup. Highly recommended for great quality and fast service!'
  },
  {
    name: 'John Deo',
    title: 'Manager',
    image: 'public/pro-1 (2).jpg',
    feedback:
      'Excellent service, beautiful products, and top-notch customer care. I will definitely order again.'
  },
  {
    name: 'Priya Sharma',
    title: 'Interior Designer',
    image: 'public/pro3.avif',
    feedback:
      'Aesthetically pleasing designs and timely delivery. FixitGo is my go-to for all furniture needs.'
  },
];

const CustomPrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#a97449] text-white p-2 rounded-full z-10 cursor-pointer"
  >
    <FaArrowLeft />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#a97449] text-white p-2 rounded-full z-10 cursor-pointer"
  >
    <FaArrowRight />
  </div>
);
const CustomerTestimonials = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
      nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 px-4 md:px-16 bg-white text-[#523022] max-w-screen-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">What Clients Say</h2>
      <p className="mb-6 text-gray-500">Real feedback from our happy customers</p>

      <Slider {...settings}>
        {testimonials.map((t, i) => (
          <div key={i} className="p-6">
            <div className="border rounded-xl p-6 shadow-md flex flex-col items-center">
              <img
                src={t.image}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <p className="text-gray-600 text-center mb-4">{t.feedback}</p>
              <FaQuoteLeft className="text-yellow-500 text-3xl mb-2 bg-blue" />
              <h4 className="text-lg font-semibold text-black">{t.name}</h4>
              <p className="text-sm text-gray-500">{t.title}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomerTestimonials;
