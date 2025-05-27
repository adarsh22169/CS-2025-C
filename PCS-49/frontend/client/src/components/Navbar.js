import React, { useState } from 'react';
import { ChevronDown, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

function Navbar({ setBgColor }) {
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);

  const changeColor = (color) => {
    setBgColor(color);
    setColorPickerOpen(false);
  };

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Smooth scroll to the section
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Navigation items with their corresponding section IDs
  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Health Conditions', id: 'mental-health' },
    { name: 'Health Solutions', id: 'services' },

    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={logo} alt="MindCare Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold">MindCare</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => scrollToSection(item.id)}
              className="text-white hover:text-purple-300 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.button>
          ))}

          <div className="relative">
            {/* <button
              onClick={() => setColorPickerOpen(!isColorPickerOpen)}
              className="flex items-center gap-2 text-white hover:text-purple-300 transition duration-300"
            >
              <Palette size={18} />
              <span></span>
              <ChevronDown size={16} />
            </button> */}

            <AnimatePresence>
              {isColorPickerOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  {[
                    { label: 'Light', color: 'bg-white', text: 'text-black' },
                    { label: 'Dark', color: 'bg-gray-900', text: 'text-white' },
                    { label: 'Grey', color: 'bg-gray-300', text: 'text-black' },
                    {
                      label: 'Colorful',
                      color: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
                      text: 'text-white',
                    },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => changeColor(item.color)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-blue-100 ${item.text}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile menu button - can be expanded with a mobile menu implementation */}
        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;