import React from 'react'
import { Link } from 'react-router-dom'

export default function CTAButton({active, linkto, children}) {
  return (
   <Link to={linkto}>
    <div className={`${active ? "custom-color-gradient": "bg-richblack-800"} shadow-custom 
    rounded-lg text-sm lg:text-[16px] px-6 py-3 font-bold`} >{children}</div>
   </Link>
  )
}
