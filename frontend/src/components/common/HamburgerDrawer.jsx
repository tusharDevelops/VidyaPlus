import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavbarLinksMob } from '../../data/navbar-links';
import { AiOutlineClose } from "react-icons/ai";

function HamburgerDrawer({ isOpen, setIsOpen }) {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-full max-w-xs bg-richblack-900 border-r border-richblack-700 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-richblack-700 bg-richblack-800">
          <h2 className="text-lg font-bold text-white">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-richblack-700 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <AiOutlineClose className="text-white text-2xl" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Navigation Links */}
          <nav className="flex-1 px-2 py-4">
            <ul className="space-y-2">
              {NavbarLinksMob.map((link, index) => (
                <li key={index}>
                  {link.path ? (
                    <Link
                      to={link.path}
                      onClick={handleLinkClick}
                      className="block px-4 py-3 text-richblack-25 hover:text-white hover:bg-richblack-700 rounded-lg transition-colors duration-200 font-medium"
                    >
                      {link.title}
                    </Link>
                  ) : (
                    <span className="block px-4 py-3 text-richblack-400 font-medium">
                      {link.title}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div className="border-t border-richblack-700 my-2" />

          {/* Footer Actions */}
          <div className="px-2 py-4 space-y-2">
            {/* Cart Link */}
            {user && user?.accountType !== "Instructor" && (
              <Link
                to="/dashboard/cart"
                onClick={handleLinkClick}
                className="flex items-center justify-between px-4 py-3 text-richblack-25 hover:text-white hover:bg-richblack-700 rounded-lg transition-colors duration-200 font-medium"
              >
                <span>Shopping Cart</span>
                {totalItems > 0 && (
                  <span className="bg-yellow-1000 text-richblack-900 px-2.5 py-0.5 rounded-full text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* Authentication Links */}
            {token === null && (
              <>
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="block w-full px-4 py-3 text-center bg-blue-1000 hover:bg-blue-900 text-white rounded-lg transition-colors duration-200 font-semibold"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={handleLinkClick}
                  className="block w-full px-4 py-3 text-center border border-yellow-1000 bg-yellow-1000/10 hover:bg-yellow-1000/20 text-yellow-1000 hover:text-yellow-900 rounded-lg transition-colors duration-200 font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => {
                if (document.documentElement.classList.contains('dark')) {
                  document.documentElement.classList.remove('dark');
                  localStorage.theme = 'light';
                } else {
                  document.documentElement.classList.add('dark');
                  localStorage.theme = 'dark';
                }
              }}
              className="w-full px-4 py-3 text-richblack-25 hover:text-white hover:bg-richblack-700 rounded-lg transition-colors duration-200 font-medium text-center"
            >
              Toggle Dark Mode 🌓
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HamburgerDrawer;
