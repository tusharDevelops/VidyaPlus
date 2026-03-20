import React from 'react'
import { FaGraduationCap, FaBookOpen } from 'react-icons/fa'

const subjectEmojis = {
  'Foundation Mathematics': '🔢',
  'Environmental Science': '🌿',
  'English Reading & Grammar': '📖',
  'Middle School Mathematics': '📐',
  'General Science': '🔬',
  'Social Studies': '🌍',
  'Advanced Mathematics': '📊',
  'Science (Physics & Chemistry)': '⚗️',
  'History, Civics & Geography': '🗺️',
  'Senior Secondary Physics': '⚡',
  'Core Biology & Chemistry': '🧬',
  'Commerce & Accountancy': '💹',
}

export default function CourseCard({cardData, currentCard, setCurrentCard}) {
  const isCurrent = currentCard === cardData.heading
  const emoji = subjectEmojis[cardData.heading] || '📚'

  return (
    <div
      className={`flex flex-col p-7 rounded-2xl cursor-pointer transition-all duration-300 h-full min-h-[240px] border-2
        ${isCurrent
          ? 'bg-slate-900 dark:bg-slate-900 border-indigo-500 shadow-[0_0_30px_0_rgba(99,102,241,0.25)] dark:shadow-[0_0_30px_0_rgba(99,102,241,0.35)] -translate-y-1'
          : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:-translate-y-1 hover:shadow-lg'}
      `}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      {/* Emoji badge */}
      <div className={`text-4xl mb-4 w-14 h-14 rounded-xl flex items-center justify-center
        ${isCurrent ? 'bg-indigo-600/20' : 'bg-slate-100 dark:bg-slate-700'}`}>
        {emoji}
      </div>

      {/* Title */}
      <h3 className={`text-lg font-extrabold mb-3 leading-tight
        ${isCurrent ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
        {cardData.heading}
      </h3>

      {/* Description */}
      <p className={`text-sm leading-relaxed flex-1
        ${isCurrent ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
        {cardData.description}
      </p>

      {/* Footer */}
      <div className={`flex items-center justify-between mt-5 pt-4 border-t text-xs font-semibold
        ${isCurrent ? 'border-indigo-500/30 text-indigo-300' : 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'}`}>
        <div className="flex items-center gap-1.5">
          <FaGraduationCap className="text-sm" />
          {cardData.level}
        </div>
        <div className="flex items-center gap-1.5">
          <FaBookOpen className="text-sm" />
          {cardData.lessonNumber} Lessons
        </div>
      </div>
    </div>
  )
}
