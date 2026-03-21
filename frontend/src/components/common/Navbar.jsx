import logo from "../../assets/Logo/vidyaplus-removebg-preview.png"
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { useState, useEffect } from 'react'
import { IoChevronDown } from "react-icons/io5"
import HamburgerDrawer from "./HamburgerDrawer"
import { FaSun, FaMoon } from 'react-icons/fa'
import { HiMenuAlt3 } from 'react-icons/hi'

const Navbar = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()
  const [hamburgerOpen, setHamBurgerOpen] = useState(false)
  const [subLinks, setSubLinks] = useState([])
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark') ||
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API)
      setSubLinks(result.data.data)
    } catch (error) {

    }
  }

  useEffect(() => { fetchSublinks() }, [])

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
      setIsDark(true)
    }
  }

  const matchRoute = (route) => matchPath({ path: route }, location.pathname)

  // Is the current page the homepage?
  const isHome = location.pathname === '/'

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled || !isHome
            ? 'bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl shadow-sm border-b border-slate-200 dark:border-slate-800'
            : 'bg-transparent border-b border-transparent'
          }
        `}
      >
        <div className='max-w-7xl mx-auto px-4 md:px-8 flex h-16 md:h-20 items-center justify-between gap-6'>

          {/* Logo (Composite Text + Feather layered) */}
          <Link to="/" className="relative flex items-center justify-center flex-shrink-0 group px-2 py-1">
            {/* The Text */}
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900 dark:text-white transition-colors duration-300 relative z-10 leading-none">
              Vidya+
            </span>
            {/* The Feather overlapping exactly like the reference image */}
            <img
              src={logo}
              alt="Feather Logo"
              loading="lazy"
              className="absolute left-[2px] top-[10px] md:top-[12px] w-full h-auto object-contain z-20 opacity-95 group-hover:opacity-100 group-hover:scale-105 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] dark:drop-shadow-none transition-all duration-300 pointer-events-none"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NavbarLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.title === "Catalog" ? (
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-md cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span>{link.title}</span>
                    <IoChevronDown className="text-[10px] transition-transform group-hover:rotate-180" />

                    {/* Dropdown */}
                    <div className='invisible opacity-0 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-1'>
                      {/* Arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white dark:bg-slate-900 border-t border-l border-slate-200 dark:border-slate-700 rounded-tl-sm"></div>
                      {subLinks.length ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            key={i}
                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          >
                            {subLink.name}
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-slate-400 px-4 py-2">Loading...</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors
                      ${matchRoute(link?.path)
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className='hidden md:flex items-center gap-3'>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle Theme"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              {isDark ? <FaSun className="text-yellow-400 text-[14px]" /> : <FaMoon className="text-indigo-500 text-[14px]" />}
            </button>

            {/* Cart */}
            {user && user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className="relative w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                <AiOutlineShoppingCart className="text-base" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* Login / Signup / Profile */}
            {token === null ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1.5 rounded-lg text-sm font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 rounded-lg text-sm font-bold bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm shadow-indigo-500/20 hover:-translate-y-0.5 hover:shadow-indigo-500/40 transition-all"
                >
                  Sign Up Free
                </Link>
              </>
            ) : (
              <ProfileDropDown />
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800 transition-all"
            >
              {isDark ? <FaSun className="text-yellow-400 text-[14px]" /> : <FaMoon className="text-indigo-500 text-[14px]" />}
            </button>
            <button
              onClick={() => setHamBurgerOpen(true)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800 transition-all"
            >
              <HiMenuAlt3 className="text-lg" />
            </button>
          </div>

        </div>
      </div>

      {/* Spacer so content doesn't hide under fixed navbar */}
      <div className="h-16 md:h-20" />

      <HamburgerDrawer isOpen={hamburgerOpen} setIsOpen={setHamBurgerOpen} />
    </>
  )
}

export default Navbar
