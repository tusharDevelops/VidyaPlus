import React from 'react'
import { Link } from 'react-router-dom'

export default function CTAButton({active, linkto, children}) {
  return (
   <Link to={linkto}>
    <div className={`text-center text-[15px] px-8 py-3 rounded-full font-bold transition-all duration-200 hover:-translate-y-1 shadow-md hover:shadow-lg border
    ${active 
        ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 border-yellow-300 dark:border-amber-400" 
        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"}
    `} >{children}</div>
   </Link>
  )
}
