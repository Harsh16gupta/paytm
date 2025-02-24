import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className={`sticky z-30 top-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm`}>
      <nav className="pt-6 pb-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <h1 className={`font-bold text-3xl ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>Pay-Sphere</h1>
          </NavLink>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-700 hover:text-cyan-500'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500`}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive
                        ? `${isDarkMode ? 'text-cyan-300 border-b-2 border-red-400' : 'text-cyan-600 border-b-2 border-red-400'}`
                        : `${isDarkMode ? 'text-cyan-400' : 'text-cyan-700'}`
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-cyan-400 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive
                        ? `${isDarkMode ? 'text-cyan-300 border-b-2 border-amber-400' : 'text-cyan-600 border-b-2 border-amber-400'}`
                        : `${isDarkMode ? 'text-cyan-400' : 'text-cyan-700'}`
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-cyan-400 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive
                        ? `${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`
                        : `${isDarkMode ? 'text-cyan-400' : 'text-cyan-700'}`
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-cyan-400 lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/AI_work"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive
                        ? `${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`
                        : `${isDarkMode ? 'text-cyan-400' : 'text-cyan-700'}`
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-cyan-400 lg:p-0`
                  }
                >
                  AI Bot
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex lg:items-center lg:order-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full focus:outline-none cursor-pointer ${
                isDarkMode ? 'bg-gray-700 text-cyan-400' : 'bg-gray-200 text-cyan-700'
              }`}
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            <NavLink
              to="/Signin"
              className={`${
                isDarkMode ? 'text-gray-300 hover:bg-white' : 'text-gray-700 hover:bg-cyan-700/30'
              } focus:ring-4 focus:ring-gray-300 font-medium rounded-4xl text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none`}
            >
              Log in
            </NavLink>
            <NavLink
              to="/Signup"
              className={`text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-4xl text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none`}
            >
              Get started
            </NavLink>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } lg:hidden w-full lg:order-1`}
          id="mobile-menu"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive
                      ? `${isDarkMode ? 'text-cyan-300 border-b-2 border-red-400' : 'text-cyan-600 border-b-2 border-red-400'}`
                      : `${isDarkMode ? 'text-cyan-400' : 'text-cyan-700'}`
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-cyan-400 lg:p-0`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive
                      ? `${isDarkMode ? 'text-cyan-300 border-b-2 border-amber-400' : 'text-cyan-600 border-b-2 border-amber-400'}`
                      : `${isDarkMode ? 'text-cyan-400' : 'text-cyan-700'}`
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-cyan-400 lg:p-0`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive
                      ? `${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`
                      : `${isDarkMode ? 'text-cyan-400' : 'text-cyan-700'}`
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-cyan-400 lg:p-0`
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/AI_work"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive
                      ? `${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`
                      : `${isDarkMode ? 'text-cyan-400' : 'text-cyan-700'}`
                  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-cyan-400 lg:p-0`
                }
              >
                AI Bot
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;