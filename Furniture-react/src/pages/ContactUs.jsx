import React, { use } from 'react';
import useScrollToTop from "../hooks/useScrollToTop"; 

const ContactUs = () => {
  useScrollToTop();
  return (
    <div className="bg-[#f5f5f5] rounded-t-xl max-w-screen-2xl mx-auto">
      {/* 🔶 Top Banner */}
      <div className="mt-28">
        <img
          src="https://t4.ftcdn.net/jpg/05/08/17/01/360_F_508170187_4Oonk4IG8u9eyfwSUvTASkT8hl71vRX2.jpg"
          alt="Contact Banner"
          className="w-full rounded-t-xl h-[400px] object-cover brightness-75"
        />
        <div className="inset-0 flex items-center justify-center mt-10">
          <h1 className="text-gray-800 lg:text-5xl text-4xl font-bold drop-shadow-lg">Contact Us</h1>
        </div>
      </div>

      {/* 🔶 Main Section */}
      <div className="py-16 px-4 lg:px-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 🔹 Left Side: Contact Form */}
          <div>
            <h2 className="text-3xl font-semibold mb-8 text-gray-800">Drop Us A Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Your Name*</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-brown-500" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Your Email*</label>
                <input type="email" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-brown-500" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Your Phone Number*</label>
                <div className="flex">
                  <select className="border border-gray-300 rounded-l-md px-3 py-2 bg-white text-gray-600">
                    <option>+91</option>
                  </select>
                  <input type="tel" className="w-full border-t border-b border-r border-gray-300 rounded-r-md px-4 py-2 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message*</label>
                <textarea rows="5" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-brown-500" />
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <p className="text-sm text-gray-600">
                  I authorize WoodStore to contact me via Email/SMS/Call/WhatsApp. Read our <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
                </p>
              </div>
              <button type="submit" className="w-full bg-[#8b4513] hover:bg-[#6d3510] text-white py-3 rounded-md font-medium">
                SUBMIT
              </button>
            </form>
          </div>

          {/* 🔹 Right Side: Contact Info */}
          <div>
            <h2 className="text-3xl font-semibold mb-8 text-gray-800">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              We'd love to hear from you. Whether you have a question about a product, visit, or anything else — our team is ready to help!
            </p>
            <div className="space-y-4 text-gray-700">
              <p>📍 Ramnagar ward no. 32 , Net Dada mandir ke passs, Churu - 331001, Rajasthan, India</p>
              <p>📞 +91-9784659641</p>
              <p><a href="mailto:nareshjangir4jan1981@gmail.com">✉️ nareshjangir4jan1981@gmail.com</a></p>
            </div>
            <div className="mt-8 space-y-4">
              <button className="w-full bg-[#8b4513] text-white py-3 rounded-md hover:bg-[#6d3510] font-semibold">
                BOOK VIRTUAL SHOWROOM VISIT
              </button>
              <button className="w-full border border-[#8b4513] text-[#8b4513] py-3 rounded-md font-semibold hover:bg-[#f3e6dc]">
                PERSONAL SHOWROOM VISIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
