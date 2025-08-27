import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className=" bg-gradient-to-br from-white to-gray-100 border-gray-300 pt-10 pb-6 boder border-t-2 text-gray-700 px-4 md:px-20 ">
      <div className="mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Column 1 */}
          <div className="pr-4 border-r border-gray-300">
            <h2 className="text-xl font-bold mb-4">
              <span className="text-2xl text-[#a97449] font-extrabold">F</span>ind a Store
              <br />
              <span className="text-base font-medium">Shop Gift Cards</span>
            </h2>
            <p className="mt-6 mb-3 text-sm font-medium text-gray-500">Follow Us:</p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-[#f3f3f3] rounded-full hover:bg-[#a97449] hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="#" className="p-2 bg-[#f3f3f3] rounded-full hover:bg-[#a97449] hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="p-2 bg-[#f3f3f3] rounded-full hover:bg-[#a97449] hover:text-white transition">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="px-4 border-r border-gray-300">
            <h2 className="text-lg font-semibold text-[#a97449] mb-4">Help Center</h2>
            <ul className="space-y-2 text-[16px] text-gray-600 hover:text-black transition">
              {["Payments", "Shipping", "Product Returns", "FAQ's", "Checkout", "Blog"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-[#a97449] transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>

        {/* Column 3 */}
        <div className="px-4 border-r border-gray-300">
          <h2 className="text-lg font-bold mb-3">Useful Links</h2>
          <ul className="space-y-2 text-[#878383] font-sans font-semibold text-[17px]">
            <li><Link to="/">Home</Link></li>
            <li><Link to="contact">Contact</Link></li>
            <li><Link to="about">About</Link></li>
            <li><Link to="#">Terms & Conditions</Link></li>
            <li><Link to="#">Policy</Link></li>
            <li><Link to="#">My Orders</Link></li>
          </ul>
        </div>

          {/* Column 4 */}
          <div className="px-4 border-r border-gray-300">
            <h2 className="text-lg font-semibold text-[#a97449] mb-4">Contact Us</h2>
            <p className="text-[15px] text-gray-600 mb-3">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
            </p>
            <ul className="space-y-3 text-gray-600 text-[15px]">
              <li className="flex items-center gap-2"><FaMapMarkerAlt /> Ramnagar ward no. 32 , Churu - 331001, Rajasthan, India</li>
              <li className="flex items-center gap-2"><FaPhoneAlt /> +91-9784659641</li>
              <li className="flex items-center gap-2 break-all text-[14px]">
  <FaEnvelope />
  <a href="mailto:nareshjangir4jan1981@gmail.com" className="hover:underline">
    nareshjangir4jan1981@gmail.com
  </a>
</li>

            </ul>
          </div>

        {/* Column 5 */}
        <div className="pl-4">
          <h2 className="text-lg font-bold mb-3">Categories</h2>
          <ul className="space-y-2 text-[#878383] font-sans font-semibold text-[17px]">
            <li><Link to="shop">Chair</Link></li>
            <li><Link to="shop">Sofa</Link></li>
            <li><Link to="shop">Dining Table</Link></li>
            <li><Link to="shop">Table Lamp</Link></li>
            <li><Link to="shop">Desk</Link></li>
            <li><Link to="shop">Cabinets</Link></li>
          </ul>
        </div>
      </div>

        {/* Footer Bottom */}
        <div className="border-t mt-10 pt-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} <span className="text-[#a97449] font-semibold">BALAJI FURNITURE HOUSE</span>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
