import React from 'react';
import AI_Bot from '../AI_Bot/AI_Bot';

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 p-6">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl items-center justify-between gap-8">
        {/* First Half - Logo Section */}
        <div className="flex-1 flex items-center justify-center lg:justify-start">
          <img
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
            src="https://assetscdn1.paytm.com/images/catalog/view/1725446620368.png"
            alt="Logo"
          />
        </div>

        {/* Second Half - Content Section */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
            Manage Your Finance Securely
          </h1>
          <div className="w-full max-w-md">
            <AI_Bot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;