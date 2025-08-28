import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGraduationCap,
  FaBrain,
  FaLightbulb,
  FaBars,
  FaTimes,
  FaHome,
  FaUserGraduate,
  FaPhone,
  FaUser,
} from 'react-icons/fa';
import { useNavigate } from 'react-router';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const navItems: NavItem[] = [
    { name: 'الرئيسية', href: '/', icon: <FaHome className="w-4 h-4" /> },
    { name: 'علم النفس', href: '/psychology', icon: <FaBrain className="w-4 h-4" /> },
    { name: 'الفلسفة', href: '/philosophy', icon: <FaLightbulb className="w-4 h-4" /> },
    { name: 'الطلاب', href: '/students', icon: <FaUserGraduate className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
      ? 'bg-white shadow-lg border-b border-gray-200'
      : 'bg-slate-800'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer space-x-4 space-x-reverse"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative"

            >
              <div className="w-14 h-14  bg-slate-700  rounded-xl flex items-center justify-center shadow-md border border-slate-600">
                <FaGraduationCap className="w-7 h-7  text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-right pl-2 ">
              <h1 className={`text-xl font-bold  ${scrolled ? 'text-slate-800' : 'text-white'
                }`}>
                مركز التدريس
              </h1>
              <p className={`text-sm ${scrolled ? 'text-slate-600' : 'text-slate-300'
                }`}>
                علم النفس والفلسفة
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 space-x-reverse">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`group relative px-5 py-3 rounded-lg font-medium transition-all duration-300 ${scrolled
                  ? 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                  : 'text-slate-200 hover:text-white hover:bg-slate-700'
                  }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </motion.a>
            ))}
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Search Button */}
            <motion.button
              className={`p-3 rounded-lg transition-all duration-300 ${scrolled
                ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            </motion.button>

            {/* Login Button */}
            <motion.a
              href="/login"
              className={`hidden lg:inline-flex items-center space-x-2 space-x-reverse px-5 py-3 rounded-lg font-medium transition-all duration-300 ${scrolled
                ? 'bg-slate-800 text-white hover:bg-slate-700 shadow-md'
                : 'bg-white text-slate-800 hover:bg-slate-100 shadow-md'
                }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaUser className="w-4 h-4" />
              <span className=''>تسجيل الدخول</span>
            </motion.a>

            {/* Contact Button */}
            <motion.a
              href="https://wa.me/201013297966"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden xl:inline-flex items-center space-x-2 space-x-reverse px-5 py-3 rounded-lg font-medium transition-all duration-300 ${scrolled
                ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                : 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPhone className="w-4 h-4" />
              <span>واتساب</span>
            </motion.a>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <motion.button
                onClick={toggleMenu}
                className={`p-3 rounded-lg transition-colors duration-300 ${scrolled
                  ? 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 space-x-reverse p-4 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-blue-600 text-lg">{item.icon}</span>
                  <span className="font-medium text-lg">{item.name}</span>
                </motion.a>
              ))}

              {/* Mobile Login Button */}
              <motion.div
                className="pt-4 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                <a
                  href="/login"
                  className="inline-flex items-center justify-center w-full space-x-2 space-x-reverse px-6 py-4 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-all duration-200 shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUser className="w-5 h-5" />
                  <span className="text-lg">تسجيل الدخول</span>
                </a>
              </motion.div>

              {/* Mobile Contact Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.0 }}
              >
                <a
                  href="https://wa.me/201013297966"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full space-x-2 space-x-reverse px-6 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-200 shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  <FaPhone className="w-5 h-5" />
                  <span className="text-lg">واتساب</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
