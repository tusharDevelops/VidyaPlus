import React, { useState } from 'react'
import { HomePageExplore } from "../../../data/homepage-explore"
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const tabsName = [
  "Primary (Class 1-5)",
  "Middle (Class 6-8)",
  "Secondary (Class 9-10)",
  "Senior Secondary (Class 11-12)",
]

const tabAccents = {
  "Primary (Class 1-5)": { from: 'from-orange-500', to: 'to-red-500', border: 'border-orange-400', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  "Middle (Class 6-8)": { from: 'from-blue-500', to: 'to-cyan-500', border: 'border-blue-400', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  "Secondary (Class 9-10)": { from: 'from-purple-500', to: 'to-pink-500', border: 'border-purple-400', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  "Senior Secondary (Class 11-12)": { from: 'from-green-500', to: 'to-emerald-500', border: 'border-green-400', badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
}

export default function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabsName[0])
  const [courses, setCourses] = useState(HomePageExplore.find(c => c.tag === tabsName[0]).courses)
  const [currentCard, setCurrentCard] = useState(courses[0].heading)

  const setMyCard = (element) => {
    setCurrentTab(element)
    const result = HomePageExplore.find(c => c.tag === element)
    setCourses(result.courses)
    setCurrentCard(result.courses[0].heading)
  }

  const accent = tabAccents[currentTab]

  return (
    <section className='w-full py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden'>

      {/* Decorative background gradient */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-64 bg-gradient-to-r ${accent.from} ${accent.to} opacity-5 dark:opacity-10 blur-[100px] pointer-events-none transition-all duration-700`}></div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 md:px-8'>

        {/* Header */}
        <div className='text-center mb-14'>
          <h2 className='text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4'>
            Unlock the <HighlightText text={"Potential of Learning"} />
          </h2>
          <p className='text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto'>
            Structured curriculum from Class 1 to 12 — every subject, every level, every aspiration.
          </p>
        </div>

        {/* Tab Strip */}
        <div className='flex flex-wrap justify-center gap-3 mb-12'>
          {tabsName.map((element, index) => {
            const ac = tabAccents[element]
            return (
              <button
                key={index}
                onClick={() => setMyCard(element)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-2
                  ${currentTab === element
                    ? `bg-gradient-to-r ${ac.from} ${ac.to} text-white border-transparent shadow-lg scale-105`
                    : `bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:scale-105`}
                `}
              >
                {element}
              </button>
            )
          })}
        </div>

        {/* Cards Grid — no absolute positioning */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {courses.map((element, index) => (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='flex justify-center mt-12'>
          <Link
            to="/catalog/courses"
            className={`group flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-bold border-2 ${accent.border} ${accent.badge} hover:shadow-lg transition-all hover:-translate-y-0.5`}
          >
            View All Courses
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  )
}
