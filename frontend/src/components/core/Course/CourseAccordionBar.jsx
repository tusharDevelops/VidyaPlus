import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"

import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({ section, isActive, handleActive }) {
  const contentEl = useRef(null)

  // Accordian state
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(isActive?.includes(section._id))
    //eslint-disable-next-line
  }, [isActive])
  const [sectionHeight, setSectionHeight] = useState(0)
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 rounded-2xl mb-2 transition-all duration-300">
      <div>
        <div
          className={`flex cursor-pointer items-center justify-between px-8 py-5 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 ${active ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}
          onClick={() => {
            handleActive(section._id)
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 transition-transform duration-500 ${
                isActive.includes(section._id) ? "rotate-180 bg-indigo-600 text-white" : "rotate-0"
              }`}
            >
              <AiOutlineDown className="text-sm" />
            </div>
            <p className="font-black text-slate-800 dark:text-slate-100 tracking-tight">
              {section?.sectionName}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-600/5 px-3 py-1 rounded-full border border-indigo-600/10">
              {`${section.subSection.length || 0} Lectures`}
            </span>
          </div>
        </div>
      </div>
      
          <div
            ref={contentEl}
            className={`relative h-0 overflow-hidden bg-white dark:bg-slate-900/20 transition-[height] duration-500 ease-in-out border-t border-slate-100 dark:border-slate-800/50`}
            style={{
              height: sectionHeight,
            }}
          >
            <div className="flex flex-col px-8 py-4 divide-y divide-slate-100 dark:divide-slate-800/50">
              {section?.subSection?.map((subSec, i) => {
                return <CourseSubSectionAccordion subSec={subSec} key={i} />
              })}
            </div>
          
        </div>
    </div>
  )
}