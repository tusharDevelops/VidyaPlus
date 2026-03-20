import React from 'react'
import { Link } from 'react-router-dom'

export default function CTAButton({active, linkto, children}) {
  return (
   <Link to={linkto}>
    <div className={`text-center text-[15px] px-8 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-2 border cursor-pointer
    ${active 
        ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white border-cyan-300 dark:border-cyan-400 shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60" 
        : "bg-white/10 dark:bg-slate-800/50 backdrop-blur text-white border-white/30 dark:border-slate-600/50 shadow-md hover:shadow-lg hover:bg-white/20 dark:hover:bg-slate-700/50"}
    `} >{children}</div>
   </Link>
  )
}
