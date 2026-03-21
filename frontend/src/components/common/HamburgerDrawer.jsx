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
        className={`fixed top-0 left-0 h-screen w-full max-w-xs bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 backdrop-blur-md">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-11 h-11 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            aria-label="Close menu"
          >
            <AiOutlineClose className="text-2xl" />
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
                      className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors duration-300 font-bold"
                    >
                      {link.title}
                    </Link>
                  ) : (
                    <span className="block px-4 py-3 text-slate-400 dark:text-slate-500 font-bold">
                      {link.title}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div className="border-t border-slate-200 dark:border-slate-800 my-2" />

          {/* Footer Actions */}
          <div className="px-4 py-4 space-y-3">
            {/* Cart Link */}
            {user && user?.accountType !== "Instructor" && (
              <Link
                to="/dashboard/cart"
                onClick={handleLinkClick}
                className="flex items-center justify-between px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors duration-300 font-bold"
              >
                <span>Shopping Cart</span>
                {totalItems > 0 && (
                  <span className="bg-indigo-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/30">
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
                  className="block w-full px-4 py-3 text-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl transition-colors duration-300 font-bold"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={handleLinkClick}
                  className="block w-full px-4 py-3 text-center bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 rounded-xl transition-all duration-300 font-black"
                >
                  Sign Up Free
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => {
                const htmlParts = document.documentElement.classList;
                if (htmlParts.contains('dark')) {
                  htmlParts.remove('dark');
                  localStorage.theme = 'light';
                } else {
                  htmlParts.add('dark');
                  localStorage.theme = 'dark';
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors duration-300 font-bold"
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
