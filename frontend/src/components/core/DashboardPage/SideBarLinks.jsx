import React from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"
import {  } from 'react-redux';

export default function SideBarLinks({link, iconName, onNavClick}) {

  const Icon = Icons[iconName]
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath(route, location.pathname);
  } 
  return (
    <NavLink
    to={link.path}
    onClick={onNavClick}
    className={`relative px-8 py-4 transition-all duration-500 group flex items-center
              ${matchRoute(link.path)
                ? "bg-indigo-600/[0.03] dark:bg-indigo-400/[0.02] text-indigo-600 dark:text-indigo-400"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/30"
              }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-1.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-500 shadow-[0_0_15px_rgba(79,70,229,0.5)] ${
          matchRoute(link.path) ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        }`}
      ></span>

        <div className="flex items-center gap-x-4">
          <Icon className={`text-xl transition-all duration-500 ${
            matchRoute(link.path) 
              ? "text-indigo-600 dark:text-indigo-400 scale-110" 
              : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:scale-110"
          }`} />
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
            matchRoute(link.path) ? "tracking-[0.3em] font-black" : "font-black"
          }`}>{link.name}</span>
        </div>
        
        {matchRoute(link.path) && (
          <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-[0_0_10px_rgba(79,70,229,0.8)] animate-pulse"></div>
        )}
    </NavLink>
  )
}
