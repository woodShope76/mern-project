import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SeasonalDealBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const diff = midnight - now;

      setTimeLeft({
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-[#f8f5f2] text-[#3a2d23] py-12 px-6 md:px-16 mt-6 rounded-xl shadow-2xl overflow-hidden max-w-screen-2xl md:mx-auto mx-2"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20 blur-sm" style={{ backgroundImage: "url('/banner-explore.png')" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-6 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-[#442c1c] drop-shadow">
            Explore Today's Highlight
          </h2>
          <p className="text-lg md:text-xl mb-4 text-gray-700">
            Handpicked furniture styles to elevate your home.
          </p>
          <div className="flex gap-4 text-lg font-medium justify-center md:justify-start items-center text-[#7b5034]">
            <Timer />
            <span>{timeLeft.hours.toString().padStart(2, '0')}h</span>
            <span>{timeLeft.minutes.toString().padStart(2, '0')}m</span>
            <span>{timeLeft.seconds.toString().padStart(2, '0')}s</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/shop')}
          className="bg-[#7a4c2f] hover:bg-[#5f3c22] text-white text-lg font-semibold px-7 py-3 rounded-md transition shadow-lg"
        >
          Explore Now
        </button>
      </div>
    </motion.div>
  );
};

export default SeasonalDealBanner;
