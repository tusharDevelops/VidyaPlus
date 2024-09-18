import React from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"
import {  } from 'react-redux';

export default function SideBarLinks({link,iconName}) {

  const Icon = Icons[iconName]
  const location = useLocation();
  //const dispatch = useDispatch();
  const matchRoute = (route)=>{
    return matchPath(route,location.pathname);
  } 
  return (
    <NavLink
    to={link.path}
    className={`relative px-8 py-2 text-md font-medium   
              ${matchRoute(link.path)? " gradient-text" : " text-richblack-300" } 
              transition-all duration-200 `}   
    >

      <span
        className={`absolute left-0 top-0 h-full w-[0.16rem] bg-gradient-custom ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>

        <span
        className={`absolute left-0 top-0 h-full w-[100%] bg-gradient-custom ${
          matchRoute(link.path) ? "opacity-10" : "opacity-0"
        }`}
      ></span>


        <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
       <Icon className={` ${matchRoute(link.path)? "text-blue-1000": " text-richblack-100"} text-xl `} />
        <span>{link.name}</span>
        </div>
      
    </NavLink>
  )
}
