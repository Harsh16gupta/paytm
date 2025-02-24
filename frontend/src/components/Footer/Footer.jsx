import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 px-6">
      <div className="container mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex justify-center sm:justify-start">
            <NavLink to="/">
              <img
                className="rounded-full h-40 w-40 sm:h-50 sm:w-50 md:h-60 md:w-60"
                src="https://cdni.iconscout.com/illustration/premium/thumb/artificial-intelligence-robot-teaching-people-illustration-download-in-svg-png-gif-file-formats--ai-teacher-learning-pack-science-technology-illustrations-8041701.png?f=webp"
                alt="AI Logo"
              />
            </NavLink>
          </div>

          {/* Quick Links Section 1 */}
          <div className="text-white flex flex-col items-center sm:items-start gap-4">
            <h1 className="text-gray-100 font-medium text-xl">Quick Links</h1>
            <NavLink className="text-gray-300 hover:text-cyan-400 transition duration-300" to="/">
              Home
            </NavLink>
            <NavLink className="text-gray-300 hover:text-cyan-400 transition duration-300" to="/ai-tutor">
              AI Tutor
            </NavLink>
            <NavLink className="text-gray-300 hover:text-cyan-400 transition duration-300" to="/about">
              About
            </NavLink>
            <NavLink className="text-gray-300 hover:text-cyan-400 transition duration-300" to="/contact">
              Contact
            </NavLink>
          </div>

          {/* Quick Links Section 2 */}
          <div className="text-white flex flex-col items-center sm:items-start gap-4">
            <h1 className="text-gray-100 font-medium text-xl">Quick Links</h1>
            <NavLink className="text-gray-300 hover:text-cyan-400 transition duration-300" to="/">
              Home
            </NavLink>
            <NavLink className="text-gray-300 hover:text-cyan-400 transition duration-300" to="/ai-tutor">
              AI Bot
            </NavLink>
            <NavLink className="text-gray-300 hover:text-cyan-400 transition duration-300" to="/about">
              About
            </NavLink>
            <NavLink className="text-gray-300 hover:text-cyan-400 transition duration-300" to="/contact">
              Contact
            </NavLink>
          </div>

          {/* Get in Touch Section */}
          <div className="text-white flex flex-col items-center sm:items-start gap-4">
            <h1 className="text-gray-100 font-medium text-xl">GET IN TOUCH</h1>
            <div className="flex gap-2 items-center">
              <span className="material-icons" style={{ fontSize: '26px', color: 'gray' }}>
                mail
              </span>
              <button className="text-gray-300 text-md hover:text-cyan-400 cursor-pointer transition duration-300">
                yadavkausha@gmail.com
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center">
          <span className="text-gray-200 text-base">
            Copyright © {new Date().getFullYear()} AI TECH HELP Technologies Pvt Ltd. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;