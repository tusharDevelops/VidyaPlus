import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavbarLinksMob } from '../../data/navbar-links';
import { AiOutlineCloseSquare } from "react-icons/ai";

function HamburgerDrawer({ isOpen, setIsOpen }) {
  
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore the scroll position and reset styles
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(document.body.style.top || '0') * -1);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Drawer Menu */}
      {isOpen && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50 transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full transition-opacity duration-300 opacity-100">
            <AiOutlineCloseSquare
              className="text-white text-6xl mr-10 mb-5 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            {/* Content of the drawer is scrollable */}
            <ul className="text-white text-xl">
              {NavbarLinksMob.map((link, index) => (
                <li
                  key={index}
                  onClick={() => setIsOpen(false)}
                  className="my-4"
                >
                  {link.path ? (
                    <Link to={link.path}>{link.title}</Link>
                  ) : (
                    <span>{link.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default HamburgerDrawer;
