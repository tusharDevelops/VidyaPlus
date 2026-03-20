import React from "react"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div className="group cursor-default py-3.5 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600/10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300">
             <HiOutlineVideoCamera className="text-sm" />
          </div>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
            {subSec?.title}
          </p>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Preview</span>
        </div>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion